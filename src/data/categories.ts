export interface Category {
  slug: string;
  name: string;
  description: string;
  /** lucide-astro icon name, resolved dynamically where rendered */
  icon: string;
}

export const categories: Category[] = [
  {
    slug: "text",
    name: "Text",
    description: "Manipulate, clean, and transform plain text.",
    icon: "Type",
  },
  {
    slug: "developer",
    name: "Developer",
    description: "Formatters, validators, and encoders for everyday development.",
    icon: "Code2",
  },
  {
    slug: "image",
    name: "Image",
    description: "Compress, resize, convert, and inspect images.",
    icon: "Image",
  },
  {
    slug: "pdf",
    name: "PDF",
    description: "Merge, split, compress, and convert PDF files.",
    icon: "FileText",
  },
  {
    slug: "date-time",
    name: "Date & Time",
    description: "Convert timestamps, calculate durations, and compare time zones.",
    icon: "Clock",
  },
  {
    slug: "numbers",
    name: "Numbers & Math",
    description: "Calculators and converters for everyday math.",
    icon: "Calculator",
  },
  {
    slug: "security",
    name: "Security",
    description: "Generate passwords, hashes, and check encoded strings.",
    icon: "ShieldCheck",
  },
  {
    slug: "web",
    name: "Web",
    description: "Utilities for URLs, metadata, and web content.",
    icon: "Globe",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
