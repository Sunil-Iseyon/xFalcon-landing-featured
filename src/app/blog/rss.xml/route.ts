import { getAllPosts } from '@/lib/blog';

const BASE_URL = 'https://www.xfalcon.ai';

export async function GET() {
  const posts = await getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.publishedAt).toUTCString();
      const categories = post.tags
        .map((t) => `      <category><![CDATA[${t}]]></category>`)
        .join('\n');
      const image = post.heroImage
        ? `      <enclosure url="${BASE_URL}${post.heroImage}" type="image/jpeg" length="0" />`
        : '';
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>noreply@xfalcon.ai (${post.author.name})</author>
${categories}
${image}
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>xFalcon Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Feature deep-dives, product updates, and guides from the xFalcon team.</description>
    <language>en-US</language>
    <atom:link href="${BASE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/brand/hero/og_1200x630.png</url>
      <title>xFalcon Blog</title>
      <link>${BASE_URL}/blog</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
