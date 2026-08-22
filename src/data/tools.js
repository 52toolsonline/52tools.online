// Single source of truth for every tool and category on 52 Tools.
// Used at BUILD time by src/pages/tools/[id].astro (to generate one real,
// dedicated page per tool) and at RUNTIME by the client-side search script.

export const TOOLS_DATA = [
  {
    id: 'html-viewer', name: 'HTML Viewer',
    description: 'View and edit HTML code in real-time.',
    category: 'Developer Tools',
    tags: ['developer', 'code', 'markup'],
    keywords: ['html', 'view', 'editor', 'render', 'preview'],
    aliases: ['html editor', 'code viewer']
  },
  {
    id: 'text-replace', name: 'Text Replace Editor',
    description: 'Find and replace text instantly.',
    category: 'Productivity',
    tags: ['text', 'editor', 'productivity'],
    keywords: ['find', 'replace', 'search and replace', 'text editor'],
    aliases: ['find and replace']
  },
  {
    id: 'currency-converter', name: 'Currency Converter',
    description: 'Convert currencies with live exchange rates.',
    category: 'Business & Finance',
    tags: ['finance', 'money', 'business'],
    keywords: ['currency', 'exchange rate', 'convert money', 'forex'],
    aliases: ['fx converter', 'money converter']
  },
  {
    id: 'invoice-generator', name: 'Invoice Generator',
    description: 'Create professional invoices in seconds.',
    category: 'Business & Finance',
    tags: ['finance', 'business', 'billing'],
    keywords: ['invoice', 'billing', 'receipt', 'quote'],
    aliases: ['bill maker']
  },
  {
    id: 'saved-places', name: 'Saved Places',
    description: 'Save and manage your favorite places.',
    category: 'Utility Tools',
    tags: ['utility', 'location', 'maps'],
    keywords: ['places', 'location', 'map', 'bookmark location'],
    aliases: ['location bookmarks']
  },
  {
    id: 'image-compressor', name: 'Image Compressor',
    description: 'Compress and resize images without loss.',
    category: 'Utility Tools',
    tags: ['utility', 'image', 'photo'],
    keywords: ['image', 'compress', 'resize', 'photo', 'picture', 'jpg', 'png', 'webp', 'shrink'],
    aliases: ['photo compressor', 'image resizer']
  },
  {
    id: 'pdf-to-jpg', name: 'PDF to JPG',
    description: 'Convert PDF pages into JPG images.',
    category: 'Utility Tools',
    tags: ['utility', 'pdf', 'convert'],
    keywords: ['pdf', 'jpg', 'convert', 'export images'],
    aliases: ['pdf converter']
  },
  {
    id: 'json-formatter', name: 'JSON Formatter',
    description: 'Format and validate JSON instantly.',
    category: 'Developer Tools',
    tags: ['developer', 'code', 'data'],
    keywords: ['json', 'format', 'validate', 'pretty print'],
    aliases: ['json beautifier']
  },
  {
    id: 'css-formatter', name: 'CSS Formatter',
    description: 'Clean up and beautify messy CSS code.',
    category: 'Developer Tools',
    tags: ['developer', 'code', 'css'],
    keywords: ['css', 'format', 'beautify', 'minify'],
    aliases: ['css beautifier']
  },
  {
    id: 'qr-code-generator', name: 'QR Code Generator',
    description: 'Create custom QR codes in seconds.',
    category: 'Utility Tools',
    tags: ['utility', 'code', 'generator'],
    keywords: ['qr', 'code', 'generator', 'scan'],
    aliases: ['qr maker']
  },
  {
    id: 'color-picker', name: 'Color Picker',
    description: 'Pick and copy colors in any format.',
    category: 'Developer Tools',
    tags: ['developer', 'design', 'color'],
    keywords: ['color', 'picker', 'hex', 'rgb', 'palette'],
    aliases: ['colour picker']
  },
  {
    id: 'unit-converter', name: 'Unit Converter',
    description: 'Convert between units of measurement.',
    category: 'Utility Tools',
    tags: ['utility', 'convert', 'measurement'],
    keywords: ['unit', 'converter', 'metric', 'imperial'],
    aliases: ['measurement converter']
  }
];

export const CATEGORIES_DATA = [
  { id: 'developer-tools',  name: 'Developer Tools',       count: 12 },
  { id: 'business-finance', name: 'Business &amp; Finance', count: 10 },
  { id: 'utility-tools',    name: 'Utility Tools',         count: 15 },
  { id: 'productivity',     name: 'Productivity',          count: 9  },
  { id: 'health-wellness',  name: 'Health &amp; Wellness',  count: 6  },
  { id: 'all-tools',        name: 'All Tools',             count: 52 }
];

// Every tool's real, dedicated route -- generated consistently everywhere
// it's needed (cards, search results, sitemap) from the same id.
export function toolUrl(id) {
  return `/tools/${id}`;
}
