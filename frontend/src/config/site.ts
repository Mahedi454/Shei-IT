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
    },
    {
      title: "Tutor Booking Platform",
      tags: ["SaaS", "Booking", "Payment"],
      accent: "blue",
      theme: "tutor",
    },
    {
      title: "Business Portfolio Website",
      tags: ["Website", "Branding", "SEO"],
      accent: "peach",
      theme: "portfolio",
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
    href: "#",
  },
} as const;

export const footerConfig = {
  description:
    "Excellent IT solutions for modern businesses. We build, launch and support your digital success.",
  groups: [
    {
      title: "Services",
      links: [
        { label: "Website Development", href: "#" },
        { label: "Mobile App Development", href: "#" },
        { label: "Hosting & Cloud", href: "#" },
        { label: "SEO & Marketing", href: "#" },
        { label: "Cross Platform", href: "#" },
        { label: "Maintenance & Support", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Portfolio", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "#" },
        { label: "FAQs", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ],
  contact: [
    { label: "hello@shei-it.com", href: "mailto:hello@shei-it.com", type: "email" },
    { label: "+880 1234 567890", href: "tel:+8801234567890", type: "phone" },
    { label: "Dhaka, Bangladesh", href: "#", type: "location" },
  ],
  socialLinks: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61589534485196",
      type: "facebook",
    },
    { label: "Twitter", href: "#", type: "twitter" },
    { label: "Instagram", href: "#", type: "instagram" },
    { label: "LinkedIn", href: "#", type: "linkedin" },
  ],
} as const;
