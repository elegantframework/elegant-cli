import * as fs from 'fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export default {
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  async redirects() {
    return JSON.parse(fs.readFileSync(require.resolve('./redirects.json'), 'utf8'))
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],
  },
};