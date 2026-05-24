import { OurStoryPage } from "@/components/about/our-story-page";
import { pageSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = () =>
  pageSeoMetadata("our-story", {
    title: "Our Story | Shei IT",
    description:
      "Read the story behind Shei IT and how we help businesses build practical websites, apps, SEO systems, and reliable digital support.",
    path: "/about/our-story",
  });

export default function AboutOurStoryRoute() {
  return <OurStoryPage />;
}
