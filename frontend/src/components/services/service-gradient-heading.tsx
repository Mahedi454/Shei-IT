type ServiceGradientHeadingProps = {
  children: string;
  className?: string;
};

export function ServiceGradientHeading({
  children,
  className = "",
}: ServiceGradientHeadingProps) {
  const [firstWord, ...remainingWords] = children.trim().split(/\s+/);
  const highlight = remainingWords.join(" ");

  return (
    <h2 className={className}>
      {firstWord}
      {highlight ? " " : ""}
      {highlight ? (
        <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
          {highlight}
        </span>
      ) : null}
    </h2>
  );
}
