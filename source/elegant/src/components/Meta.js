import Head from 'next/head'

/**
 * @deprecated since version 2.2 .. Will be removed in version 3... Replaced with the core SEO component
 */
export function Title({ suffix = 'Elegant Framework', children }) {
  let title = children + (suffix ? ` - ${suffix}` : '')

  return (
    <>
      <Head>
        <title key="title">{title}</title>
      </Head>
      <OgTitle suffix={suffix}>{children}</OgTitle>
    </>
  )
}

/**
 * @deprecated since version 2.2 .. Will be removed in version 3... Replaced with the core SEO component
 */
export function OgTitle({ suffix = 'Elegant Framework', children }) {
  let title = children + (suffix ? ` - ${suffix}` : '')

  return (
    <Head>
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="og:title" property="og:title" content={title} />
    </Head>
  )
}

/**
 * @deprecated since version 2.2 .. Will be removed in version 3... Replaced with the core SEO component
 */
export function Description({ children }) {
  return (
    <>
      <Head>
        <meta name="description" content={children} />
      </Head>
      <OgDescription>{children}</OgDescription>
    </>
  )
}

/**
 * @deprecated since version 2.2 .. Will be removed in version 3... Replaced with the core SEO component
 */
export function OgDescription({ children }) {
  return (
    <Head>
      <meta key="og:description" property="og:description" content={children} />
      <meta key="twitter:description" name="twitter:description" content={children} />
    </Head>
  )
}
