import { cn } from "@/lib/utils";

interface FlipLinkProps {
  children: string;
  href: string;
  className?: string;
}

const FlipLink = ({ children, href, className }: FlipLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl text-white",
        className
      )}
      style={{
        lineHeight: 0.85,
      }}
    >
      <div className="flex">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-[110%]"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-[110%] transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-y-0"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </a>
  );
};

export const FlipLinks = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-2 w-full py-10">
      <FlipLink href="https://linkedin.com/in/sujoymoulick">Linkedin</FlipLink>
      <FlipLink href="https://github.com/sujoymoulick">Github</FlipLink>
      <FlipLink href="https://www.instagram.com/breathhashira?igsh=M2tpY2t2MjZtazRz">Instagram</FlipLink>
    </section>
  );
};
