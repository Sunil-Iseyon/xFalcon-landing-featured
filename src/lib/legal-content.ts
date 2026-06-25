import fs from 'fs';
import path from 'path';

export interface LegalSection {
  id: string;
  title: string;
  content: string;
  subsections?: Array<{
    title: string;
    content: string;
  }>;
}

export interface ContactSection {
  title: string;
  email: string;
  address: string;
}

export interface ComplianceItem {
  name: string;
  description?: string;
  icon?: string;
}

export interface LegalPageContent {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
  contactSection: ContactSection;
}

export interface PrivacyPolicyContent extends LegalPageContent {
  // Additional privacy-specific fields can be added here
}

export interface TermsAndConditionsContent extends LegalPageContent {
  // Additional terms-specific fields can be added here
}

export interface SecurityAndTrustContent extends LegalPageContent {
  trustBanner?: string;
  complianceSection?: {
    title: string;
    description: string;
    items: ComplianceItem[];
  };
}

/**
 * Load legal page content from JSON files
 * Falls back to importing directly if file system access is not available
 */
export async function loadLegalPageContent(
  pageType: 'privacy-policy' | 'terms-and-conditions' | 'security-and-trust'
): Promise<LegalPageContent> {
  try {
    const contentPath = path.join(
      process.cwd(),
      'src/content/legal',
      `${pageType}.json`
    );

    if (fs.existsSync(contentPath)) {
      const content = fs.readFileSync(contentPath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.warn(`Failed to load legal content from file: ${error}`);
  }

  // Fallback: Content is directly imported in page components
  throw new Error(`Could not load legal page content for ${pageType}`);
}

/**
 * Get all legal pages metadata for sitemap/navigation
 */
export const legalPages = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'Learn how xFalcon collects, uses, and protects your data.',
  },
  {
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    description: 'Review the terms governing your use of xFalcon services.',
  },
  {
    slug: 'security-and-trust',
    title: 'Security & Trust',
    description: 'Discover xFalcon\'s security posture and compliance standards.',
  },
] as const;

/**
 * Format a date string to a human-readable format
 */
export function formatLegalDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}
