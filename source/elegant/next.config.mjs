import * as path from 'path';
import { createLoader } from 'simple-functional-loader';
import frontMatter from 'front-matter';
import minimatch from 'minimatch';
import * as fs from 'fs';
import { createRequire } from 'node:module';
import * as url from 'node:url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const require = createRequire(import.meta.url);

const fallbackDefaultExports = {
  'src/pages/{docs,components}/**/*': ['@/layouts/ContentsLayout', 'ContentsLayout'],
}

const fallbackGetStaticProps = {};

export default {
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'tsx'],
  experimental: {
    esmExternals: false,
  },
  async redirects() {
    return JSON.parse(fs.readFileSync(require.resolve('./redirects.json'), 'utf8'))
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp4$/i,
      issuer: /\.(jsx?|tsx?|mdx)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        { loader: '@svgr/webpack', options: { svgoConfig: { plugins: { removeViewBox: false } } } },
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    // Remove the 3px deadzone for drag gestures in Framer Motion
    config.module.rules.push({
      test: /node_modules\/framer-motion/,
      use: createLoader(function (source) {
        return source.replace(
          /var isDistancePastThreshold = .*?$/m,
          'var isDistancePastThreshold = true'
        )
      }),
    })

    config.module.rules.push({
      resourceQuery: /highlight/,
      use: [
        options.defaultLoaders.babel,
        createLoader(function (source) {

          return `
            export const code = ${JSON.stringify(source)}
          `
        }),
      ],
    })

    let mdx = (plugins = []) => [
      {
        loader: '@mdx-js/loader',
        options:
          plugins === null
            ? { providerImportSource: '@mdx-js/react' }
            : { 
                providerImportSource: '@mdx-js/react',
                remarkPlugins: [
                  ...plugins,
                ],
              }
      },
      createLoader(function (source) {
        let pathSegments = this.resourcePath.split(path.sep)
        let slug =
          pathSegments[pathSegments.length - 1] === 'index.mdx'
            ? pathSegments[pathSegments.length - 2]
            : pathSegments[pathSegments.length - 1].replace(/\.mdx$/, '')
        return source + `\n\nexport const slug = '${slug}'`
      }),
    ]

    config.module.rules.push({
      test: { and: [/\.mdx$/, /snippets/] },
      resourceQuery: { not: [/rss/, /preview/] },
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            providerImportSource: '@mdx-js/react',
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.mdx$/,
      resourceQuery: /rss/,
      use: [options.defaultLoaders.babel, ...mdx()],
    })

    config.module.rules.push({
      test: /\.mdx$/,
      resourceQuery: /preview/,
      use: [
        options.defaultLoaders.babel,
        createLoader(function (src) {
          const [preview] = src.split('{/*/excerpt*/}')
          return preview.replace('{/*excerpt*/}', '')
        }),
        ...mdx([
          () => (tree) => {
            let firstParagraphIndex = tree.children.findIndex((child) => child.type === 'paragraph')
            if (firstParagraphIndex > -1) {
              tree.children = tree.children.filter((child, index) => {
                if (child.type === 'import' || child.type === 'export') {
                  return true
                }
                return index <= firstParagraphIndex
              })
            }
          },
        ]),
      ],
    });

    function mainMdxLoader(plugins) {
      return [
        options.defaultLoaders.babel,
        createLoader(function (source) {
          if (source.includes('/*START_META*/')) {
            let match = source.match(/^export const meta = (\{.*?\n\})/ms)
            return 'export default ' + match[1]
          }
          let exports = Array.from(source.matchAll(/^export const ([^=\s]+)/gm)).map(
            ([, name]) => name
          )
          return (
            source.replace(/export const/gs, 'const') +
            `\nMDXContent.layoutProps = { ${exports.join(',')} }\n`
          )
        }),
        ...mdx(plugins),
        createLoader(function (source) {
          let fields = new URLSearchParams(this.resourceQuery.substr(1)).get('meta') ?? undefined
          let { attributes: meta, body } = frontMatter(source)
          if (fields) {
            for (let field in meta) {
              if (!fields.split(',').includes(field)) {
                delete meta[field]
              }
            }
          }

          let extra = []
          let resourcePath = path.relative(__dirname, this.resourcePath);

          if (!/^\s*export\s+default\s+/m.test(source.replace(/```(.*?)```/gs, ''))) {
            for (let glob in fallbackDefaultExports) {
              if (minimatch(resourcePath, glob)) {
                extra.push(
                  `import { ${fallbackDefaultExports[glob][1]} as _Default } from '${fallbackDefaultExports[glob][0]}'`,
                  'export default _Default'
                )
                break
              }
            }
          }

          // if (
          //   !/^\s*export\s+(async\s+)?function\s+getStaticProps\s+/m.test(
          //     source.replace(/```(.*?)```/gs, '')
          //   )
          // ) {
          //   for (let glob in fallbackGetStaticProps) {
          //     if (minimatch(resourcePath, glob)) {
          //       extra.push(`export { getStaticProps } from '${fallbackGetStaticProps[glob]}'`)
          //       break
          //     }
          //   }
          // }

          let metaExport
          if (!/export\s+(const|let|var)\s+meta\s*=/.test(source)) {
            metaExport =
              typeof fields === 'undefined'
                ? `export const meta = ${JSON.stringify(meta)}`
                : `export const meta = /*START_META*/${JSON.stringify(meta || {})}/*END_META*/`
          }

          return [
            ...(typeof fields === 'undefined' ? extra : []),
            typeof fields === 'undefined'
              ? body.replace(/\{\/\*excerpt\*\/\}.*\{\/\*\/excerpt\*\/\}/s, '')
              : '',
            metaExport,
          ]
            .filter(Boolean)
            .join('\n\n')
        }),
      ]
    };

    config.module.rules.push({
      test: { and: [/\.mdx$/], not: [/snippets/] },
      resourceQuery: { not: [/rss/, /preview/] },
      use: mainMdxLoader(),
    })

    return config
  },
};