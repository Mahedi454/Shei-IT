import {
  Code2,
  CreditCard,
  Headphones,
  Rocket,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";

export const faqCategories = [
  {
    id: "projects",
    label: "Projects",
    description: "Scope, timelines, delivery, and how we work.",
    icon: Rocket,
  },
  {
    id: "services",
    label: "Services",
    description: "Websites, apps, UI/UX, SEO, hosting, and support.",
    icon: Code2,
  },
  {
    id: "pricing",
    label: "Pricing",
    description: "Plans, payments, upgrades, and custom quotes.",
    icon: CreditCard,
  },
  {
    id: "seo",
    label: "SEO & Growth",
    description: "Search visibility, analytics, content, and performance.",
    icon: SearchCheck,
  },
  {
    id: "security",
    label: "Security",
    description: "Backups, access, maintenance, and safe deployment.",
    icon: ShieldCheck,
  },
  {
    id: "support",
    label: "Support",
    description: "Communication, revisions, training, and long-term help.",
    icon: Headphones,
  },
] as const;

export type FaqCategoryId = (typeof faqCategories)[number]["id"];

export const faqItems = [
  {
    category: "projects",
    question: "How do we start a project with Shei IT?",
    answer:
      "We begin with a short discovery conversation to understand your goal, business, audience, required features, timeline, and budget. After that, we prepare a clear scope, recommended solution, timeline, and project estimate before any build work starts.",
  },
  {
    category: "projects",
    question: "How long does a website or app project take?",
    answer:
      "A small business website usually takes 1 to 2 weeks after content and requirements are ready. Larger websites, dashboards, custom web apps, and mobile apps can take 3 to 8 weeks or more depending on features, integrations, approvals, and revisions.",
  },
  {
    category: "projects",
    question: "Do you help if I only have an idea, not a full plan?",
    answer:
      "Yes. You can come with a rough idea, sample website, document, or voice note. We help turn that into a practical feature list, page structure, content direction, and launch plan so the project becomes clear before development begins.",
  },
  {
    category: "services",
    question: "What services does Shei IT provide?",
    answer:
      "We provide website development, mobile app development, UI/UX design, SEO and digital marketing, hosting and cloud setup, deployment and DevOps, cross-platform development, and ongoing maintenance support for businesses and startups.",
  },
  {
    category: "services",
    question: "Can you redesign an existing website?",
    answer:
      "Yes. We can redesign your current website while improving speed, layout, responsiveness, SEO structure, conversion flow, and content presentation. We can also keep your existing brand style if you want the update to feel familiar.",
  },
  {
    category: "services",
    question: "Do you build custom dashboards or admin panels?",
    answer:
      "Yes. We build custom dashboards, admin panels, booking systems, content managers, analytics views, and internal business tools. We focus on clean workflows, secure access, useful data, and simple day-to-day management.",
  },
  {
    category: "pricing",
    question: "How much does a project cost?",
    answer:
      "Pricing depends on scope, pages, features, integrations, content needs, design complexity, and support level. We offer fixed packages for common website needs and custom quotes for larger systems, apps, dashboards, or advanced integrations.",
  },
  {
    category: "pricing",
    question: "Do you require an advance payment?",
    answer:
      "Most projects start with an advance payment so we can reserve time, plan the work, and begin production. The payment structure is shared before the project starts and can be milestone-based for larger scopes.",
  },
  {
    category: "pricing",
    question: "Can I upgrade my plan later?",
    answer:
      "Yes. You can add more pages, features, integrations, SEO work, hosting support, or maintenance later. We review the new requirements and adjust the timeline and cost based on the added scope.",
  },
  {
    category: "seo",
    question: "Will my website be SEO-friendly?",
    answer:
      "Yes. We build websites with responsive structure, clean headings, metadata, fast-loading pages, image optimization, crawl-friendly URLs, and basic technical SEO. For stronger growth, we can also provide ongoing SEO and content support.",
  },
  {
    category: "seo",
    question: "Do you set up analytics and tracking?",
    answer:
      "Yes. We can set up Google Analytics, Search Console, Meta Pixel, conversion events, and other tracking tools based on your marketing needs. We also help you understand the important metrics after launch.",
  },
  {
    category: "seo",
    question: "Can you help with website content?",
    answer:
      "Yes. We can help structure page content, improve clarity, write SEO-friendly sections, prepare service descriptions, and make calls to action stronger so users understand your offer and know what to do next.",
  },
  {
    category: "security",
    question: "Will my website be secure?",
    answer:
      "We follow practical security standards such as safe deployment, SSL setup, protected admin access, dependency updates, form validation, and secure configuration. For ongoing protection, we recommend a maintenance plan with regular checks.",
  },
  {
    category: "security",
    question: "Do you provide backups and maintenance?",
    answer:
      "Yes. We can provide backup setup, uptime monitoring, software updates, bug fixes, performance improvements, content updates, and security reviews. Maintenance can be monthly or arranged when needed.",
  },
  {
    category: "security",
    question: "Who owns the final website or app?",
    answer:
      "After agreed payments are completed, the final deliverables belong to you. We can also hand over hosting, domains, admin access, source files, and documentation depending on the project agreement.",
  },
  {
    category: "support",
    question: "What happens after launch?",
    answer:
      "After launch, we check the live site or app, fix launch-related issues, help with handover, and guide you through the important parts of managing it. You can also continue with maintenance and improvement support.",
  },
  {
    category: "support",
    question: "How do revisions work?",
    answer:
      "Revisions are handled based on the project scope. We collect feedback, organize changes, and update the design or build in a controlled way. Larger changes outside the original scope are estimated separately before work continues.",
  },
  {
    category: "support",
    question: "How can I contact your team?",
    answer:
      "You can contact Shei IT through the website contact page, email, or phone. For active projects, we keep communication clear with shared updates, milestones, and direct discussion around decisions or blockers.",
  },
] as const satisfies ReadonlyArray<{
  category: FaqCategoryId;
  question: string;
  answer: string;
}>;
