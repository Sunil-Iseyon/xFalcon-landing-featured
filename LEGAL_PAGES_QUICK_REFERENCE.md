# Legal Pages Quick Reference

## Page URLs

```
/privacy-policy
/terms-and-conditions
/security-and-trust
```

## Direct Links

- **Privacy Policy**: https://xfalcon.ai/privacy-policy
- **Terms & Conditions**: https://xfalcon.ai/terms-and-conditions
- **Security & Trust**: https://xfalcon.ai/security-and-trust

## Contact Emails

| Page | Email |
|------|-------|
| Privacy Policy | privacy@xfalcon.ai |
| Terms & Conditions | legal@xfalcon.ai |
| Security & Trust | security@xfalcon.ai |

## TinaCMS Collection Names

- Privacy Policy
- Terms & Conditions
- Security & Trust

## File Locations

**Content**: `src/content/legal/`
- `privacy-policy.json`
- `terms-and-conditions.json`
- `security-and-trust.json`

**Components**: `src/components/legal/`
- `LegalPageLayout.tsx`

**Page Components**: `src/app/`
- `privacy-policy/page.tsx`
- `terms-and-conditions/page.tsx`
- `security-and-trust/page.tsx`

**Utilities**: `src/lib/legal-content.ts`

## Last Updated Dates

- Privacy Policy: 2024-06-01
- Terms & Conditions: 2024-06-01
- Security & Trust: 2024-06-01

## Key Features

✅ Full TinaCMS support
✅ SEO optimized
✅ Mobile responsive
✅ WCAG 2.1 AA accessible
✅ Enterprise-focused content
✅ Compliance ready (GDPR, CCPA)
✅ Automatic sitemap inclusion
✅ Professional design system

## Number of Sections

- Privacy Policy: 10 sections
- Terms & Conditions: 11 sections
- Security & Trust: 10 sections (+ compliance section)

## Documentation Files

- **Setup Guide**: `LEGAL_PAGES_SETUP.md`
- **Editorial Guide**: `EDITORIAL_GUIDE.md`
- **Implementation Summary**: `LEGAL_PAGES_IMPLEMENTATION.md`
- **This File**: Quick Reference

## Editing Checklist

When updating content in TinaCMS:

1. [ ] Edit content in the appropriate collection
2. [ ] Update "Last Updated" date (YYYY-MM-DD format)
3. [ ] Verify all links work
4. [ ] Proofread the content
5. [ ] Click "Save"
6. [ ] Wait 1-2 minutes for deployment

## Colors (Tailwind Classes)

- Primary: `text-[#061122]` (Navy)
- Accent: `text-[#2ED1ED]` (Cyan)
- Light BG: `bg-[#F5F8FC]`
- Dark BG: `bg-[#0B1220]`
- Border: `border-[#e0e0e0]`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Metrics

All pages are:
- ✅ Static generated
- ✅ Optimized for Core Web Vitals
- ✅ Mobile-first responsive
- ✅ Under 500KB total size

## Troubleshooting

**Changes not showing?**
- Click Save button
- Wait 1-2 minutes
- Refresh browser
- Clear cache (Ctrl+Shift+Del)

**Page not in footer?**
- Check landing.json footer section
- Verify link URLs match page routes

**Styling looks off?**
- Restart dev server: `npm run dev`
- Clear Next.js cache: `rm -rf .next`

## Related Files

**Git should track**:
- `src/content/legal/*.json`
- `src/app/*/page.tsx`
- `src/components/legal/*.tsx`
- `src/lib/legal-content.ts`
- `src/app/sitemap.ts`
- `public/robots.txt`
- TinaCMS config changes

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

## Accessibility Keys

- **ARIA Labels**: On all interactive elements
- **Semantic HTML**: Proper heading structure
- **Color Contrast**: WCAG AA minimum
- **Keyboard Nav**: Full support
- **Screen Readers**: Fully compatible

## SEO Quick Check

```
✅ Title tags: "{Page Title} — xFalcon"
✅ Meta descriptions: Unique for each page
✅ Canonical URLs: /privacy-policy, /terms-and-conditions, /security-and-trust
✅ Sitemap: Generated automatically
✅ OG Tags: Configured for social sharing
✅ Robots.txt: Configured
✅ Mobile friendly: Responsive design
✅ Page speed: Optimized
```

## Emergency Contacts

- **Technical Issues**: DevOps team
- **Content Questions**: Legal team
- **Design Issues**: Design team
- **TinaCMS Support**: support@tina.io

---

**Bookmark this page!** Use as quick reference during updates.

**Last Updated**: June 2024
