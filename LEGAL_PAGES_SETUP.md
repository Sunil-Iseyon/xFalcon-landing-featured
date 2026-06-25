# Legal Pages Documentation

This document provides comprehensive information about the three new legal pages (Privacy Policy, Terms & Conditions, and Security & Trust) and how to manage them through TinaCMS.

## Overview

The xFalcon website now includes three professional legal pages designed for enterprise customers:

1. **Privacy Policy** (`/privacy-policy`) - Data collection, usage, and protection
2. **Terms & Conditions** (`/terms-and-conditions`) - Service usage terms and conditions
3. **Security & Trust** (`/security-and-trust`) - Security posture and compliance information

All pages are:
- ✅ Fully editable through TinaCMS
- ✅ SEO-optimized with metadata
- ✅ Mobile-responsive
- ✅ Accessible (WCAG 2.1 compliant)
- ✅ Integrated into site navigation and footer
- ✅ TypeScript-enabled with full type safety

## Architecture

### File Structure

```
src/
├── app/
│   ├── privacy-policy/
│   │   └── page.tsx              # Privacy Policy page
│   ├── terms-and-conditions/
│   │   └── page.tsx              # Terms & Conditions page
│   └── security-and-trust/
│       └── page.tsx              # Security & Trust page
├── components/
│   └── legal/
│       └── LegalPageLayout.tsx    # Reusable layout component
├── content/
│   └── legal/
│       ├── privacy-policy.json
│       ├── terms-and-conditions.json
│       └── security-and-trust.json
└── lib/
    └── legal-content.ts          # TypeScript types and utilities
```

### TinaCMS Configuration

Three new collections have been added to `tina/config.ts`:

#### 1. Privacy Policy Collection
- **Path**: `src/content/legal/privacy-policy.json`
- **Format**: JSON
- **Fields**:
  - `title`: Page title (string)
  - `description`: Meta description (textarea)
  - `lastUpdated`: Last updated date in YYYY-MM-DD format
  - `sections`: Array of page sections (see Section Structure below)
  - `contactSection`: Contact information

#### 2. Terms & Conditions Collection
- **Path**: `src/content/legal/terms-and-conditions.json`
- **Format**: JSON
- **Fields**: Same as Privacy Policy

#### 3. Security & Trust Collection
- **Path**: `src/content/legal/security-and-trust.json`
- **Format**: JSON
- **Fields**:
  - All fields from Privacy Policy
  - `trustBanner`: Trust banner text (string) - displayed at top of page
  - `complianceSection`: Compliance and certifications information

## Managing Content in TinaCMS

### Accessing TinaCMS

1. Navigate to the admin panel: `http://localhost:3000/admin`
2. In the collections panel, find "Privacy Policy", "Terms & Conditions", or "Security & Trust"
3. Click to edit

### Section Structure

Each page consists of sections with this structure:

```json
{
  "id": "introduction",              // Used for anchor links
  "title": "Introduction",            // Section title
  "content": "Main content here...",  // Main content (supports markdown)
  "subsections": [
    {
      "title": "Subsection Title",
      "content": "Subsection content..."
    }
  ]
}
```

### Editing Content

#### Best Practices

1. **Section IDs**: Use lowercase, hyphen-separated IDs (e.g., `data-protection`, `compliance-governance`)
2. **Content Formatting**:
   - Supports multi-line content
   - Use markdown formatting for bold, italics, links
   - Line breaks are preserved
3. **Subsections**: Optional - use for complex sections with multiple topics
4. **Last Updated**: Update automatically or manually in YYYY-MM-DD format
5. **Contact Information**: Ensure email address is valid

#### Example: Adding a New Section

1. Open the page in TinaCMS
2. Click "Add New" in the Sections list
3. Fill in the fields:
   - **ID**: `new-section-id`
   - **Title**: `New Section Title`
   - **Content**: Your content here
   - **Subsections**: (Optional) Click "Add New" to add subsections
4. Click "Save"

### Contact Section

Each page has a contact section with:
- **Email**: Contact email address
- **Address**: Mailing address (multi-line)
- **Title**: Section title (e.g., "Privacy Team")

## Page Components

### LegalPageLayout Component

Located at `src/components/legal/LegalPageLayout.tsx`

#### Features

- **Sticky Table of Contents**: Auto-generated from sections
- **Trust Banner**: (Security & Trust page only) Prominent banner at top
- **Smooth Scrolling**: Scroll-to-section navigation
- **Mobile Responsive**: Adapts to all screen sizes
- **Contact Section**: Always at bottom of page
- **Back to Top Button**: Smooth scroll to top

#### Props

```typescript
interface LegalPageProps {
  title: string;              // Page title
  description: string;        // Meta description
  lastUpdated: string;        // Last updated date (YYYY-MM-DD)
  sections: LegalSection[];   // Page sections
  contactEmail: string;       // Contact email
  contactAddress: string;     // Contact address
  contactTitle?: string;      // "Contact Us" or custom title
  trustBanner?: string;       // (Optional) Trust banner text
}
```

## Page-Specific Information

### Privacy Policy (`/privacy-policy`)

**Sections Included**:
1. Introduction
2. Information We Collect
3. How We Use Information
4. Data Storage and Security
5. Third-Party Services
6. Cookies and Analytics
7. Data Retention
8. Your Rights
9. International Data Transfers
10. Changes to This Policy
11. Contact Information

**Focus**: Enterprise data protection, GDPR/CCPA compliance, transparency

**Key Emails**:
- `privacy@xfalcon.ai`

### Terms & Conditions (`/terms-and-conditions`)

