import {
  BadgeCheck,
  Box,
  BriefcaseBusiness,
  Brush,
  CalendarClock,
  ChartNoAxesColumnIncreasing,
  CheckCircle2,
  CloudUpload,
  Code2,
  Crown,
  Gauge,
  Globe2,
  Headphones,
  Layers3,
  Lightbulb,
  LockKeyhole,
  MonitorSmartphone,
  PackageCheck,
  Palette,
  RefreshCw,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  Timer,
  type LucideIcon,
} from "lucide-react";

import { servicesSection } from "@/config/site";

export type PublishStatus = "draft" | "published";
export type ServiceAccent =
  | "violet"
  | "blue"
  | "mint"
  | "orange"
  | "pink"
  | "purple"
  | "sky"
  | "indigo"
  | "featured";

export type ServiceStat = {
  value: string;
  label: string;
};

export type ServiceInfoCard = {
  title: string;
  description: string;
  icon: string;
  accent?: ServiceAccent;
};

export type ServiceReason = {
  title: string;
  description: string;
  icon: string;
};

export type ServiceTechnology = {
  label: string;
  imageUrl: string;
};

export type ServicePricingPackage = {
  name: string;
  description: string;
  price: string;
  note: string;
  timeline: string;
  action: string;
  icon: string;
  accent: ServiceAccent;
  popular: boolean;
  features: string[];
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  cardDescription: string;
  heroSummary: string;
  heroDescription: string;
  heroImageUrl?: string | null;
  icon: string;
  accent: ServiceAccent;
  offersTitle: string;
  offersDescription: string;
  reasonsTitle: string;
  reasonsDescription: string;
  processTitle: string;
  processDescription: string;
  technologyTitle: string;
  technologyDescription: string;
  pricingTitle: string;
  pricingDescription: string;
  faqTitle: string;
  ctaTitle: string;
  ctaDescription: string;
  stats: ServiceStat[];
  offers: ServiceInfoCard[];
  reasons: ServiceReason[];
  processSteps: ServiceInfoCard[];
  technologies: ServiceTechnology[];
  pricingPackages: ServicePricingPackage[];
  faqs: ServiceFaq[];
  sortOrder: number;
  status: PublishStatus;
  createdAt: string;
};

export const SERVICE_ICON_OPTIONS = [
  "code",
  "smartphone",
  "cloud",
  "chart",
  "layers",
  "shield",
  "palette",
  "rocket",
  "monitor",
  "badge",
  "sparkles",
  "headphones",
  "lightbulb",
  "brush",
  "search",
  "timer",
  "lock",
  "target",
  "package",
  "refresh",
  "cart",
  "send",
  "briefcase",
  "box",
  "calendar",
  "gauge",
  "globe",
  "crown",
  "check",
] as const;

export const SERVICE_ACCENT_OPTIONS: ServiceAccent[] = [
  "violet",
  "blue",
  "mint",
  "orange",
  "pink",
  "purple",
  "sky",
  "indigo",
  "featured",
];

export const serviceIconMap: Record<string, LucideIcon> = {
  badge: BadgeCheck,
  box: Box,
  briefcase: BriefcaseBusiness,
  brush: Brush,
  calendar: CalendarClock,
  chart: ChartNoAxesColumnIncreasing,
  check: CheckCircle2,
  cloud: CloudUpload,
  code: Code2,
  crown: Crown,
  gauge: Gauge,
  globe: Globe2,
  headphones: Headphones,
  layers: Layers3,
  lightbulb: Lightbulb,
  lock: LockKeyhole,
  monitor: MonitorSmartphone,
  package: PackageCheck,
  palette: Palette,
  refresh: RefreshCw,
  rocket: Rocket,
  search: Search,
  send: Send,
  shield: ShieldCheck,
  cart: ShoppingCart,
  smartphone: Smartphone,
  sparkles: Sparkles,
  target: Target,
  timer: Timer,
};

export const serviceCardAccentMap: Record<
  Exclude<ServiceAccent, "featured">,
  string
> = {
  violet:
    "bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]",
  blue: "bg-[linear-gradient(180deg,rgba(93,174,255,0.18),rgba(93,174,255,0.08))] text-[color:var(--blue)]",
  mint: "bg-[linear-gradient(180deg,rgba(111,231,200,0.2),rgba(111,231,200,0.08))] text-[color:var(--mint)]",
  orange:
    "bg-[linear-gradient(180deg,rgba(255,159,90,0.18),rgba(255,159,90,0.08))] text-[color:var(--orange)]",
  pink: "bg-[linear-gradient(180deg,rgba(244,114,182,0.18),rgba(244,114,182,0.08))] text-[#ec4899]",
  purple:
    "bg-[linear-gradient(180deg,rgba(167,139,250,0.18),rgba(167,139,250,0.08))] text-[color:var(--primary-soft)]",
  sky: "bg-[linear-gradient(180deg,rgba(159,220,255,0.2),rgba(159,220,255,0.08))] text-[color:var(--sky)]",
  indigo:
    "bg-[linear-gradient(180deg,rgba(99,102,241,0.18),rgba(99,102,241,0.08))] text-[#6366f1]",
};

export const getServiceIcon = (icon: string) => serviceIconMap[icon] ?? Code2;

export const blogTopicOptions = servicesSection.items.map((service) => ({
  label: service.title,
  value: service.title,
  icon: service.icon,
}));

const topicAliases: Record<string, string[]> = {
  "Website Development": ["Web Development"],
  "Mobile App Development": ["Mobile Development", "Mobile Apps"],
  "Hosting & Cloud": ["Hosting", "Hosting & DevOps"],
  "Deployment & DevOps": ["DevOps", "Hosting & DevOps"],
  "Cross Platform Development": [
    "Cross Platform",
    "Cross-Platform Development",
  ],
  "Maintenance & Support": ["Maintenance", "Support"],
  "UI/UX Design": ["UI UX Design", "UI/UX"],
  "SEO & Marketing": ["SEO", "Digital Marketing"],
};

const normalizeTopicValue = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");

export const getTopicSearchTerms = (topic: string) => [
  topic,
  ...(topicAliases[topic] ?? []),
];

export const topicMatchesValue = (topic: string, value?: string | null) => {
  if (!topic || !value) {
    return false;
  }

  const normalizedValue = normalizeTopicValue(value);

  return getTopicSearchTerms(topic).some(
    (term) => normalizeTopicValue(term) === normalizedValue,
  );
};

export const getBlogTopicSearchText = (
  category?: string | null,
  tags: string[] = [],
) => {
  const matchingTopic = blogTopicOptions.find(
    (topic) =>
      topicMatchesValue(topic.value, category) ||
      tags.some((tag) => topicMatchesValue(topic.value, tag)),
  );

  return [
    category,
    ...(category && matchingTopic
      ? getTopicSearchTerms(matchingTopic.value)
      : []),
    ...tags,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");
};

export const getServiceAccentClass = (accent?: ServiceAccent) =>
  serviceCardAccentMap[
    (accent && accent !== "featured" ? accent : "violet") as Exclude<
      ServiceAccent,
      "featured"
    >
  ];

export const splitServiceTitle = (title: string) => {
  const words = title.trim().split(/\s+/);

  if (words.length <= 1) {
    return { plain: title, highlight: "" };
  }

  return {
    plain: words.slice(0, -1).join(" "),
    highlight: words.at(-1) ?? "",
  };
};
