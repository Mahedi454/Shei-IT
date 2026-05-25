"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import { blogpageBannerDark, blogpageBannerLight } from "@/assets";
import { useTheme } from "@/components/providers/theme-provider";
import { blogTopicOptions, getServiceIcon } from "@/lib/services";

export function BlogHero() {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
  }, [searchParams]);

  const activeTopic = searchParams.get("topic") ?? "";
  const bannerImage =
    mounted && theme === "dark" ? blogpageBannerDark : blogpageBannerLight;

  const updateSearchQuery = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const normalizedSearch = value.trim();

    if (normalizedSearch) {
      params.set("search", normalizedSearch);
      params.delete("topic");
    } else {
      params.delete("search");
    }

    const query = params.toString();
    router.replace(query ? `/blog?${query}` : "/blog", { scroll: false });
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSearchQuery(search);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    updateSearchQuery(value);
  };

  const getTopicHref = (topic: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (topic) {
      params.set("topic", topic);
      params.delete("search");
    } else {
      params.delete("topic");
    }

    const query = params.toString();
    return query ? `/blog?${query}` : "/blog";
  };

  return (
    <section className="relative overflow-hidden pb-14 pt-14 lg:pb-16 lg:pt-16">
      <div className="relative mx-auto w-11/12 max-w-[1440px]">
        <div className="grid items-center gap-10 md:grid-cols-[0.86fr_1.14fr]">
          <div className="max-w-[45rem]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-[color:var(--hero-pill)] px-4 py-2 text-[12px] font-semibold text-[color:var(--primary)] shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10">
              <Sparkles className="h-3.5 w-3.5" />
              Insights & Ideas
            </div>

            <div className="mt-8 space-y-6">
              <h1 className="page-main-heading">
                <span className="block">Insights to Build</span>
                <span className="block">
                  Smarter{" "}
                  <span className="page-main-heading-accent">
                    Digital Solutions
                  </span>
                </span>
              </h1>
              <p className="max-w-[39rem] text-[15px] leading-8 text-[color:var(--muted-foreground)] sm:text-[16px]">
                Practical tips, industry trends, and expert insights to help
                your business grow in the digital world.
              </p>
            </div>

            <form
              className="mt-10 max-w-[40rem]"
              role="search"
              onSubmit={handleSearch}
            >
              <label htmlFor="blog-search" className="sr-only">
                Search articles
              </label>
              <div className="flex h-16 items-center rounded-[0.85rem] border border-[color:var(--button-border)] bg-[color:var(--button-secondary)] px-5 shadow-[0_18px_42px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:shadow-[0_18px_42px_rgba(0,0,0,0.24)]">
                <input
                  id="blog-search"
                  type="search"
                  value={search}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Search articles..."
                  className="min-w-0 flex-1 bg-transparent text-[15px] font-medium text-[color:var(--foreground)] outline-none placeholder:text-[color:var(--muted-foreground)]"
                />
                <button
                  type="submit"
                  aria-label="Search articles"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[color:var(--primary)] hover:bg-[color:var(--button-secondary-icon)]"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>

          <div className="relative hidden items-center justify-center md:flex md:justify-end">
            <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--purple-glow)] blur-[120px]" />
            <div className="relative w-full max-w-[830px]">
              <Image
                src={bannerImage}
                alt="Blog article dashboard illustration"
                priority
                className="relative z-10 h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-[1rem] border border-[color:var(--button-border)] bg-[color:var(--button-secondary)] p-3 shadow-[0_18px_44px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:shadow-[0_18px_44px_rgba(0,0,0,0.24)]">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-[repeat(20,minmax(0,1fr))]">
            {[
              { label: "All Topics", value: "", icon: "spark" },
              ...blogTopicOptions,
            ].map((topic, topicIndex) => {
              const Icon = topic.value ? getServiceIcon(topic.icon) : Sparkles;

              return (
                <Link
                  key={topic.label}
                  href={getTopicHref(topic.value)}
                  className={`inline-flex h-12 min-w-0 items-center justify-center gap-3 rounded-[0.75rem] px-4 text-[13px] font-semibold ${
                    topicIndex < 5 ? "xl:col-span-4" : "xl:col-span-5"
                  } ${
                    activeTopic === topic.value
                      ? "border border-[color:var(--button-border)] bg-[color:var(--card-solid)] text-[color:var(--primary)] shadow-[0_10px_24px_rgba(108,99,255,0.08)]"
                      : "text-[color:var(--muted-foreground)] hover:bg-[color:var(--button-secondary-icon)] hover:text-[color:var(--foreground)]"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" strokeWidth={2.1} />
                  <span className="truncate">{topic.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
