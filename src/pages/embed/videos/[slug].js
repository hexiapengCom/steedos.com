import {
    useRef,
    useState,
    useEffect,
    createContext,
    Fragment,
    useCallback,
    isValidElement,
    useContext,
} from 'react'

import dynamic from 'next/dynamic'

import { SidebarLayout } from '@/layouts/SidebarLayout'
import ArticleLayout from '@/layouts/ArticleLayout'
import tinytime from 'tinytime'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { PageHeader } from '@/components/PageHeader'
import { getVideo } from '@/lib/video';
import { NextSeo } from 'next-seo'
// const {serialize} = require('next-mdx-remote/serialize')
// import { MDXRemote } from 'next-mdx-remote'
import { Heading } from '@/components/Heading';
import { Markdown } from '@/components/Markdown'
import Link from 'next/link'
import { Player } from '@/components/player'

const components = {
    Heading,
}

export async function getServerSideProps({
    params,
    res,
    locale,
    locales,
    preview,
}) {
    // 这些只能在服务端引入，所以只能写在这里。

    // const markdownTOC = require('markdown-toc');

    const { slug } = params;
    const video = await getVideo(slug);
    if (!video) {
        return {
            notFound: true,
        }
    }

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    return {
        props: {
            title: video.name,
            ...video
        }
    }
}

export default function VideoEmbed(props) {

    const router = useRouter()

    const {
        title = 'Missing title',
        _id,
        body,
        download_url,
        duration,
        hls_url,
        is_free,
        name,
        owner,
        published_at,
        site,
        slug,
        subtitles_url,
        thumb_image
    } = props

    let seo_title_calc = title;
    const url = process.env.NEXT_PUBLIC_DEPLOYMENT_URL + router.asPath
    const imageUrl = thumb_image ? process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL + `/api/files/images/${thumb_image}` : null
    return (
        <>
            <NextSeo
                title={seo_title_calc}
                openGraph={{
                    title: seo_title_calc,
                    url,
                    images: [
                        {
                            url: imageUrl,
                            alt: title,
                        },
                    ],
                }}
            />
            <div style={{height: '400px'}} className="bg-black grid place-items-center">
                <Player
                  hls_url={hls_url}
                  light={`${process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL}/api/files/images/${thumb_image}`}
                  height="400px"
                  // subtitlesUrl={subtitles_url}
                />
            </div>
        </>
    )
}

VideoEmbed.getLayout = (Component, pageProps)=>{
    return <Component {...pageProps} />
}