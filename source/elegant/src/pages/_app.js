import '../css/fonts.css';
import '../css/main.css';
import 'focus-visible';
import { useState, useEffect, Fragment } from 'react';
import { BrandJsonLd, LogoJsonLd, SocialProfileJsonLd, WebPageJsonLd } from 'next-seo';
import SeoLogo from './../../public/favicons/apple-icon-180x180.png';
import { Header } from '@/components/Header';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';
import Seo from "@/components/core/Seo/Seo";
import Head from 'next/head';
import { ResizeObserver } from '@juggle/resize-observer';
import 'intersection-observer';
import { SearchProvider } from '@/components/Search';
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
  const Layout = Component.layoutProps?.Layout || Fragment;

  const layoutProps = Component.layoutProps?.Layout
    ? { layoutProps: Component.layoutProps, navIsOpen, setNavIsOpen }
    : {}

  // Show the sticky header
  let stickyHeader =  (Component.layoutProps?.stickyHeader ?? true);

  // the page meta data
  const meta = Component.layoutProps?.meta || {};

  // Set the social share image
  let image = socialCardLarge.src;
  image = meta.ogImage ?? meta.image;

  // set the page type
  let pageType = Component.layoutProps?.pageType ? Component.layoutProps.pageType : "website";

  // blog posts will have a description
  if(meta.image && meta.description){
    pageType = "article";
  }

  let section =
    meta.section ||
    Object.entries(Component.layoutProps?.Layout?.nav ?? {}).find(([, items]) =>
      items.find(({ href }) => href === router.pathname)
    )?.[0]

  // is this app for a business? 
  let appType = "Organization";

  if(
    process.env.NEXT_PUBLIC_APP_TYPE_ORGANIZATION !== undefined && 
    process.env.NEXT_PUBLIC_APP_TYPE_ORGANIZATION === false
  ){
    appType = "Person";
  }

  // if their are social links provided, activate the Social schema data
  let socialSchema = [];
  {
    process.env.NEXT_PUBLIC_APP_TWITTER_URL !== undefined && 
    process.env.NEXT_PUBLIC_APP_TWITTER_URL !== "" ?
      socialSchema.push(process.env.NEXT_PUBLIC_APP_TWITTER_URL) : null
  }
  {
    process.env.NEXT_PUBLIC_APP_FACEBOOK_URL !== undefined && 
    process.env.NEXT_PUBLIC_APP_FACEBOOK_URL !== "" ?
      socialSchema.push(process.env.NEXT_PUBLIC_APP_FACEBOOK_URL) : null
  }
  {
    process.env.NEXT_PUBLIC_APP_INSTAGRAM_URL !== undefined && 
    process.env.NEXT_PUBLIC_APP_INSTAGRAM_URL !== "" ?
      socialSchema.push(process.env.NEXT_PUBLIC_APP_INSTAGRAM_URL) : null
  }
  {
    process.env.NEXT_PUBLIC_APP_YOUTUBE_URL !== undefined && 
    process.env.NEXT_PUBLIC_APP_YOUTUBE_URL !== "" ?
      socialSchema.push(process.env.NEXT_PUBLIC_APP_YOUTUBE_URL) : null
  }
  {
    process.env.NEXT_PUBLIC_APP_LINKEDIN_URL !== undefined && 
    process.env.NEXT_PUBLIC_APP_LINKEDIN_URL !== "" ?
      socialSchema.push(process.env.NEXT_PUBLIC_APP_LINKEDIN_URL) : null
  }

  // set our url
  let url = process.env.NEXT_PUBLIC_APP_URL;

  if(
    process.env.NEXT_PUBLIC_VERCEL_URL !== undefined &&
    process.env.NEXT_PUBLIC_VERCEL_ENV !== undefined &&
    process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
  ){
    url = "https://" + process.env.NEXT_PUBLIC_VERCEL_URL;
  }

  // if we have social data, turn on the schema object
  let socialProfile;

  if(socialSchema.length > 0)
  {
    socialProfile = (
      <SocialProfileJsonLd 
        type={appType}
        name={process.env.NEXT_PUBLIC_APP_NAME}
        url={url}
        sameAs={socialSchema}
      />
    );
  }

  return (
    <>
      <Head>
        <AnalyticsHead googleAnalyticsID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}/>
      </Head>
      <Seo 
        title={meta.metaTitle || meta.title}
        description={meta.metaDescription || meta.description || process.env.NEXT_PUBLIC_APP_DESCRIPTION}
        themeColor={"#f8fafc"}
        twitterHandle={process.env.NEXT_PUBLIC_APP_TWITTER_HANDLE}
        twitterSite={process.env.NEXT_PUBLIC_APP_TWITTER_HANDLE}
        siteName={process.env.NEXT_PUBLIC_APP_NAME}
        url={`${url}${router.pathname}`}
        image={`${url}${image}`}
        facebookAppID={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
        pageType={pageType}
      />
      <LogoJsonLd 
        logo={process.env.NEXT_PUBLIC_APP_URL + SeoLogo.src}
        url={process.env.NEXT_PUBLIC_APP_URL}
      />
      <BrandJsonLd 
        logo={process.env.NEXT_PUBLIC_APP_URL + SeoLogo.src}
        id={process.env.NEXT_PUBLIC_APP_URL}
        slogan={process.env.NEXT_PUBLIC_APP_TAGLINE}
      />
      <WebPageJsonLd 
        description={meta.metaDescription || meta.description}
        id={`${process.env.NEXT_PUBLIC_APP_URL}${router.pathname}`}
      />
      {socialProfile}
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
