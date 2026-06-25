import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  heroImage?: string;
  heroImageAlt?: string;
  tags: string[];
  author: { name: string; role: string; avatar?: string };
  publishedAt: string;
  readingTime: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    canonical?: string;
    noindex?: boolean;
  };
  body: string;
}

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

function parseFrontmatter(raw: string): { frontmatter: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: raw };
  const lines = match[1]!.split('\n');
  const fm: Record<string, unknown> = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i]!;
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) { i++; continue; }
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim();
    // nested object (author, seo)
    if (val === '') {
      const obj: Record<string, string> = {};
      i++;
      while (i < lines.length && lines[i]!.startsWith('  ')) {
        const inner = lines[i]!.trim();
        const ic = inner.indexOf(':');
        if (ic !== -1) obj[inner.slice(0, ic).trim()] = inner.slice(ic + 1).trim().replace(/^["']|["']$/g, '');
        i++;
      }
      fm[key] = obj;
      continue;
    }
    // array
    if (val === '' || val.startsWith('[')) {
      fm[key] = val.replace(/^\[|\]$/g, '').split(',').map((s) => s.trim().replace(/^["']|["']$/g, ''));
    } else {
      fm[key] = val.replace(/^["']|["']$/g, '');
    }
    i++;
  }
  return { frontmatter: fm, body: match[2]! };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const { frontmatter: fm, body } = parseFrontmatter(raw);
    const slug = (fm.slug as string) ?? file.replace(/\.(mdx|md)$/, '');
    return {
      slug,
      title: (fm.title as string) ?? '',
      excerpt: (fm.excerpt as string) ?? '',
      heroImage: fm.heroImage as string | undefined,
      heroImageAlt: fm.heroImageAlt as string | undefined,
      tags: Array.isArray(fm.tags) ? (fm.tags as string[]) : [],
      author: (fm.author as BlogPost['author']) ?? { name: 'xFalcon Team', role: 'Product' },
      publishedAt: (fm.publishedAt as string) ?? '',
      readingTime: Number(fm.readingTime ?? 4),
      seo: fm.seo as BlogPost['seo'],
      body,
    } satisfies BlogPost;
  });
  return posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getAdjacentPosts(slug: string): Promise<{ prev: BlogPost | null; next: BlogPost | null }> {
  const posts = await getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? (posts[index - 1] ?? null) : null,
    next: index < posts.length - 1 ? (posts[index + 1] ?? null) : null,
  };
}

export async function getRelatedPosts(slug: string, tags: string[], limit = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts
    .filter((p) => p.slug !== slug && p.tags.some((t) => tags.includes(t)))
    .slice(0, limit);
}
