import '../css/fonts.css';
import '../css/main.css';
import 'focus-visible';
import { useState, useEffect, Fragment } from 'react';
import { Header } from '@/components/Header';
import { Description, OgDescription, OgTitle, Title } from '@/components/Meta';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';
import Head from 'next/head';
import { ResizeObserver } from '@juggle/resize-observer';
import 'intersection-observer';
import { SearchProvider } from '@/components/Search';
import TwitterMeta from '@/components/core/Meta/TwitterMeta';
import AnalyticsHead from '@/components/core/Analytics/AnalyticsHead';
import AnalyticsBody from '@/components/core/Analytics/AnalyticsBody';
import * as gtag from '@/utils/analytics/gtag';
import socialCardLarge from '@/img/social-card-large.jpg';

if (typeof window !== 'undefined' && !('ResizeObserver' in window)) {
  window.ResizeObserver = ResizeObserver
}

const progress = new ProgressBar({
  size: 2,
  color: '#7c3aed',
  className: 'bar-of-progress',
  delay: 100,
})

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
  progress.start()
  progress.finish()
}

Router.events.on('routeChangeStart', () => progress.start())
Router.events.on('routeChangeComplete', () => progress.finish())
Router.events.on('routeChangeError', () => progress.finish())

export default function App({ Component, pageProps, router }) {
  let [navIsOpen, setNavIsOpen] = useState(false);

  useEffect(() => {
    if (!navIsOpen) return
    function handleRouteChange() {
      setNavIsOpen(false)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [navIsOpen]);

  /**
   * Fire a page view analytics event when a user navigates to a new page
   */
  useEffect(() => {
    if(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID !== undefined && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID !== ''){
      const handleRouteChange = (url) => {
        gtag.pageview(url);
      }
      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      }
    }
  }, [router.events]);

  // The type of layout a page should use.. Ex. BasicLayout, BlogPostLayout, etc..
  const Layout = Component.layoutProps?.Layout || Fragment
  const layoutProps = Component.layoutProps?.Layout
    ? { layoutProps: Component.layoutProps, navIsOpen, setNavIsOpen }
    : {}

  // Show the sticky header
  let stickyHeader =  (Component.layoutProps?.stickyHeader ?? true);

  const meta = Component.layoutProps?.meta || {};

  // The meta description field
  const description = meta.metaDescription || meta.description || 'Documentation for the Elegant framework.';

  // Set the social share image
  let image = meta.ogImage ?? meta.image;

  image = image
    ? `${image.src ?? image}`
    : `${socialCardLarge.src}`

  let section =
    meta.section ||
    Object.entries(Component.layoutProps?.Layout?.nav ?? {}).find(([, items]) =>
      items.find(({ href }) => href === router.pathname)
    )?.[0]

  return (
    <>
      <Title>
        {meta.metaTitle || meta.title}
      </Title>
      {meta.ogTitle && <OgTitle>{meta.ogTitle}</OgTitle>}
      <Description>
        {description}
      </Description>
      {meta.ogDescription && <OgDescription>{meta.ogDescription}</OgDescription>}
      <Head>
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:image" name="twitter:image" content={image} />
        <TwitterMeta twitterHandle={process.env.NEXT_PUBLIC_APP_TWITTER_HANDLE}/>
        <meta
          key="og:url"
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_APP_URL}${router.pathname}`}
        />
        <meta key="og:type" property="og:type" content="article" />
        <meta key="og:image" property="og:image" content={image} />
        <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="/feeds/feed.xml" />
        <link rel="alternate" type="application/atom+xml" title="Atom 1.0" href="/feeds/atom.xml" />
        <link rel="alternate" type="application/json" title="JSON Feed" href="/feeds/feed.json" />
        <AnalyticsHead googleAnalyticsID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}/>
      </Head>
      <SearchProvider>
        {stickyHeader && (
          <Header
            hasNav={Boolean(Component.layoutProps?.Layout?.nav)}
            navIsOpen={navIsOpen}
            onNavToggle={(isOpen) => setNavIsOpen(isOpen)}
            title={meta.title}
            section={section}
          />
        )}
        <Layout {...layoutProps}>
          <AnalyticsBody googleAnalyticsID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}/>
          <Component section={section} {...pageProps} />
        </Layout>
      </SearchProvider>
    </>
  )
}