import {
  BadgeCheck,
  BriefcaseBusiness,
  Globe2,
  Headphones,
  Send,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

const impactStats = [
  {
    value: "25+",
    label: "Projects Completed",
    icon: BriefcaseBusiness,
    accent: "text-[color:var(--primary)]",
    shell:
      "bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))]",
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    icon: BadgeCheck,
    accent: "text-[color:var(--mint)]",
    shell:
      "bg-[linear-gradient(180deg,rgba(111,231,200,0.22),rgba(111,231,200,0.08))]",
  },
  {
    value: "3+",
    label: "Years Experience",
    icon: UserRoundCheck,
    accent: "text-[color:var(--orange)]",
    shell:
      "bg-[linear-gradient(180deg,rgba(255,159,90,0.2),rgba(255,159,90,0.08))]",
  },
  {
    value: "24/7",
    label: "Support Availability",
    icon: Headphones,
    accent: "text-[color:var(--blue)]",
    shell:
      "bg-[linear-gradient(180deg,rgba(93,174,255,0.2),rgba(93,174,255,0.08))]",
  },
] as const;

const teamMembers = [
  {
    name: "Mahedi Hasan",
    role: "Co-Founder & CEO",
    skin: "#f0b27a",
    hair: "#171923",
    shirt: "from-[#202331] to-[#111827]",
    bg: "from-[#eef2ff] to-[#f8faff]",
    glasses: false,
    longHair: false,
  },
  {
    name: "Samiun Auntor",
    role: "Co-Founder & CTO",
    skin: "#d99a68",
    hair: "#201711",
    shirt: "from-[#f8fafc] to-[#cbd5e1]",
    bg: "from-[#f8fafc] to-[#eef2ff]",
    glasses: true,
    longHair: false,
  },
  {
    name: "Parvez Mumin",
    role: "Co-Founder & CPO",
    skin: "#d99a68",
    hair: "#151019",
    shirt: "from-[#6c63ff] to-[#4338ca]",
    bg: "from-[#eef2ff] to-[#f8faff]",
    glasses: false,
    longHair: false,
  },
] as const;

function AvatarIllustration({
  member,
}: {
  member: (typeof teamMembers)[number];
}) {
  return (
    <div
      className={`relative mx-auto h-[132px] w-[132px] overflow-hidden rounded-[1.6rem] bg-gradient-to-br ${member.bg} dark:from-white/[0.08] dark:to-white/[0.02]`}
    >
      <div className="absolute inset-x-5 bottom-[-22px] h-[68px] rounded-[999px_999px_0_0] bg-slate-900/5 shadow-[0_22px_36px_rgba(15,23,42,0.16)] dark:bg-white/5 dark:shadow-none" />
      <div
        className={`absolute inset-x-7 bottom-[-10px] h-[66px] rounded-[999px_999px_0_0] bg-gradient-to-br ${member.shirt}`}
      />
      {member.longHair ? (
        <div
          className="absolute left-[37px] top-[22px] h-[82px] w-[60px] rounded-[32px_32px_26px_26px]"
          style={{ backgroundColor: member.hair }}
        />
      ) : null}
      <div
        className="absolute left-1/2 top-[28px] h-[58px] w-[58px] -translate-x-1/2 rounded-[44%_44%_48%_48%] shadow-[inset_0_-8px_16px_rgba(120,73,34,0.12)]"
        style={{ backgroundColor: member.skin }}
      />
      <div
        className="absolute left-[39px] top-[19px] h-[31px] w-[54px] rounded-[28px_28px_18px_18px]"
        style={{ backgroundColor: member.hair }}
      />
      {member.longHair ? (
        <div
          className="absolute left-[31px] top-[36px] h-[62px] w-[18px] rounded-full"
          style={{ backgroundColor: member.hair }}
        />
      ) : null}
      <span className="absolute left-[51px] top-[55px] h-1.5 w-1.5 rounded-full bg-slate-950/80" />
      <span className="absolute right-[51px] top-[55px] h-1.5 w-1.5 rounded-full bg-slate-950/80" />
      {member.glasses ? (
        <>
          <span className="absolute left-[45px] top-[50px] h-4 w-5 rounded-full border-2 border-slate-900/70" />
          <span className="absolute right-[45px] top-[50px] h-4 w-5 rounded-full border-2 border-slate-900/70" />
          <span className="absolute left-[62px] top-[57px] h-0.5 w-2 bg-slate-900/70" />
        </>
      ) : null}
      <span className="absolute left-1/2 top-[70px] h-2 w-4 -translate-x-1/2 rounded-b-full border-b-2 border-slate-950/45" />
    </div>
  );
}

export function AboutImpactTeamSection() {
  return (
    <section className="relative pb-16 lg:pb-20">
      <div className="mx-auto grid w-11/12 max-w-[1440px] gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.26em] text-[color:var(--primary)]">
            Our Impact
          </p>
          <h2 className="mt-4 max-w-[32rem] text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.7rem]">
            Numbers That Reflect Our Commitment
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {impactStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.label}
                  className="flex min-h-[104px] items-center gap-4 rounded-[1.25rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-5 py-4 shadow-[0_18px_44px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none"
                >
                  <span
                    className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] ${stat.shell} ${stat.accent}`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <span>
                    <span className="block text-[1.9rem] font-semibold leading-none tracking-[-0.05em] text-[color:var(--primary)]">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-[12px] font-medium text-[color:var(--muted-foreground)]">
                      {stat.label}
                    </span>
                  </span>
                </article>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.26em] text-[color:var(--primary)]">
            Meet The Team
          </p>
          <h2 className="mt-4 text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.7rem]">
            People Behind shei-it
          </h2>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="rounded-[1.25rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[0_18px_44px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none"
              >
                <AvatarIllustration member={member} />
                <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                  {member.name}
                </h3>
                <p className="mt-1 text-[12px] font-medium text-[color:var(--muted-foreground)]">
                  {member.role}
                </p>
                <div className="mt-4 flex items-center gap-4 text-[color:var(--primary)]">
                  <Send className="h-4 w-4" strokeWidth={2.1} />
                  <ShieldCheck className="h-4 w-4" strokeWidth={2.1} />
                  <Globe2 className="h-4 w-4" strokeWidth={2.1} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
