export const siteConfig = {
  name: "shei-it",
  tagline: "Excellent IT. Exactly What You Need.",
  description:
    "From websites to mobile apps, hosting to SEO - we deliver practical digital solutions built for real business growth.",
  navLinks: [
    { label: "Home", href: "#", isActive: true },
    { label: "Services", href: "#", isActive: false },
    { label: "Portfolio", href: "#", isActive: false },
    { label: "About Us", href: "#", isActive: false },
    { label: "Pricing", href: "#", isActive: false },
    { label: "Contact", href: "#", isActive: false },
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
