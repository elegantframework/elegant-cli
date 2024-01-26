import { useState, useEffect, Fragment } from 'react';
import { BrandJsonLd, LogoJsonLd, SocialProfileJsonLd, WebPageJsonLd } from 'next-seo';
import SeoLogo from './../../public/favicons/apple-icon-180x180.png';
import { Header } from '@/components/Header';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';
import Seo from "@/components/Seo/Seo";
import Head from 'next/head';
import AnalyticsHead from '@/components/Analytics/AnalyticsHead';
import AnalyticsBody from '@/components/Analytics/AnalyticsBody';
import * as gtag from '@/utils/Analytics/gtag';
import socialCardLarge from '@/img/social-card-large.jpg';
import Config from 'Config';
import SocialSchema from '@/utils/Meta/SocialSchema';
import '../css/fonts.css';
import '../css/main.css';
import 'focus-visible';
import '@/components/Admin/Pages/styles.css';
import '../css/editor.css';

const progress = new ProgressBar({
  size: 2,
  color: '#7c3aed',
  className: 'bar-of-progress',
  delay: 100,
});

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
    if(Config('app.google_analytics_id').length > 0){
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

  if(meta.ogImage){
    image = meta.ogImage;
  };

  if(meta.image){
    image = meta.image;
  }

  // set the page type
  let pageType = Component.layoutProps?.pageType ? Component.layoutProps.pageType : "website";

  // set the noindex meta flag on the page.
  let noIndex = (meta.noIndex ? meta.noIndex : false);

  // set the rich snippet page type to 'article' for blog posts
  if(router.pathname.includes("/blog/"))
  {
    pageType = "article";
  }

  // set our url
  let url = Config('app.url');

  if(
    process.env.NEXT_PUBLIC_VERCEL_URL !== undefined &&
    process.env.NEXT_PUBLIC_VERCEL_ENV !== undefined &&
    process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
  ){
    url = "https://" + process.env.NEXT_PUBLIC_VERCEL_URL;
  }

  // if there are social links provided, activate the Social schema data
  let socialSchema = SocialSchema();

  return (
    <>
      <Head>
        <AnalyticsHead googleAnalyticsID={Config('app.google_analytics_id')}/>
      </Head>
      <Seo 
        title={meta.metaTitle || meta.title}
        description={meta.metaDescription || meta.description || Config('app.description')}
        themeColor={"#f8fafc"}
        twitterHandle={Config('app.twitter_handle')}
        twitterSite={Config('app.twitter_handle')}
        siteName={Config('app.name')}
        url={`${url}${router.pathname}`}
        image={`${url}${image}`}
        facebookAppID={Config('app.facebook_app_id')}
        pageType={pageType}
        noIndex={noIndex}
      />
      <LogoJsonLd 
        logo={Config('app.url') + SeoLogo.src}
        url={Config('app.url')}
      />
      <BrandJsonLd 
        logo={Config('app.url') + SeoLogo.src}
        id={Config('app.url')}
        slogan={Config('app.tagline')}
      />
      <WebPageJsonLd 
        description={meta.metaDescription || meta.description}
        id={`${Config('app.url')}${router.asPath.split('#')[0]}`}
      />
      {socialSchema.length > 0 && (
        <SocialProfileJsonLd 
          type={Config('app.type')}
          name={Config('app.name')}
          url={url}
          sameAs={socialSchema}
        />
      )}
      {stickyHeader && (
          <Header
            hasNav={Boolean(Component.layoutProps?.Layout?.nav)}
            navIsOpen={navIsOpen}
            onNavToggle={(isOpen) => setNavIsOpen(isOpen)}
          />
        )}
        <Layout {...layoutProps}>
          <AnalyticsBody googleAnalyticsID={Config('app.google_analytics_id')}/>
          <Component {...Component.layoutProps} {...pageProps} />
        </Layout>
    </>
  )
}