**Sections Included**:
1. Acceptance of Terms
2. Use of Services
3. User Responsibilities
4. Intellectual Property Rights
5. Service Availability
6. Limitation of Liability
7. Third-Party Services
8. Account Security
9. Termination
10. Governing Law
11. Changes to Terms
12. Contact Information

**Focus**: SaaS platform terms, business customers, legal protection

**Key Emails**:
- `legal@xfalcon.ai`

### Security & Trust (`/security-and-trust`)

**Sections Included**:
1. Security Overview
2. Data Protection
3. Access Control
4. Encryption
5. Infrastructure Security
6. Monitoring & Incident Response
7. Privacy Commitment
8. Responsible AI Practices
9. Compliance & Governance
10. Security Partnerships

**Special Features**:
- Trust banner at top
- Compliance section with certifications
- Focus on enterprise security posture

**Key Emails**:
- `security@xfalcon.ai`

**Compliance Items**: SOC 2 Type II, ISO/IEC 27001, GDPR, CCPA, NIST, HIPAA

## SEO & Metadata

Each page includes optimized metadata:

### Meta Tags
- Title: "{Page Title} — xFalcon"
- Description: Content-specific descriptions
- Canonical URL: Prevents duplicate content issues
- Open Graph: Social media sharing

### Structured Data
- Robot indexing enabled
- Canonical URLs configured
- Mobile-friendly design

### URLs
- `/privacy-policy`
- `/terms-and-conditions`
- `/security-and-trust`

## Navigation Updates

### Footer Links

The footer has been updated with a "Legal" section containing:
- Privacy Policy → `/privacy-policy`
- Terms & Conditions → `/terms-and-conditions`
- Security & Trust → `/security-and-trust`

**Location**: Managed in TinaCMS under Landing Page > Footer Section > Legal

## TypeScript Integration

### Legal Content Types

See `src/lib/legal-content.ts` for complete type definitions:

```typescript
export interface LegalSection {
  id: string;
  title: string;
  content: string;
  subsections?: Array<{
    title: string;
    content: string;
  }>;
}

export interface LegalPageContent {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
  contactSection: ContactSection;
}
```

### Utility Functions

```typescript
// Load legal content
async function loadLegalPageContent(
  pageType: 'privacy-policy' | 'terms-and-conditions' | 'security-and-trust'
): Promise<LegalPageContent>

// Get all legal pages
export const legalPages = [
  { slug: 'privacy-policy', title: '...', description: '...' },
  // ...
]

// Format dates
export function formatLegalDate(dateString: string): string
```

## Customization Guide

### Changing Colors

Edit `src/components/legal/LegalPageLayout.tsx` to update Tailwind color classes:

```typescript
// Current color scheme
// Primary text: #061122 (xf-navy)
// Accent: #2ED1ED (xf-cyan)
// Light background: #F5F8FC
```

### Modifying Layout

The component uses a 2-column layout on desktop (TOC + Content). To modify:

1. **Table of Contents**: Update the `lg:col-span-1` section
2. **Content Area**: Update the `lg:col-span-3` section
3. **Contact Section**: Update the grid in the contact area

### Adding New Sections

1. Add section to JSON in TinaCMS
2. Component automatically renders it
3. TOC automatically updates

## Accessibility

All pages comply with WCAP 2.1 Level AA:

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy (h2 for sections, h3 for subsections)
- ✅ Color contrast ratios meet standards
- ✅ Mobile-friendly touch targets
- ✅ Keyboard navigation support
- ✅ ARIA labels on interactive elements
- ✅ Responsive text sizing

## Performance

- ✅ Static page generation
- ✅ Optimized CSS with Tailwind
- ✅ Lazy-loaded components
- ✅ Image optimization
- ✅ Mobile-first responsive design

## Testing

### Manual Testing

1. **Navigation**: Test all section links in TOC
2. **Responsiveness**: Test on mobile, tablet, desktop
3. **Accessibility**: Use axe DevTools browser extension
4. **Links**: Verify all external links work
5. **Contact Info**: Verify email addresses are correct

### Automated Testing

Run the test suite:
```bash
npm run test
```

## Maintenance

### Regular Updates

1. **Privacy Policy**: Update whenever data practices change
2. **Terms & Conditions**: Update with business changes
3. **Security & Trust**: Update after security audits or compliance changes

### Update Checklist

- [ ] Update content in TinaCMS
- [ ] Update `lastUpdated` date
- [ ] Verify all links work
- [ ] Check mobile layout
- [ ] Test accessibility
- [ ] Publish changes

## Deployment

Pages are automatically deployed with the main site:

1. Changes in TinaCMS → Git commits
2. Git commits → Build pipeline
3. Build pipeline → Production deployment

No additional steps needed!

## Troubleshooting

### Issue: Page not appearing in footer

**Solution**: Verify the links in TinaCMS Footer Section match the page URLs.

### Issue: Content not updating

**Solution**:
1. Clear browser cache
2. Rebuild the site: `npm run build`
3. Restart dev server: `npm run dev`

### Issue: Styling looks wrong

**Solution**:
1. Verify Tailwind CSS is running: `npm run dev`
2. Check for conflicting global CSS
3. Clear Next.js cache: `rm -rf .next`

## Future Enhancements

Potential additions:
- [ ] Changelog page showing version history
- [ ] Translations/i18n support
- [ ] PDF export functionality
- [ ] Email notification for updates
- [ ] Version control in TinaCMS

## References

- [TinaCMS Documentation](https://tina.io/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Contact

For questions or issues:
- **Technical Issues**: File a GitHub issue
- **Content Questions**: Contact the legal team
- **Design Questions**: Contact the design team

---

**Last Updated**: June 2024
**Version**: 1.0
