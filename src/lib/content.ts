import fs from 'fs';
import path from 'path';
import defaultLandingContent from '@/content/landing.json';

interface TinaGraphqlResponse {
  data?: Record<string, unknown>;
  errors?: Array<{ message?: string }>;
}

export interface LandingPageContent {
  hero: {
    eyebrow?: string;
    heading: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
    rotatingWords?: string[];
  };
  whatIs?: {
    text: string;
  };
  why?: {
    points: {
      title: string;
      description: string;
    }[];
  };
  socialProof: {
    text: string;
    logos: string[];
  };
  features: {
    heading: string;
    description: string;
    gridLayout?: boolean;
    items: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  overview: {
    heading: string;
    content: string;
    imageSrc?: string;
  };
  benefits?: {
    heading: string;
    subheading: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  steps: {
    heading: string;
    items: {
      step: string;
      title: string;
      description: string;
      icon: 'user-plus' | 'upload' | 'settings' | 'check-circle';
    }[];
  };
  pricing: {
    heading: string;
    items: {
      name: string;
      price: string;
      period: string;
      description: string;
      popular: boolean;
      ctaText: string;
      features: string[];
    }[];
  };
  testimonials: {
    heading: string;
    items: {
      company?: string | null;
      logo?: string | null;
      quote: string;
      author: string;
      role: string;
      avatar?: string | null;
    }[];
  };
  demosSection: {
    eyebrow: string;
    heading: string;
    subheading: string;
    primaryButtonLabel: string;
    secondaryButtonLabel: string;
  };
  faq: {
    heading: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  cta: {
    heading: string;
    description: string;
    primaryCTA: {
      text: string;
      href: string;
    };
    secondaryCTA?: {
      text: string;
      href: string;
    };
  };
  contactInfo: {
    email: string;
    whatsappDisplay: string;
    whatsappLink: string;
    twitterLink: string;
    instagramLink: string;
  };
  demoDetail: {
    backLabel: string;
    visitLabel: string;
    aboutHeading: string;
    aboutFallbackDescription: string;
    previewFallbackLabel: string;
    contactHeading: string;
    contactDescription: string;
    contactButtonText: string;
    contactSubjectPrefix: string;
  };
  footer: {
    logoSrc?: string;
    logoAlt?: string;
    companyName: string;
    companyDescription: string;
    tagline: string;
    sections: {
      title: string;
      links: {
        label: string;
        href: string;
      }[];
    }[];
    socialLinks?: {
      label: string;
      href: string;
    }[];
    copyright: string;
  };
}

export interface DemoEntry {
  title: string;
  description?: string;
  path: string;
  thumbnail?: string;
  category?: string;
  featured?: boolean;
  order?: number;
}

const LANDING_CONTENT_PATH = path.join(
  process.cwd(),
  'src',
  'content',
  'landing.json'
);

const DEMOS_CONTENT_PATH = path.join(process.cwd(), 'content', 'demos');

const TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID?.trim() ?? '';
const TINA_TOKEN =
  process.env.TINA_TOKEN?.trim() ||
  process.env.TINA_READONLY_TOKEN?.trim() ||
  '';
const TINA_BRANCH =
  process.env.NEXT_PUBLIC_TINA_BRANCH?.trim() ||
  process.env.VERCEL_GIT_COMMIT_REF?.trim() ||
  process.env.HEAD?.trim() ||
  'main';

let hasLoggedTinaAuthWarning = false;
let hasLoggedTinaFetchWarning = false;

const LANDING_TINA_QUERY = `
  query LandingPageContent {
    landingDocument(relativePath: "landing.json") {
      data {
        hero {
          eyebrow
          heading
          subtitle
          ctaText
          ctaHref
        }
        whatIs {
          text
        }
        why {
          points {
            title
            description
          }
        }
        socialProof {
          text
          logos
        }
        features {
          heading
          description
          gridLayout
          items {
            title
            description
            icon
          }
        }
        overview {
          heading
          content
          imageSrc
        }
        benefits {
          heading
          subheading
          items {
            title
            description
          }
        }
        steps {
          heading
          items {
            step
            title
            description
            icon
          }
        }
        pricing {
          heading
          items {
            name
            price
            period
            description
            popular
            ctaText
            features
          }
        }
        testimonials {
          heading
          items {
            company
            logo
            quote
            author
            role
            avatar
          }
        }
        demosSection {
          eyebrow
          heading
          subheading
          primaryButtonLabel
          secondaryButtonLabel
        }
        faq {
          heading
          items {
            question
            answer
          }
        }
        cta {
          heading
          description
          primaryCTA {
            text
            href
          }
          secondaryCTA {
            text
            href
          }
        }
        contactInfo {
          email
          whatsappDisplay
          whatsappLink
          twitterLink
          instagramLink
        }
        demoDetail {
          backLabel
          visitLabel
          aboutHeading
          aboutFallbackDescription
          previewFallbackLabel
          contactHeading
          contactDescription
          contactButtonText
          contactSubjectPrefix
        }
        footer {
          logoSrc
          logoAlt
          companyName
          companyDescription
          tagline
          sections {
            title
            links {
              label
              href
            }
          }
          socialLinks {
            label
            href
          }
          copyright
        }
      }
    }
  }
`;

const DEMOS_TINA_QUERY = `
  query DemoEntries {
    demosConnection {
      edges {
        node {
          ... on Demos {
            title
            description
            path
            thumbnail
            category
            featured
            order
          }
        }
      }
    }
  }
`;

/**
 * Get landing page content
 * This function reads from local JSON files in the repo
 */
export async function getLandingContent(): Promise<LandingPageContent> {
  const localContent = getLandingContentFromFile();
  if (localContent) {
    return normalizeLandingContent(localContent);
  }

  const tinaContent = await getLandingContentFromTina();
  if (tinaContent) {
    return normalizeLandingContent(tinaContent);
  }

  return getDefaultLandingContent();
}

/**
 * Default landing content as fallback
 */
export function getDefaultLandingContent(): LandingPageContent {
  return normalizeLandingContent(defaultLandingContent as LandingPageContent);
}

export async function getDemoEntries(): Promise<DemoEntry[]> {
  const tinaDemos = await getDemoEntriesFromTina();
  const localDemos = getDemoEntriesFromFiles();

  if (tinaDemos.length > 0 && localDemos.length > 0) {
    return sortDemoEntries(mergeDemoEntries(tinaDemos, localDemos));
  }

  if (tinaDemos.length > 0) {
    return sortDemoEntries(tinaDemos);
  }

  return sortDemoEntries(localDemos);
}

export async function getDemoEntryByOrder(order: number): Promise<DemoEntry | null> {
  const demos = await getDemoEntries();
  return demos.find((demo) => demo.order === order) ?? null;
}

async function getLandingContentFromTina(): Promise<Partial<LandingPageContent> | null> {
  try {
    const data = await fetchFromTina(LANDING_TINA_QUERY);
    const landingDocument = data?.landingDocument as { data?: unknown } | undefined;
    const landingData = landingDocument?.data;

    if (!landingData || typeof landingData !== 'object') {
      return null;
    }

    return landingData as Partial<LandingPageContent>;
  } catch (error) {
    console.error('Error reading landing content from Tina Cloud:', error);
    return null;
  }
}

async function getDemoEntriesFromTina(): Promise<DemoEntry[]> {
  try {
    const data = await fetchFromTina(DEMOS_TINA_QUERY);
    const demosConnection = data?.demosConnection as
      | { edges?: Array<{ node?: Partial<DemoEntry> | null } | null> }
      | undefined;

    if (!demosConnection?.edges?.length) {
      return [];
    }

    return demosConnection.edges
      .map((edge) => normalizeDemoEntry(edge?.node ?? {}))
      .filter((entry): entry is DemoEntry => Boolean(entry));
  } catch (error) {
    console.error('Error reading demos content from Tina Cloud:', error);
    return [];
  }
}

async function fetchFromTina(query: string): Promise<Record<string, unknown> | null> {
  const tinaApiUrl = getTinaApiUrl();
  if (!tinaApiUrl || !TINA_TOKEN) {
    return null;
  }

  let response: Response;

  try {
    response = await fetch(tinaApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TINA_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      cache: 'no-store',
    });
  } catch (error) {
    logTinaFetchWarningOnce(error);
    return null;
  }

  if (response.status === 401 || response.status === 403) {
    logTinaAuthWarningOnce(response.status);
    return null;
  }

  if (!response.ok) {
    logTinaFetchWarningOnce(
      new Error(`Tina content API request failed with status ${response.status}`)
    );
    return null;
  }

  let payload: TinaGraphqlResponse;

  try {
    payload = (await response.json()) as TinaGraphqlResponse;
  } catch (error) {
    logTinaFetchWarningOnce(error);
    return null;
  }

  if (payload.errors?.length) {
    const errorMessage = payload.errors
      .map((item) => item.message)
      .filter(Boolean)
      .join('; ');

    logTinaFetchWarningOnce(
      new Error(errorMessage || 'Tina content API returned an unknown GraphQL error')
    );
    return null;
  }

  return payload.data ?? null;
}

function getTinaApiUrl(): string {
  if (!TINA_CLIENT_ID) {
    return '';
  }

  return `https://content.tinajs.io/content/${TINA_CLIENT_ID}/github/${TINA_BRANCH}`;
}

function logTinaAuthWarningOnce(statusCode: number): void {
  if (hasLoggedTinaAuthWarning) {
    return;
  }

  hasLoggedTinaAuthWarning = true;
  console.warn(
    `Tina Cloud returned ${statusCode}. Falling back to local content. Verify NEXT_PUBLIC_TINA_CLIENT_ID, TINA_TOKEN (or TINA_READONLY_TOKEN), and NEXT_PUBLIC_TINA_BRANCH.`
  );
}

function logTinaFetchWarningOnce(error: unknown): void {
  if (hasLoggedTinaFetchWarning) {
    return;
  }

  hasLoggedTinaFetchWarning = true;

  const message = error instanceof Error ? error.message : 'Unknown error';
  console.warn(
    `Tina content request failed (${message}). Falling back to local content from src/content and content/demos.`
  );
}

function getLandingContentFromFile(): Partial<LandingPageContent> | null {
  try {
    const content = fs.readFileSync(LANDING_CONTENT_PATH, 'utf-8');
    return JSON.parse(content) as LandingPageContent;
  } catch (error) {
    console.error('Error reading local landing content:', error);
    return null;
  }
}

function getDemoEntriesFromFiles(): DemoEntry[] {
  try {
    if (!fs.existsSync(DEMOS_CONTENT_PATH)) {
      return [];
    }

    const files = fs
      .readdirSync(DEMOS_CONTENT_PATH)
      .filter((fileName) => fileName.endsWith('.md'));

    return files
      .map((fileName) => {
        const raw = fs.readFileSync(path.join(DEMOS_CONTENT_PATH, fileName), 'utf-8');
        const parsed = parseFrontmatter(raw);
        return normalizeDemoEntry(parsed);
      })
      .filter((entry): entry is DemoEntry => Boolean(entry));
  } catch (error) {
    console.error('Error reading local demos content:', error);
    return [];
  }
}

function parseFrontmatter(markdown: string): Partial<DemoEntry> {
  const match = markdown.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return {};
  }

  const frontmatter = match[1];
  const result: Partial<DemoEntry> = {};

  for (const line of frontmatter.split(/\r?\n/)) {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex <= 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['\"]|['\"]$/g, '');

    if (key === 'featured') {
      result.featured = value.toLowerCase() === 'true';
      continue;
    }

    if (key === 'order') {
      const order = Number(value);
      if (!Number.isNaN(order)) {
        result.order = order;
      }
      continue;
    }

    if (key === 'title') result.title = value;
    if (key === 'description') result.description = value;
    if (key === 'path') result.path = value;
    if (key === 'thumbnail') result.thumbnail = value;
    if (key === 'category') result.category = value;
  }

  return result;
}

function normalizeDemoEntry(entry: Partial<DemoEntry>): DemoEntry | null {
  const title = String(entry.title ?? '').trim();
  const demoPath = resolveDemoPath(String(entry.path ?? '').trim());

  if (!title || !demoPath || !isValidDemoPath(demoPath)) {
    return null;
  }

  return {
    title,
    description: entry.description ? String(entry.description).trim() : '',
    path: demoPath,
    thumbnail: entry.thumbnail ? String(entry.thumbnail).trim() : '',
    category: entry.category ? String(entry.category).trim() : '',
    featured: Boolean(entry.featured),
    order: typeof entry.order === 'number' ? entry.order : Number.MAX_SAFE_INTEGER,
  };
}

function normalizeDemoPath(value: string): string {
  if (!value) {
    return '';
  }

  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;
  if (withLeadingSlash.endsWith('.html')) {
    return withLeadingSlash;
  }

  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

function resolveDemoPath(value: string): string {
  const normalizedPath = normalizeDemoPath(value);
  if (!normalizedPath) {
    return '';
  }

  const relativeDemoPath = normalizedPath
    .replace(/^\//, '')
    .replace(/\/$/, '');
  const fileSystemRelativePath = decodePathForFileSystem(relativeDemoPath);
  const absoluteDemoPath = path.join(process.cwd(), 'public', fileSystemRelativePath);

  if (normalizedPath.endsWith('.html') && fs.existsSync(absoluteDemoPath)) {
    return normalizedPath;
  }

  const directIndexPath = path.join(absoluteDemoPath, 'index.html');

  if (fs.existsSync(directIndexPath)) {
    return `${normalizedPath}index.html`;
  }

  if (!fs.existsSync(absoluteDemoPath)) {
    return '';
  }

  const childDirectories = fs
    .readdirSync(absoluteDemoPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  if (childDirectories.length !== 1) {
    return '';
  }

  const childDir = childDirectories[0];
  const childIndexPath = path.join(absoluteDemoPath, childDir, 'index.html');
  if (!fs.existsSync(childIndexPath)) {
    return '';
  }

  const childUrlSegment = childDir
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');

  return `${normalizedPath}${childUrlSegment}/index.html`;
}

function isValidDemoPath(value: string): boolean {
  return /^\/demos\/.+(\/|\/index\.html)$/.test(value);
}

function decodePathForFileSystem(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function sortDemoEntries(entries: DemoEntry[]): DemoEntry[] {
  return [...entries].sort((a, b) => {
    const aOrder = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
    const bOrder = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    return a.title.localeCompare(b.title);
  });
}

function mergeDemoEntries(primary: DemoEntry[], overrides: DemoEntry[]): DemoEntry[] {
  const merged = new Map<string, DemoEntry>();

  for (const entry of primary) {
    merged.set(getDemoEntryKey(entry), entry);
  }

  for (const entry of overrides) {
    merged.set(getDemoEntryKey(entry), entry);
  }

  return Array.from(merged.values());
}

function getDemoEntryKey(entry: DemoEntry): string {
  if (typeof entry.order === 'number' && Number.isFinite(entry.order)) {
    return `order:${entry.order}`;
  }

  return `path:${entry.path}`;
}

function normalizeLandingContent(content: Partial<LandingPageContent>): LandingPageContent {
  const defaults = defaultLandingContent as LandingPageContent;
  const benefits = content.benefits ?? defaults.benefits;
  const resolvedSecondaryCta = content.cta?.secondaryCTA ?? defaults.cta.secondaryCTA;
  const hasSecondaryCta = Boolean(
    resolvedSecondaryCta?.text && resolvedSecondaryCta?.href
  );

  return {
    hero: {
      ...defaults.hero,
      ...content.hero,
    },
    whatIs: {
      text: content.whatIs?.text ?? defaults.whatIs?.text ?? 'xFalcon is an AI analytics workspace that comes pre-trained on your industry — ready to surface decisions, not just charts.',
    },
    why: {
      points: content.why?.points ?? defaults.why?.points ?? [],
    },
    socialProof: {
      ...defaults.socialProof,
      ...content.socialProof,
      logos: content.socialProof?.logos ?? defaults.socialProof.logos,
    },
    features: {
      ...defaults.features,
      ...content.features,
      items: content.features?.items ?? defaults.features.items,
    },
    overview: {
      ...defaults.overview,
      ...content.overview,
    },
    ...(benefits
      ? {
          benefits: {
            ...benefits,
            items: benefits.items ?? [],
          },
        }
      : {}),
    steps: {
      ...defaults.steps,
      ...content.steps,
      items: content.steps?.items ?? defaults.steps.items,
    },
    pricing: {
      ...defaults.pricing,
      ...content.pricing,
      items: content.pricing?.items ?? defaults.pricing.items,
    },
    testimonials: {
      ...defaults.testimonials,
      ...content.testimonials,
      items: content.testimonials?.items ?? defaults.testimonials.items,
    },
    demosSection: {
      ...defaults.demosSection,
      ...content.demosSection,
    },
    faq: {
      ...defaults.faq,
      ...content.faq,
      items: content.faq?.items ?? defaults.faq.items,
    },
    cta: {
      ...defaults.cta,
      ...content.cta,
      primaryCTA: {
        ...defaults.cta.primaryCTA,
        ...content.cta?.primaryCTA,
      },
      ...(hasSecondaryCta
        ? {
            secondaryCTA: {
              text: resolvedSecondaryCta!.text,
              href: resolvedSecondaryCta!.href,
            },
          }
        : {}),
    },
    contactInfo: {
      ...defaults.contactInfo,
      ...content.contactInfo,
    },
    demoDetail: {
      ...defaults.demoDetail,
      ...content.demoDetail,
    },
    footer: {
      ...defaults.footer,
      ...content.footer,
      sections: content.footer?.sections ?? defaults.footer.sections,
      socialLinks: content.footer?.socialLinks ?? defaults.footer.socialLinks,
    },
  };
}
