import { redirect } from 'next/navigation';
import { getDemoEntries } from '@/lib/content';

interface Props {
  params: { slug: string };
}

export default async function DemoRedirectPage({ params }: Props) {
  const { slug } = params;
  const demos = await getDemoEntries();

  const normalized = slug.toLowerCase();

  // Try to find a demo whose path ends with the slug or contains the slug in title
  const match = demos.find((d) => {
    try {
      const pathSegment = d.path.replace(/\/index\.html$|\.html$/i, '').toLowerCase();
      if (pathSegment.endsWith(`/${normalized}`) || pathSegment.includes(`/${normalized}`)) {
        return true;
      }
    } catch {}

    const titleSlug = d.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (titleSlug === normalized) return true;

    return false;
  });

  if (match) {
    // Redirect to the actual demo HTML path (relative)
    redirect(match.path);
  }

  // Fallback: redirect to demos index
  redirect('/');
}
