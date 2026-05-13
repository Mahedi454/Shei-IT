import Image from "next/image";

import { logo } from "@/assets";
import { siteConfig } from "@/config/site";

type LogoProps = {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
  priority?: boolean;
};

export function Logo({
  className,
  iconClassName,
  textClassName,
  showText = true,
  priority = false,
}: LogoProps) {
  return (
    <span className={`flex items-center gap-3.5 ${className ?? ""}`}>
      <Image
        src={logo}
        alt={`${siteConfig.name} logo`}
        priority={priority}
        sizes="48px"
        className={`h-7 w-7 object-contain ${iconClassName ?? ""}`}
      />
      {showText ? (
        <span
          className={`text-[20px] font-bold tracking-[-0.04em] text-[color:var(--foreground)] ${textClassName ?? ""}`}
        >
          {siteConfig.name}
        </span>
      ) : null}
    </span>
  );
}
