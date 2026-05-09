import Image from "next/image";

import { logo } from "@/assets";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

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
    <span className={cn("flex items-center gap-3", className)}>
      <Image
        src={logo}
        alt={`${siteConfig.name} logo`}
        priority={priority}
        className={cn("h-9 w-9 object-contain", iconClassName)}
      />
      {showText ? (
        <span
          className={cn(
            "text-[15px] font-semibold tracking-tight text-[color:var(--foreground)]",
            textClassName,
          )}
        >
          {siteConfig.name}
        </span>
      ) : null}
    </span>
  );
}
