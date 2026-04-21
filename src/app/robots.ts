import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://busyloss.com'}/sitemap.xml`,
  }
}
