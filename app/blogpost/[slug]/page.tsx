import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkFrontmatter from "remark-frontmatter" 
import remarkRehype from "remark-rehype"
import rehypeSlug from 'rehype-slug'
import rehypeStringify from "rehype-stringify"
import rehypeHighlight from "rehype-highlight"
import matter from "gray-matter"
import fs from "fs"
import Onthispage from '@/components/Onthispage'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { rehypePrettyCode } from 'rehype-pretty-code'
import { transformerCopyButton } from '@rehype-pretty/transformers'
import { Metadata, ResolvingMetadata } from 'next'
import StructuredData from '@/components/StructuredData' 

 
type Props = {
  params: { slug: string, title: string, description: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// https://ondrejsevcik.com/blog/building-perfect-markdown-processor-for-my-blog


export default async function BlogPage({ params }: { params: { slug: string } }) {
  const processor = unified()
  .use(remarkParse)
  .use(remarkRehype) 
  .use(rehypeStringify) 
  .use(rehypeSlug)
  .use(rehypePrettyCode, {
    theme: "github-dark",
    transformers: [
      transformerCopyButton({
        visibility: 'always',
        feedbackDuration: 3_000,
      }),
    ],
  },
)
  .use(rehypeAutolinkHeadings)


const filePath = `content/${params.slug}.md`
const fileContent = fs.readFileSync(filePath, "utf-8");
const {data, content} = matter(fileContent)

const htmlContent = (await processor.process(content)).toString()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": data.title,
    "description": data.description,
    "image": data.imageUrl ? (data.imageUrl.startsWith('http') ? data.imageUrl : `https://kothapallisandeep.com${data.imageUrl}`) : "https://kothapallisandeep.com/logo.jpg",
    "datePublished": data.date || new Date().toISOString(),
    "dateModified": data.date || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": "Sandeep Kothapalli",
      "alternateName": ["kothapallisandeep", "sandeepkothapalli"],
      "url": "https://kothapallisandeep.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SandyTech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kothapallisandeep.com/logo.jpg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://kothapallisandeep.com/blogpost/${data.slug}`
    },
    "keywords": [
      "kothapallisandeep",
      "sandeepkothapalli",
      "sandytech",
      "sandytech org",
      "AI automation",
      "Idea to MVP",
      ...(data.keywords || []),
      ...(data.hashtags || []).map((tag: string) => tag.replace('#', ''))
    ].join(', '),
    "articleSection": data.category || "Technology",
    "wordCount": content.split(/\s+/).length
  };

  return (
   <MaxWidthWrapper className='prose dark:prose-invert'> 
   <StructuredData data={structuredData} />
   <div className='flex '> 
    <div className='px-16'> 
        <h1>{data.title}</h1>
        {data.hashtags && (
          <div className="flex flex-wrap gap-2 my-4">
            {data.hashtags.map((tag: string, index: number) => (
              <span key={index} className="text-sm text-blue-600 dark:text-blue-400">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div dangerouslySetInnerHTML={{__html: htmlContent}}></div> 
    </div>
        <Onthispage className="text-sm w-[50%]" htmlContent={htmlContent}/>
   </div>
 
   </MaxWidthWrapper>
  )
}  


export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params 
  const filePath = `content/${params.slug}.md`
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const {data} = matter(fileContent)
  
  const keywords = [
    "kothapallisandeep",
    "sandeepkothapalli",
    "sandytech",
    "sandytech org",
    "AI automation",
    "Idea to MVP",
    ...(data.keywords || []),
    ...(data.hashtags || []).map((tag: string) => tag.replace('#', ''))
  ];
  
  const title = data.title;
  const description = data.description || `${data.title} — technical insights from Sandeep Kothapalli, Senior Architect & Founder of SandyTech Pvt Ltd. 13+ years in ${data.category || 'cloud-native'} engineering.`;
  
  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: "Sandeep Kothapalli" }],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: data.date,
      authors: ["Sandeep Kothapalli"],
      tags: data.hashtags || [],
      images: data.imageUrl ? [
        {
          url: data.imageUrl.startsWith('http') ? data.imageUrl : `https://kothapallisandeep.com${data.imageUrl}`,
          width: 1200,
          height: 630,
          alt: data.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@sandeepattech',
      images: data.imageUrl ? [data.imageUrl.startsWith('http') ? data.imageUrl : `https://kothapallisandeep.com${data.imageUrl}`] : [],
    },
    alternates: {
      canonical: `https://kothapallisandeep.com/blogpost/${data.slug}`,
    },
  }
}