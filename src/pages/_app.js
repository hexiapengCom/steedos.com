import '../css/fonts.css'
import '../css/main.css'
import 'focus-visible'
import { useState, useEffect, Fragment } from 'react'
import { Header } from '@/components/Header'
import { Title } from '@/components/Title'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'
import Head from 'next/head'
import twitterLargeCard from '@/img/twitter-large-card.jpg'
import { ResizeObserver } from '@juggle/resize-observer'
import 'intersection-observer'

if (typeof window !== 'undefined' && !('ResizeObserver' in window)) {
  window.ResizeObserver = ResizeObserver
}

const progress = new ProgressBar({
  size: 2,
  color: '#22D3EE',
  className: 'bar-of-progress',
  delay: 100,
})

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
  progress.start()
  progress.finish()
}

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', () => {
  progress.finish()
  window.scrollTo(0, 0)
})
Router.events.on('routeChangeError', progress.finish)

export default function App({ Component, pageProps, router }) {
  let [navIsOpen, setNavIsOpen] = useState(false)

  useEffect(() => {
    if (!navIsOpen) return
    function handleRouteChange() {
      setNavIsOpen(false)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [navIsOpen])

  let Layout = Component.layoutProps?.Layout || Fragment
  let layoutProps = Component.layoutProps?.Layout ? { layoutProps: Component.layoutProps, navIsOpen, setNavIsOpen } : {}
  let meta = Component.layoutProps?.meta || {}
  let description = meta.metaDescription || meta.description || 'Documentation for the Steedos framework.'

  if(Component.getLayoutProps){
    const pageLayoutProps = Component.getLayoutProps(Component, pageProps);
    Layout = pageLayoutProps?.Layout || Fragment
    layoutProps = pageLayoutProps?.Layout ? { layoutProps: pageLayoutProps, navIsOpen, setNavIsOpen } : {}
    meta = pageLayoutProps?.meta || {}
    description = meta.metaDescription || meta.description || 'Documentation for the Steedos framework.'
  }

  if (router.pathname.startsWith('/examples/')) {
    return <Component {...pageProps} />
  }

  return (
    <>
      <Title suffix="华炎魔方">{meta.metaTitle || meta.title}</Title>
      <Head>
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:site" name="twitter:site" content="@tailwindcss" />
        <meta key="twitter:description" name="twitter:description" content={description} />
        <meta
          key="twitter:image"
          name="twitter:image"
          content={`https://steedos.com${twitterLargeCard}`}
        />
        <meta key="twitter:creator" name="twitter:creator" content="@steedos" />
        <meta
          key="og:url"
          property="og:url"
          content={`https://steedos.com${router.pathname}`}
        />
        <meta key="og:type" property="og:type" content="article" />
        <meta key="og:description" property="og:description" content={description} />
        <meta
          key="og:image"
          property="og:image"
          content={`https://steedos.com${twitterLargeCard}`}
        />
      </Head>
      {router.pathname !== '/xxx' && (
        <Header navIsOpen={navIsOpen} onNavToggle={(isOpen) => setNavIsOpen(isOpen)} />
      )}
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}