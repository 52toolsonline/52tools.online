export interface Tool {
  slug: string;
  name: string;
  category: string;
  description: string;
  /** Optional short feature bullets shown on tool cards/listings. */
  features?: string[];
  keywords: string[];
  icon: string;
  /**
   * Canonical URL of the actual tool, hosted on its own separate domain
   * and deployment. Omit if the tool has not been built/deployed yet —
   * the directory will show it as "Coming soon" instead of linking out.
   *
   * IMPORTANT: replace these placeholder subdomains with the real
   * deployed URL for each tool as it goes live.
   */
  url?: string;
}

export const tools: Tool[] = [
  // ---------- Text ----------
  {
    slug: "text-replacer",
    name: "Text Replacer",
    category: "text",
    description: "Find and replace text with case-sensitive and whole-word matching.",
    features: ["Case-sensitive matching", "Whole-word matching", "Regex support"],
    keywords: ["find", "replace", "substitute", "text", "search and replace"],
    icon: "Replace",
    url: "https://text-replacer.52tools.online",
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    category: "text",
    description: "Count words, characters, lines, sentences, and paragraphs.",
    features: ["Live word & character counts", "Sentence and paragraph stats"],
    keywords: ["words", "characters", "count", "length", "reading time"],
    icon: "AlignLeft",
    url: "https://word-counter.52tools.online",
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    category: "text",
    description: "Convert text between uppercase, lowercase, title case, camelCase, and more.",
    features: ["8 case formats", "One-click copy"],
    keywords: ["uppercase", "lowercase", "camelcase", "snake_case", "kebab-case", "title case"],
    icon: "CaseSensitive",
    url: "https://case-converter.52tools.online",
  },
  {
    slug: "character-counter",
    name: "Character Counter",
    category: "text",
    description: "Count characters with and without spaces.",
    keywords: ["character", "count", "length"],
    icon: "Hash",
  },
  {
    slug: "text-sorter",
    name: "Text Sorter",
    category: "text",
    description: "Sort lines alphabetically, numerically, or by length.",
    keywords: ["sort", "order", "lines", "alphabetize"],
    icon: "ArrowDownAZ",
  },
  {
    slug: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    category: "text",
    description: "Strip duplicate lines from a block of text.",
    keywords: ["duplicate", "unique", "dedupe", "lines"],
    icon: "ListX",
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    category: "text",
    description: "Generate placeholder text for mockups and layouts.",
    keywords: ["lorem", "ipsum", "placeholder", "dummy text"],
    icon: "FileText",
  },

  // ---------- Developer ----------
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    category: "developer",
    description: "Format, minify, and validate JSON with clear error messages.",
    features: ["Format & minify", "Validation with error location"],
    keywords: ["json", "formatter", "beautify", "validate", "minify"],
    icon: "Braces",
    url: "https://json-formatter.52tools.online",
  },
  {
    slug: "html-viewer",
    name: "HTML Viewer",
    category: "developer",
    description: "Edit HTML and preview the rendered output side by side.",
    features: ["Split-view live preview", "Download as .html"],
    keywords: ["html", "preview", "renderer", "viewer", "editor"],
    icon: "Code2",
    url: "https://html-viewer.52tools.online",
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    category: "developer",
    description: "Generate one or many RFC 4122 v4 UUIDs.",
    features: ["Bulk generation", "Uppercase / no-dash options"],
    keywords: ["uuid", "guid", "unique id", "generator"],
    icon: "Fingerprint",
    url: "https://uuid-generator.52tools.online",
  },
  {
    slug: "json-validator",
    name: "JSON Validator",
    category: "developer",
    description: "Validate JSON syntax and locate errors precisely.",
    keywords: ["json", "validate", "lint", "syntax check"],
    icon: "CheckCircle2",
  },
  {
    slug: "css-formatter",
    name: "CSS Formatter",
    category: "developer",
    description: "Beautify and organize CSS code.",
    keywords: ["css", "formatter", "beautify", "style sheet"],
    icon: "Paintbrush",
  },
  {
    slug: "javascript-formatter",
    name: "JavaScript Formatter",
    category: "developer",
    description: "Format and clean up JavaScript source code.",
    keywords: ["javascript", "js", "formatter", "beautify", "prettify"],
    icon: "FileCode",
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    category: "developer",
    description: "Test regular expressions against sample text with live matches.",
    keywords: ["regex", "regexp", "pattern", "match", "test"],
    icon: "Regex",
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    category: "developer",
    description: "Decode JSON Web Tokens and inspect header and payload.",
    keywords: ["jwt", "token", "decode", "auth"],
    icon: "KeySquare",
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder/Decoder",
    category: "developer",
    description: "Encode text to Base64 or decode Base64 back to text.",
    keywords: ["base64", "encode", "decode", "binary"],
    icon: "Binary",
  },

  // ---------- Image ----------
  {
    slug: "image-compressor",
    name: "Image Compressor",
    category: "image",
    description: "Reduce image file size while preserving visual quality.",
    keywords: ["image", "compress", "optimize", "size"],
    icon: "ImageDown",
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    category: "image",
    description: "Resize images to exact dimensions or a percentage scale.",
    keywords: ["image", "resize", "dimensions", "scale"],
    icon: "Maximize",
  },
  {
    slug: "image-converter",
    name: "Image Converter",
    category: "image",
    description: "Convert images between PNG, JPG, and WebP.",
    keywords: ["image", "convert", "png", "jpg", "webp", "format"],
    icon: "RefreshCcw",
  },
  {
    slug: "image-cropper",
    name: "Image Cropper",
    category: "image",
    description: "Crop images to a custom or fixed aspect ratio.",
    keywords: ["image", "crop", "aspect ratio", "trim"],
    icon: "Crop",
  },
  {
    slug: "color-picker",
    name: "Color Picker",
    category: "image",
    description: "Pick colors and convert between HEX, RGB, and HSL.",
    keywords: ["color", "picker", "hex", "rgb", "hsl", "convert"],
    icon: "Pipette",
  },

  // ---------- PDF ----------
  {
    slug: "pdf-merger",
    name: "PDF Merger",
    category: "pdf",
    description: "Combine multiple PDF files into a single document.",
    keywords: ["pdf", "merge", "combine", "join"],
    icon: "FileStack",
  },
  {
    slug: "pdf-splitter",
    name: "PDF Splitter",
    category: "pdf",
    description: "Split a PDF into individual pages or ranges.",
    keywords: ["pdf", "split", "extract pages"],
    icon: "Scissors",
  },
  {
    slug: "pdf-compressor",
    name: "PDF Compressor",
    category: "pdf",
    description: "Reduce PDF file size for easier sharing.",
    keywords: ["pdf", "compress", "reduce size"],
    icon: "FileDown",
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    category: "pdf",
    description: "Convert one or more images into a single PDF.",
    keywords: ["image", "pdf", "convert"],
    icon: "FileImage",
  },

  // ---------- Date & Time ----------
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    category: "date-time",
    description: "Convert between Unix timestamps and human-readable dates.",
    keywords: ["timestamp", "unix", "epoch", "date", "convert"],
    icon: "Clock",
  },
  {
    slug: "date-calculator",
    name: "Date Calculator",
    category: "date-time",
    description: "Calculate the difference between two dates.",
    keywords: ["date", "calculator", "difference", "days between"],
    icon: "CalendarRange",
  },
  {
    slug: "timezone-converter",
    name: "Time Zone Converter",
    category: "date-time",
    description: "Convert a time between different time zones.",
    keywords: ["timezone", "time zone", "convert", "utc"],
    icon: "Globe2",
  },

  // ---------- Numbers & Math ----------
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "numbers",
    description: "Calculate percentages, increases, and decreases.",
    keywords: ["percentage", "percent", "calculator"],
    icon: "Percent",
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    category: "numbers",
    description: "Convert between length, weight, and volume units.",
    keywords: ["unit", "convert", "metric", "imperial"],
    icon: "Ruler",
  },
  {
    slug: "random-number-generator",
    name: "Random Number Generator",
    category: "numbers",
    description: "Generate random numbers within a custom range.",
    keywords: ["random", "number", "generator"],
    icon: "Dices",
  },

  // ---------- Security ----------
  {
    slug: "password-generator",
    name: "Password Generator",
    category: "security",
    description: "Generate strong, random passwords with custom rules.",
    keywords: ["password", "generator", "random", "secure"],
    icon: "KeyRound",
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    category: "security",
    description: "Generate MD5, SHA-1, and SHA-256 hashes from text.",
    keywords: ["hash", "md5", "sha1", "sha256", "checksum"],
    icon: "Lock",
  },
  {
    slug: "url-encoder",
    name: "URL Encoder/Decoder",
    category: "security",
    description: "Encode or decode URL components safely.",
    keywords: ["url", "encode", "decode", "uri"],
    icon: "Link2",
  },

  // ---------- Web ----------
  {
    slug: "url-parser",
    name: "URL Parser",
    category: "web",
    description: "Break a URL down into its component parts.",
    keywords: ["url", "parser", "parts", "query string"],
    icon: "Link",
  },
  {
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    category: "web",
    description: "Generate SEO and social meta tags for a web page.",
    keywords: ["meta", "seo", "tags", "generator"],
    icon: "Tags",
  },
];

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter((t) => t.category === categorySlug);
}

/** Tools that are actually deployed and can be linked to today. */
export function getAvailableTools(): Tool[] {
  return tools.filter((t) => Boolean(t.url));
}
