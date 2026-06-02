export const siteConfig = {
  name: "Shei IT",
  tagline: "Excellent IT. Exactly What You Need.",
  description:
    "From websites to mobile apps, hosting to SEO - we deliver practical digital solutions built for real business growth.",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About Us", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  stats: [
    {
      value: "25+",
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
      value: "3+",
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
      href: "/services/website-development",
    },
    {
      title: "Mobile App Development",
      description:
        "Modern mobile apps for Android, iOS and cross-platform products that scale.",
      icon: "smartphone",
      accent: "blue",
      href: "/services/mobile-app-development",
    },
    {
      title: "Hosting & Cloud",
      description:
        "Reliable hosting and secure cloud infrastructure for smooth performance and uptime.",
      icon: "cloud",
      accent: "mint",
      href: "/services/hosting-cloud",
    },
    {
      title: "SEO & Marketing",
      description:
        "Rank higher, grow traffic and strengthen your brand with practical digital strategies.",
      icon: "chart",
      accent: "orange",
      href: "/services/seo-marketing",
    },
    {
      title: "Cross Platform Development",
      description:
        "Build once and run seamlessly across multiple devices and platforms.",
      icon: "layers",
      accent: "pink",
      href: "/services/cross-platform-development",
    },
    {
      title: "Maintenance & Support",
      description:
        "We keep your digital products updated, secure and running smoothly over time.",
      icon: "shield",
      accent: "purple",
      href: "/services/maintenance-support",
    },
    {
      title: "UI/UX Design",
      description:
        "Clear, modern interfaces designed to create trust and guide users naturally.",
      icon: "palette",
      accent: "sky",
      href: "/services/ui-ux-design",
    },
    {
      title: "Deployment & DevOps",
      description:
        "Production-ready delivery pipelines, monitoring and release support you can rely on.",
      icon: "rocket",
      accent: "indigo",
      href: "/services/deployment-devops",
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

export const selectedWorkSection = {
  title: "Selected Work",
  highlight: "Work",
  description:
    "Here are some of the digital products we're proud to have built.",
  items: [
    {
      title: "Restaurant Ordering Website",
      tags: ["Website", "SEO", "Hosting"],
      accent: "violet",
      theme: "restaurant",
      href: "/portfolio",
    },
    {
      title: "Tutor Booking Platform",
      tags: ["SaaS", "Booking", "Payment"],
      accent: "blue",
      theme: "tutor",
      href: "/portfolio/skillbridge-frontend",
    },
    {
      title: "Business Portfolio Website",
      tags: ["Website", "Branding", "SEO"],
      accent: "peach",
      theme: "portfolio",
      href: "/portfolio",
    },
  ],
} as const;

export const testimonialsSection = {
  title: "What Our Clients Say",
  highlight: "Clients Say",
  description: "Real stories from businesses we've helped grow online.",
  items: [
    {
      quote:
        "shei-it built our website exactly how we imagined. The design, speed and SEO setup are excellent.",
      name: "Rahed Ahmed",
      role: "CEO, Digital Shop",
      avatar: "RA",
    },
    {
      quote:
        "The mobile app they built for us is smooth, fast and our customers love it. Great communication and support.",
      name: "Nusrat Jahan",
      role: "Founder, TutorPro",
      avatar: "NJ",
    },
    {
      quote:
        "Professional team with amazing support. They handled our website maintenance and SEO perfectly.",
      name: "Mahbub Alam",
      role: "Marketing Head, BizGrow",
      avatar: "MA",
    },
    {
      quote:
        "From planning to deployment, everything was transparent and on time. We now get better leads consistently.",
      name: "Sadia Karim",
      role: "Director, FlowCraft",
      avatar: "SK",
    },
  ],
} as const;

export const ctaSection = {
  title: "Ready to Build Something Excellent?",
  description:
    "Tell us what you need. We'll help you turn it into a real digital product.",
  primaryAction: {
    label: "Start a Project",
    href: "/contact#contact-form",
  },
} as const;

export const portfolioSection = {
  badge: "Our Work",
  title: "Digital Products Designed to Perform",
  highlight: "Perform",
  projectsTitle: "Featured Projects",
  projectsDescription:
    "A selection of practical products we designed and shipped for measurable growth.",
  description:
    "Explore websites, apps, dashboards and digital systems we build to help businesses grow.",
  projects: [
    {
      title: "Restaurant Ordering Website",
      categories: ["Website", "SEO", "Hosting"],
      image:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
      metric: "+42%",
      metricLabel: "More Orders",
    },
    {
      title: "Tutor Booking Platform",
      categories: ["SaaS", "Booking", "Payment"],
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      metric: "Complete",
      metricLabel: "Workflow",
    },
    {
      title: "Business Portfolio Website",
      categories: ["Website", "Branding", "SEO"],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      metric: "Fast &",
      metricLabel: "SEO Ready",
    },
    {
      title: "E-commerce Store",
      categories: ["E-commerce", "Payment", "SEO"],
      image:
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80",
      metric: "+35%",
      metricLabel: "Sales Growth",
    },
    {
      title: "Analytics Dashboard",
      categories: ["Dashboard", "Analytics", "Charts"],
      image:
        "https://images.unsplash.com/photo-1551281044-8b27d3c3d4a4?auto=format&fit=crop&w=1200&q=80",
      metric: "Real-time",
      metricLabel: "Data",
    },
    {
      title: "Fitness Tracking App",
      categories: ["Mobile App", "UI/UX", "API"],
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
      metric: "10k+",
      metricLabel: "Downloads",
    },
  ],
  results: [
    {
      value: "25+",
      label: "Projects Completed",
      icon: "tools",
    },
    {
      value: "98%",
      label: "Client Satisfaction",
      icon: "sparkles",
    },
    {
      value: "3M+",
      label: "Users Impacted",
      icon: "users",
    },
    {
      value: "40%",
      label: "Avg. Growth Increase",
      icon: "trending",
    },
  ],
} as const;

export const footerConfig = {
  description:
    "Excellent IT solutions for modern businesses. We build, launch and support your digital success.",
  groups: [
    {
      title: "Services",
      links: [
        { label: "Website Development", href: "/services/website-development" },
        {
          label: "Mobile App Development",
          href: "/services/mobile-app-development",
        },
        { label: "Hosting & Cloud", href: "/services/hosting-cloud" },
        { label: "SEO & Marketing", href: "/services/seo-marketing" },
        {
          label: "Cross Platform",
          href: "/services/cross-platform-development",
        },
        {
          label: "Maintenance & Support",
          href: "/services/maintenance-support",
        },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Portfolio", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "/contact#contact-form" },
        { label: "FAQs", href: "/faqs" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
      ],
    },
  ],
  contact: [
    {
      label: "sheiitofficial@gmail.com",
      href: "mailto:sheiitofficial@gmail.com",
      type: "email",
    },
    { label: "+880 1768 57058", href: "tel:+880176857058", type: "phone" },
    {
      label: "Gazipur, Dhaka, Bangladesh",
      href: "https://goo.gl/maps/ZTjn6rMvpjw9YR7PA",
      type: "location",
    },
  ],
  socialLinks: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61589534485196",
      type: "facebook",
    },
    { label: "Twitter", href: "https://x.com/sheiitofficial", type: "twitter" },
    { label: "Instagram", href: "#", type: "instagram" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shei-it/", type: "linkedin" },
  ],
} as const;
