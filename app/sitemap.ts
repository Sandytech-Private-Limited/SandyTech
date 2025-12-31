import { MetadataRoute } from 'next'
import fs from 'fs'
import matter from 'gray-matter'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kothapallisandeep.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Dynamic blog pages
  const contentDir = `${process.cwd()}/content`
  const files = fs.readdirSync(contentDir)
  const blogPages = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const fileContent = fs.readFileSync(`${contentDir}/${file}`, 'utf-8')
      const { data } = matter(fileContent)
      return {
        url: `${baseUrl}/blogpost/${data.slug}`,
        lastModified: data.date ? new Date(data.date) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }
    })

  return [...staticPages, ...blogPages]
}

