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

import { DocumentationLayout } from '@/layouts/DocumentationLayout'
import { ContentsLayout } from '@/layouts/ContentsLayout'
import tinytime from 'tinytime'
import Editor from "rich-markdown-editor";
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { PageHeader } from '@/components/PageHeader'
import { getPost, getBlog, getBlogSidebarLayoutNav } from '@/lib/blog';

import {serialize} from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Heading } from '@/components/Heading';

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
  try {
    // 这些只能在服务端引入，所以只能写在这里。
    const {remarkPlugins} = require('@/../remark')
    const {rehypePlugins} = require('@/../rehype')
    const markdownTOC = require('markdown-toc');

    const { blog_slug, post_slug } = params;
    const blog = await getBlog(blog_slug);
    if (!blog) {
      throw new Error(`Blog with slug '${params.blog_slug}' not found`)
    }
    const post = await getPost(blog_slug, post_slug);
    if (!post) {
      throw new Error(`Post with slug '${params.post_slug}' not found`)
    }
    
    const nav = blog.sidebar? await getBlogSidebarLayoutNav(blog_slug, blog.sidebar):null
    const mdxSource = await serialize(post.body_html, {
      mdxOptions: {
        remarkPlugins,
        rehypePlugins,
      }
    })
    const headings = markdownTOC(post.body_html).json

    const minHeading = 2;

    let tableOfContents = []
    let currentHeading = null
    headings.forEach(heading => {
      if (heading.lvl == minHeading) {
        if (currentHeading)
          tableOfContents.push(currentHeading);
        currentHeading = {
          title: heading.content,
          slug: heading.content,
          children: []
        };
      }
      if (currentHeading && heading.lvl == minHeading + 1) {
        currentHeading.children.push({
          title: heading.content,
          slug: heading.content,
        })
      }
    });
    if (currentHeading)
      tableOfContents.push(currentHeading);
    
    return {
      props: {
        post: post,
        mdxSource,
        nav: nav,
        tableOfContents: tableOfContents,
      }
    }
  } catch (e) {
    // console.error(e.message)
    // res.statusCode = 404
    // res.end()
    // return {props: {
    //   post: {},
    //   tableOfContents: []
    // }}
    throw e
  }
}

export default function Post({ post, nav, mdxSource, tableOfContents }) {
  
  return (
    <ContentsLayout tableOfContents={tableOfContents} meta={{
      title: post.name,
      description: post.description
    }}>
      <MDXRemote {...mdxSource} components={components}/>
    </ContentsLayout>
  )
}

Post.getLayoutProps = (page, pageProps) => {
  return {
    meta: {
      title: pageProps.post.name,
      description: pageProps.post.description,
    },
    nav: pageProps.nav,
    Layout: DocumentationLayout,
  }
}
