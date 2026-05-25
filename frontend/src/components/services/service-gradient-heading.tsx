type ServiceGradientHeadingProps = {
  children: string;
  className?: string;
  as?: "h1" | "h2";
  highlightText?: string;
  highlightWords?: number;
};

export function ServiceGradientHeading({
  children,
  className = "",
  as: Heading = "h2",
  highlightText,
  highlightWords = 2,
}: ServiceGradientHeadingProps) {
  const text = children.trim();

  if (highlightText) {
    const startIndex = text
      .toLowerCase()
      .lastIndexOf(highlightText.toLowerCase());

    if (startIndex >= 0) {
      const before = text.slice(0, startIndex);
      const highlight = text.slice(
        startIndex,
        startIndex + highlightText.length,
      );
      const after = text.slice(startIndex + highlightText.length);

      return (
        <Heading className={className}>
          {before}
          <span className="text-[color:var(--heading-accent)]">
            {highlight}
          </span>
          {after}
        </Heading>
      );
    }
  }

  const words = text.split(/\s+/);
  const highlightCount =
    words.length > 2 ? Math.min(highlightWords, words.length - 1) : 1;
  const plain = words.slice(0, -highlightCount).join(" ");
  const highlight = words.slice(-highlightCount).join(" ");

  return (
    <Heading className={className}>
      {plain}
      {plain && highlight ? " " : ""}
      <span className="text-[color:var(--heading-accent)]">{highlight}</span>
    </Heading>
  );
}
