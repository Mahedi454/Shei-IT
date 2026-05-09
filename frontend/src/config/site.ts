export const siteConfig = {
  name: "Shei IT",
  tagline: "Excellent IT. Exactly What You Need.",
  description:
    "From websites to mobile apps, hosting to SEO - we deliver practical digital solutions built for real business growth.",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "About Us", href: "/about" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Contact", href: "/#contact" },
  ],
  stats: [
    {
      value: "150+",
      label: "Projects Completed",
      description: "Successfully delivered for our clients",
      icon: "briefcase",
    },
    {
      value: "98%",
      label: "Client Satisfaction",
      description: "We're proud of our client relationships",
      icon: "badge",
    },
    {
      value: "5+",
      label: "Years Experience",
      description: "Delivering excellent digital solutions",
      icon: "chart",
    },
    {
      value: "24/7",
      label: "Support",
      description: "We're here whenever you need us",
      icon: "spark",
    },
  ],
} as const;

export const servicesSection = {
  title: "Our Services",
  highlight: "Services",
  description:
    "Everything you need to build, grow and support your digital presence.",
  items: [
    {
      title: "Website Development",
      description:
        "Fast, responsive and SEO-friendly websites that represent your business perfectly.",
      icon: "code",
      accent: "violet",
    },
    {
      title: "Mobile App Development",
      description:
        "Modern mobile apps for Android, iOS and cross-platform products that scale.",
      icon: "smartphone",
      accent: "blue",
    },
    {
      title: "Hosting & Cloud",
      description:
        "Reliable hosting and secure cloud infrastructure for smooth performance and uptime.",
      icon: "cloud",
      accent: "mint",
    },
    {
      title: "SEO & Marketing",
      description:
        "Rank higher, grow traffic and strengthen your brand with practical digital strategies.",
      icon: "chart",
      accent: "orange",
    },
    {
      title: "Cross Platform Development",
      description:
        "Build once and run seamlessly across multiple devices and platforms.",
      icon: "layers",
      accent: "pink",
    },
    {
      title: "Maintenance & Support",
      description:
        "We keep your digital products updated, secure and running smoothly over time.",
      icon: "shield",
      accent: "purple",
    },
    {
      title: "UI/UX Design",
      description:
        "Clear, modern interfaces designed to create trust and guide users naturally.",
      icon: "palette",
      accent: "sky",
    },
    {
      title: "Deployment & DevOps",
      description:
        "Production-ready delivery pipelines, monitoring and release support you can rely on.",
      icon: "rocket",
      accent: "indigo",
    },
  ],
} as const;

export const processSection = {
  title: "From Idea to Launch",
  highlight: "Idea to Launch",
  description:
    "Our proven process ensures quality, transparency and on-time delivery.",
  steps: [
    {
      title: "Discover",
      description:
        "We understand your business, goals and requirements before we design a solution.",
      icon: "search",
      accent: "violet",
    },
    {
      title: "Design",
      description:
        "We design clean user experiences and visual systems that match your brand.",
      icon: "pen",
      accent: "mint",
    },
    {
      title: "Develop",
      description:
        "We build scalable, maintainable and high-performance digital products.",
      icon: "code",
      accent: "blue",
    },
    {
      title: "Deploy",
      description:
        "We ship with best practices, testing and stable release workflows in place.",
      icon: "rocket",
      accent: "pink",
    },
    {
      title: "Maintain",
      description:
        "We provide ongoing support, updates and continuous improvement after launch.",
      icon: "shield",
      accent: "purple",
    },
  ],
} as const;
