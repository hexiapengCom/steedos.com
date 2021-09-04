import { SidebarLayout } from '@/layouts/SidebarLayout'
import Head from 'next/head'
import twitterSquare from '@/img/twitter-square.jpg'
import { pricingNav } from '@/navs/pricing'
import { Footer } from '@/components/Footer'

export function PricingLayout(props) {
  return (
    <>
      <Head>
      </Head>
      <SidebarLayout nav={pricingNav} {...props} />
      <Footer/>
    </>
  )
}
