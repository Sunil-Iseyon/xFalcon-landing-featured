import { defineConfig } from 'tinacms';

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'landing',
        label: 'Landing Page Content',
        path: 'src/content',
        format: 'json',
        match: {
          include: 'landing',
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'object',
            name: 'hero',
            label: 'Hero Section',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'heading', label: 'Heading', required: true },
              {
                type: 'string',
                name: 'rotatingWords',
                label: 'Rotating Words (for animated text)',
                list: true,
              },
              { type: 'string', name: 'subtitle', label: 'Subtitle', required: true, ui: { component: 'textarea' } },
              { type: 'string', name: 'ctaText', label: 'CTA Text', required: true },
              { type: 'string', name: 'ctaHref', label: 'CTA Link', required: true },
              
            ],
          },
          {
            type: 'object',
            name: 'whatIs',
            label: '"What is xFalcon?" Section',
            fields: [
              {
                type: 'string',
                name: 'text',
                label: 'Section Text',
                required: true,
                ui: { component: 'textarea' },
              },
            ],
          },
          {
            type: 'object',
            name: 'why',
            label: '"Why xFalcon?" Section',
            fields: [
              {
                type: 'object',
                name: 'points',
                label: 'Points',
                list: true,
                fields: [
                  { type: 'string', name: 'title', label: 'Title', required: true },
                  {
                    type: 'string',
                    name: 'description',
                    label: 'Description',
                    required: true,
                    ui: { component: 'textarea' },
                  },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'socialProof',
            label: 'Social Proof Section',
            fields: [
              { type: 'string', name: 'text', label: 'Text', required: true },
              {
                type: 'string',
                name: 'logos',
                label: 'Logos / Labels',
                list: true,
                required: true,
              },
            ],
          },
          {
            type: 'object',
            name: 'overview',
            label: 'Overview Section',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading', required: true },
              {
                type: 'string',
                name: 'content',
                label: 'Content',
                required: true,
                ui: { component: 'textarea' },
              },
              { type: 'image', name: 'imageSrc', label: 'Image' },
            ],
          },
          {
            type: 'object',
            name: 'features',
            label: 'Features Section',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading', required: true },
              {
                type: 'string',
                name: 'description',
                label: 'Description',
                required: true,
                ui: { component: 'textarea' },
              },
              { type: 'boolean', name: 'gridLayout', label: 'Use Grid Layout' },
              {
                type: 'object',
                name: 'items',
                label: 'Feature Items',
                list: true,
                fields: [
                  { type: 'string', name: 'title', label: 'Title', required: true },
                  {
                    type: 'string',
                    name: 'description',
                    label: 'Description',
                    required: true,
                    ui: { component: 'textarea' },
                  },
                  { type: 'string', name: 'icon', label: 'Icon', required: true },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'benefits',
            label: 'Benefits Section',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading', required: true },
              { type: 'string', name: 'subheading', label: 'Subheading', required: true },
              {
                type: 'object',
                name: 'items',
                label: 'Benefit Items',
                list: true,
                fields: [
                  { type: 'string', name: 'title', label: 'Title', required: true },
                  {
                    type: 'string',
                    name: 'description',
                    label: 'Description',
                    required: true,
                    ui: { component: 'textarea' },
                  },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'steps',
            label: 'Steps Section',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading', required: true },
              {
                type: 'object',
                name: 'items',
                label: 'Step Items',
                list: true,
                fields: [
                  { type: 'string', name: 'step', label: 'Step Number', required: true },
                  { type: 'string', name: 'title', label: 'Title', required: true },
                  {
                    type: 'string',
                    name: 'description',
                    label: 'Description',
                    required: true,
                    ui: { component: 'textarea' },
                  },
                  {
                    type: 'string',
                    name: 'icon',
                    label: 'Icon',
                    required: true,
                    options: ['user-plus', 'upload', 'settings', 'check-circle'],
                  },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'pricing',
            label: 'Pricing Section',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading', required: true },
              {
                type: 'object',
                name: 'items',
                label: 'Pricing Plans',
                list: true,
                fields: [
                  { type: 'string', name: 'name', label: 'Name', required: true },
                  { type: 'string', name: 'price', label: 'Price', required: true },
                  { type: 'string', name: 'period', label: 'Period', required: true },
                  {
                    type: 'string',
                    name: 'description',
                    label: 'Description',
                    required: true,
                    ui: { component: 'textarea' },
                  },
                  { type: 'boolean', name: 'popular', label: 'Popular' },
                  { type: 'string', name: 'ctaText', label: 'CTA Text', required: true },
                  { type: 'string', name: 'features', label: 'Features', list: true, required: true },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'testimonials',
            label: 'Testimonials Section',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading', required: true },
              {
                type: 'object',
                name: 'items',
                label: 'Testimonials',
                list: true,
                fields: [
                  { type: 'string', name: 'company', label: 'Company' },
                  { type: 'image', name: 'logo', label: 'Logo' },
                  { type: 'string', name: 'quote', label: 'Quote', required: true, ui: { component: 'textarea' } },
                  { type: 'string', name: 'author', label: 'Author', required: true },
                  { type: 'string', name: 'role', label: 'Role', required: true },
                  { type: 'image', name: 'avatar', label: 'Avatar' },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'demosSection',
            label: 'Demos Section',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow', required: true },
              { type: 'string', name: 'heading', label: 'Heading', required: true },
              {
                type: 'string',
                name: 'subheading',
                label: 'Subheading',
                required: true,
                ui: { component: 'textarea' },
              },
              {
                type: 'string',
                name: 'primaryButtonLabel',
                label: 'Primary Button Label',
                required: true,
              },
              {
                type: 'string',
                name: 'secondaryButtonLabel',
                label: 'Secondary Button Label',
                required: true,
              },
            ],
          },
          {
            type: 'object',
            name: 'faq',
            label: 'FAQ Section',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading', required: true },
              {
                type: 'object',
                name: 'items',
                label: 'Questions',
                list: true,
                fields: [
                  { type: 'string', name: 'question', label: 'Question', required: true },
                  {
                    type: 'string',
                    name: 'answer',
                    label: 'Answer',
                    required: true,
                    ui: { component: 'textarea' },
                  },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'cta',
            label: 'CTA Section',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading', required: true },
              {
                type: 'string',
                name: 'description',
                label: 'Description',
                required: true,
                ui: { component: 'textarea' },
              },
              {
                type: 'object',
                name: 'primaryCTA',
                label: 'Primary CTA',
                fields: [
                  { type: 'string', name: 'text', label: 'Text', required: true },
                  { type: 'string', name: 'href', label: 'Link', required: true },
                ],
              },
              {
                type: 'object',
                name: 'secondaryCTA',
                label: 'Secondary CTA',
                fields: [
                  { type: 'string', name: 'text', label: 'Text' },
                  { type: 'string', name: 'href', label: 'Link' },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'contactInfo',
            label: 'Contact Info',
            fields: [
              { type: 'string', name: 'email', label: 'Email', required: true },
              { type: 'string', name: 'whatsappDisplay', label: 'Phone Display', required: true },
              { type: 'string', name: 'whatsappLink', label: 'Phone Link (tel:...)', required: true },
              { type: 'string', name: 'twitterLink', label: 'Twitter Link', required: true },
              { type: 'string', name: 'instagramLink', label: 'Instagram Link', required: true },
            ],
          },
          {
            type: 'object',
            name: 'demoDetail',
            label: 'Demo Detail Page',
            fields: [
              { type: 'string', name: 'backLabel', label: 'Back Button Label', required: true },
              { type: 'string', name: 'visitLabel', label: 'Visit Button Label', required: true },
              { type: 'string', name: 'aboutHeading', label: 'About Section Heading', required: true },
              {
                type: 'string',
                name: 'aboutFallbackDescription',
                label: 'About Fallback Description',
                required: true,
                ui: { component: 'textarea' },
              },
              {
                type: 'string',
                name: 'previewFallbackLabel',
                label: 'Preview Fallback Label',
                required: true,
              },
              {
                type: 'string',
                name: 'contactHeading',
                label: 'Contact Card Heading',
                required: true,
              },
              {
                type: 'string',
                name: 'contactDescription',
                label: 'Contact Card Description',
                required: true,
                ui: { component: 'textarea' },
              },
              {
                type: 'string',
                name: 'contactButtonText',
                label: 'Contact Button Text',
                required: true,
              },
              {
                type: 'string',
                name: 'contactSubjectPrefix',
                label: 'Contact Subject Prefix',
                required: true,
              },
            ],
          },
          {
            type: 'object',
            name: 'footer',
            label: 'Footer Section',
            fields: [
              { type: 'image', name: 'logoSrc', label: 'Logo Image' },
              { type: 'string', name: 'logoAlt', label: 'Logo Alt Text' },
              { type: 'string', name: 'companyName', label: 'Company Name', required: true },
              {
                type: 'string',
                name: 'companyDescription',
                label: 'Company Description',
                required: true,
                ui: { component: 'textarea' },
              },
              // { type: 'string', name: 'tagline', label: 'Tagline', required: true },
              {
                type: 'object',
                name: 'sections',
                label: 'Footer Link Groups',
                list: true,
                fields: [
                  { type: 'string', name: 'title', label: 'Title', required: true },
                  {
                    type: 'object',
                    name: 'links',
                    label: 'Links',
                    list: true,
                    fields: [
                      { type: 'string', name: 'label', label: 'Label', required: true },
                      { type: 'string', name: 'href', label: 'Href', required: true },
                    ],
                  },
                ],
              },
              {
                type: 'object',
                name: 'socialLinks',
                label: 'Social Links',
                list: true,
                fields: [
                  { type: 'string', name: 'label', label: 'Label', required: true },
                  { type: 'string', name: 'href', label: 'Href', required: true },
                ],
              },
              { type: 'string', name: 'copyright', label: 'Copyright', required: true },
            ],
          },
        ],
      },
      {
        name: 'demos',
        label: 'Demo Cards',
        path: 'content/demos',
        format: 'md',
        fields: [
          { type: 'string', name: 'title', label: 'Title', required: true },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'path',
            label: 'Demo Path',
            required: true,
            description: 'Use a folder path like /demos/demo1/; it will resolve to index.html automatically.',
          },
          { type: 'image', name: 'thumbnail', label: 'Thumbnail' },
          { type: 'string', name: 'category', label: 'Category' },
          { type: 'boolean', name: 'featured', label: 'Featured' },
          { type: 'number', name: 'order', label: 'Order' },
        ],
      },
      {
        name: 'privacy_policy',
        label: 'Privacy Policy',
        path: 'src/content/legal',
        format: 'json',
        match: {
          include: 'privacy-policy',
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Page Title', required: true },
          { type: 'string', name: 'description', label: 'Meta Description', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'lastUpdated', label: 'Last Updated Date', required: true, description: 'Format: YYYY-MM-DD' },
          {
            type: 'object',
            name: 'sections',
            label: 'Page Sections',
            list: true,
            fields: [
              { type: 'string', name: 'id', label: 'Section ID', required: true, description: 'Used for anchors, e.g., "introduction"' },
              { type: 'string', name: 'title', label: 'Section Title', required: true },
              { type: 'string', name: 'content', label: 'Content', required: true, ui: { component: 'textarea' } },
              {
                type: 'object',
                name: 'subsections',
                label: 'Subsections (Optional)',
                list: true,
                fields: [
                  { type: 'string', name: 'title', label: 'Subsection Title', required: true },
                  { type: 'string', name: 'content', label: 'Content', required: true, ui: { component: 'textarea' } },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'contactSection',
            label: 'Contact Information',
            fields: [
              { type: 'string', name: 'title', label: 'Contact Section Title', required: true },
              { type: 'string', name: 'email', label: 'Email', required: true },
              { type: 'string', name: 'ContactNo', label: 'ContactNo', required: true },
              { type: 'string', name: 'address', label: 'Address', required: true, ui: { component: 'textarea' } },
            ],
          },
        ],
      },
      {
        name: 'terms_and_conditions',
        label: 'Terms & Conditions',
        path: 'src/content/legal',
        format: 'json',
        match: {
          include: 'terms-and-conditions',
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Page Title', required: true },
          { type: 'string', name: 'description', label: 'Meta Description', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'lastUpdated', label: 'Last Updated Date', required: true, description: 'Format: YYYY-MM-DD' },
          {
            type: 'object',
            name: 'sections',
            label: 'Page Sections',
            list: true,
            fields: [
              { type: 'string', name: 'id', label: 'Section ID', required: true, description: 'Used for anchors' },
              { type: 'string', name: 'title', label: 'Section Title', required: true },
              { type: 'string', name: 'content', label: 'Content', required: true, ui: { component: 'textarea' } },
              {
                type: 'object',
                name: 'subsections',
                label: 'Subsections (Optional)',
                list: true,
                fields: [
                  { type: 'string', name: 'title', label: 'Subsection Title', required: true },
                  { type: 'string', name: 'content', label: 'Content', required: true, ui: { component: 'textarea' } },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'contactSection',
            label: 'Contact Information',
            fields: [
              { type: 'string', name: 'title', label: 'Contact Section Title', required: true },
              { type: 'string', name: 'email', label: 'Email', required: true },
              { type: 'string', name: 'ContactNo', label: 'ContactNo', required: true },
              { type: 'string', name: 'address', label: 'Address', required: true, ui: { component: 'textarea' } },
            ],
          },
        ],
      },
      {
        name: 'security_and_trust',
        label: 'Security & Trust',
        path: 'src/content/legal',
        format: 'json',
        match: {
          include: 'security-and-trust',
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Page Title', required: true },
          { type: 'string', name: 'description', label: 'Meta Description', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'trustBanner', label: 'Trust Banner Text', required: true },
          { type: 'string', name: 'lastUpdated', label: 'Last Updated Date', required: true, description: 'Format: YYYY-MM-DD' },
          {
            type: 'object',
            name: 'sections',
            label: 'Page Sections',
            list: true,
            fields: [
              { type: 'string', name: 'id', label: 'Section ID', required: true, description: 'Used for anchors' },
              { type: 'string', name: 'title', label: 'Section Title', required: true },
              { type: 'string', name: 'content', label: 'Content', required: true, ui: { component: 'textarea' } },
              {
                type: 'object',
                name: 'subsections',
                label: 'Subsections (Optional)',
                list: true,
                fields: [
                  { type: 'string', name: 'title', label: 'Subsection Title', required: true },
                  { type: 'string', name: 'content', label: 'Content', required: true, ui: { component: 'textarea' } },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'complianceSection',
            label: 'Compliance & Certifications',
            fields: [
              { type: 'string', name: 'title', label: 'Section Title', required: true },
              { type: 'string', name: 'description', label: 'Description', required: true, ui: { component: 'textarea' } },
              {
                type: 'object',
                name: 'items',
                label: 'Certification Items',
                list: true,
                fields: [
                  { type: 'string', name: 'name', label: 'Certification Name', required: true },
                  { type: 'string', name: 'description', label: 'Description' },
                  { type: 'image', name: 'icon', label: 'Icon/Badge' },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'contactSection',
            label: 'Contact Information',
            fields: [
              { type: 'string', name: 'title', label: 'Contact Section Title', required: true },
              { type: 'string', name: 'email', label: 'Security Email', required: true },
              { type: 'string', name: 'ContactNo', label: 'ContactNo', required: true },

              { type: 'string', name: 'address', label: 'Address', required: true, ui: { component: 'textarea' } },
            ],
          },
        ],
      },
    ],
  },
});
