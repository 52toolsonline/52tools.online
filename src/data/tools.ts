export type ToolStatus = "live" | "soon";

export interface Tool {
  slug: string;
  name: string;
  category: string;
  description: string;
  keywords: string[];
  icon: string;
  status: ToolStatus;
}

export const tools: Tool[] = [
  // ---------- Text ----------
  {
    slug: "text-replacer",
    name: "Text Replacer",
    category: "text",
    description: "Find and replace text with case-sensitive and whole-word matching.",
    keywords: ["find", "replace", "substitute", "text", "search and replace"],
    icon: "Replace",
    status: "live",
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    category: "text",
    description: "Count words, characters, lines, sentences, and paragraphs.",
    keywords: ["words", "characters", "count", "length", "reading time"],
    icon: "AlignLeft",
    status: "live",
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    category: "text",
    description: "Convert text between uppercase, lowercase, title case, camelCase, and more.",
    keywords: ["uppercase", "lowercase", "camelcase", "snake_case", "kebab-case", "title case"],
    icon: "CaseSensitive",
    status: "live",
  },
  {
    slug: "character-counter",
    name: "Character Counter",
    category: "text",
    description: "Count characters with and without spaces.",
    keywords: ["character", "count", "length"],
    icon: "Hash",
    status: "soon",
  },
  {
    slug: "text-sorter",
    name: "Text Sorter",
    category: "text",
    description: "Sort lines alphabetically, numerically, or by length.",
    keywords: ["sort", "order", "lines", "alphabetize"],
    icon: "ArrowDownAZ",
    status: "soon",
  },
  {
    slug: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    category: "text",
    description: "Strip duplicate lines from a block of text.",
    keywords: ["duplicate", "unique", "dedupe", "lines"],
    icon: "ListX",
    status: "soon",
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    category: "text",
    description: "Generate placeholder text for mockups and layouts.",
    keywords: ["lorem", "ipsum", "placeholder", "dummy text"],
    icon: "FileText",
    status: "soon",
  },

  // ---------- Developer ----------
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    category: "developer",
    description: "Format, minify, and validate JSON with clear error messages.",
    keywords: ["json", "formatter", "beautify", "validate", "minify"],
    icon: "Braces",
    status: "live",
  },
  {
    slug: "html-viewer",
    name: "HTML Viewer",
    category: "developer",
    description: "Edit HTML and preview the rendered output side by side.",
    keywords: ["html", "preview", "renderer", "viewer", "editor"],
    icon: "Code2",
    status: "live",
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    category: "developer",
    description: "Generate one or many RFC 4122 v4 UUIDs.",
    keywords: ["uuid", "guid", "unique id", "generator"],
    icon: "Fingerprint",
    status: "live",
  },
  {
    slug: "json-validator",
    name: "JSON Validator",
    category: "developer",
    description: "Validate JSON syntax and locate errors precisely.",
    keywords: ["json", "validate", "lint", "syntax check"],
    icon: "CheckCircle2",
    status: "soon",
  },
  {
    slug: "css-formatter",
    name: "CSS Formatter",
    category: "developer",
    description: "Beautify and organize CSS code.",
    keywords: ["css", "formatter", "beautify", "style sheet"],
    icon: "Paintbrush",
    status: "soon",
  },
  {
    slug: "javascript-formatter",
    name: "JavaScript Formatter",
    category: "developer",
    description: "Format and clean up JavaScript source code.",
    keywords: ["javascript", "js", "formatter", "beautify", "prettify"],
    icon: "FileCode",
    status: "soon",
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    category: "developer",
    description: "Test regular expressions against sample text with live matches.",
    keywords: ["regex", "regexp", "pattern", "match", "test"],
    icon: "Regex",
    status: "soon",
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    category: "developer",
    description: "Decode JSON Web Tokens and inspect header and payload.",
    keywords: ["jwt", "token", "decode", "auth"],
    icon: "KeySquare",
    status: "soon",
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder/Decoder",
    category: "developer",
    description: "Encode text to Base64 or decode Base64 back to text.",
    keywords: ["base64", "encode", "decode", "binary"],
    icon: "Binary",
    status: "soon",
  },

  // ---------- Image ----------
  {
    slug: "image-compressor",
    name: "Image Compressor",
    category: "image",
    description: "Reduce image file size while preserving visual quality.",
    keywords: ["image", "compress", "optimize", "size"],
    icon: "ImageDown",
    status: "soon",
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    category: "image",
    description: "Resize images to exact dimensions or a percentage scale.",
    keywords: ["image", "resize", "dimensions", "scale"],
    icon: "Maximize",
    status: "soon",
  },
  {
    slug: "image-converter",
    name: "Image Converter",
    category: "image",
    description: "Convert images between PNG, JPG, and WebP.",
    keywords: ["image", "convert", "png", "jpg", "webp", "format"],
    icon: "RefreshCcw",
    status: "soon",
  },
  {
    slug: "image-cropper",
    name: "Image Cropper",
    category: "image",
    description: "Crop images to a custom or fixed aspect ratio.",
    keywords: ["image", "crop", "aspect ratio", "trim"],
    icon: "Crop",
    status: "soon",
  },
  {
    slug: "color-picker",
    name: "Color Picker",
    category: "image",
    description: "Pick colors and convert between HEX, RGB, and HSL.",
    keywords: ["color", "picker", "hex", "rgb", "hsl", "convert"],
    icon: "Pipette",
    status: "soon",
  },

  // ---------- PDF ----------
  {
    slug: "pdf-merger",
    name: "PDF Merger",
    category: "pdf",
    description: "Combine multiple PDF files into a single document.",
    keywords: ["pdf", "merge", "combine", "join"],
    icon: "FileStack",
    status: "soon",
  },
  {
    slug: "pdf-splitter",
    name: "PDF Splitter",
    category: "pdf",
    description: "Split a PDF into individual pages or ranges.",
    keywords: ["pdf", "split", "extract pages"],
    icon: "Scissors",
    status: "soon",
  },
  {
    slug: "pdf-compressor",
    name: "PDF Compressor",
    category: "pdf",
    description: "Reduce PDF file size for easier sharing.",
    keywords: ["pdf", "compress", "reduce size"],
    icon: "FileDown",
    status: "soon",
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    category: "pdf",
    description: "Convert one or more images into a single PDF.",
    keywords: ["image", "pdf", "convert"],
    icon: "FileImage",
    status: "soon",
  },

  // ---------- Date & Time ----------
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    category: "date-time",
    description: "Convert between Unix timestamps and human-readable dates.",
    keywords: ["timestamp", "unix", "epoch", "date", "convert"],
    icon: "Clock",
    status: "soon",
  },
  {
    slug: "date-calculator",
    name: "Date Calculator",
    category: "date-time",
    description: "Calculate the difference between two dates.",
    keywords: ["date", "calculator", "difference", "days between"],
    icon: "CalendarRange",
    status: "soon",
  },
  {
    slug: "timezone-converter",
    name: "Time Zone Converter",
    category: "date-time",
    description: "Convert a time between different time zones.",
    keywords: ["timezone", "time zone", "convert", "utc"],
    icon: "Globe2",
    status: "soon",
  },

  // ---------- Numbers & Math ----------
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "numbers",
    description: "Calculate percentages, increases, and decreases.",
    keywords: ["percentage", "percent", "calculator"],
    icon: "Percent",
    status: "soon",
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    category: "numbers",
    description: "Convert between length, weight, and volume units.",
    keywords: ["unit", "convert", "metric", "imperial"],
    icon: "Ruler",
    status: "soon",
  },
  {
    slug: "random-number-generator",
    name: "Random Number Generator",
    category: "numbers",
    description: "Generate random numbers within a custom range.",
    keywords: ["random", "number", "generator"],
    icon: "Dices",
    status: "soon",
  },

  // ---------- Security ----------
  {
    slug: "password-generator",
    name: "Password Generator",
    category: "security",
    description: "Generate strong, random passwords with custom rules.",
    keywords: ["password", "generator", "random", "secure"],
    icon: "KeyRound",
    status: "soon",
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    category: "security",
    description: "Generate MD5, SHA-1, and SHA-256 hashes from text.",
    keywords: ["hash", "md5", "sha1", "sha256", "checksum"],
    icon: "Lock",
    status: "soon",
  },
  {
    slug: "url-encoder",
    name: "URL Encoder/Decoder",
    category: "security",
    description: "Encode or decode URL components safely.",
    keywords: ["url", "encode", "decode", "uri"],
    icon: "Link2",
    status: "soon",
  },

  // ---------- Web ----------
  {
    slug: "url-parser",
    name: "URL Parser",
    category: "web",
    description: "Break a URL down into its component parts.",
    keywords: ["url", "parser", "parts", "query string"],
    icon: "Link",
    status: "soon",
  },
  {
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    category: "web",
    description: "Generate SEO and social meta tags for a web page.",
    keywords: ["meta", "seo", "tags", "generator"],
    icon: "Tags",
    status: "soon",
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter((t) => t.category === categorySlug);
}

export function getLiveTools(): Tool[] {
  return tools.filter((t) => t.status === "live");
}

export function getRelatedTools(tool: Tool, limit = 4): Tool[] {
  return tools
    .filter((t) => t.slug !== tool.slug && t.category === tool.category)
    .slice(0, limit);
}
