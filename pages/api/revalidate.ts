import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' })
  }

  try {
    const body = req.body
    const type: string = body?._type
    const slug: string = body?.slug?.current

    // Member Schools
    if (type === 'school') {
      if (slug) await res.revalidate(`/schools/${slug}`)
      await res.revalidate('/schools')
    }

    // News & Blog Posts
    if (type === 'post') {
      if (slug) await res.revalidate(`/news/${slug}`)
      await res.revalidate('/news')
    }

    // Events (no slug page)
    if (type === 'event') {
      await res.revalidate('/events')
    }

    // Gallery & Media
    if (type === 'mediaItem') {
      if (slug) await res.revalidate(`/gallery/${slug}`)
      await res.revalidate('/gallery')
    }

    // Site Settings — affects all pages
    if (type === 'siteSettings') {
      await res.revalidate('/')
      await res.revalidate('/schools')
      await res.revalidate('/news')
      await res.revalidate('/events')
      await res.revalidate('/gallery')
      await res.revalidate('/about')
    }

    // Authors & Categories
    if (type === 'author' || type === 'category') {
      await res.revalidate('/news')
    }

    // Always revalidate homepage
    await res.revalidate('/')

    return res.json({ revalidated: true, type, slug: slug || 'n/a' })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ message: 'Error revalidating', error: err.message })
  }
}
