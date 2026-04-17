import * as React from "react";
import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes

// Define the type for a single report item
export interface Report {
  id: string;
  quarter: string;
  period: string;
  imageSrc: string;
  isNew?: boolean;
}

// Define the props for the main component
interface ShareholderReportsProps {
  reports: Report[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const ChevronLeftIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
);

const ChevronRightIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

export const ShareholderReports = React.forwardRef<
  HTMLDivElement,
  ShareholderReportsProps
>(({ reports, title = "Certificates & Achievements", subtitle = "Continuous learning and growth", className, ...props }, ref) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Function to handle scrolling and update arrow visibility
  const checkScrollability = React.useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 for precision
    }
  }, []);

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollability();
      container.addEventListener("scroll", checkScrollability);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollability);
      }
    };
  }, [reports, checkScrollability]);

  // Scroll handler for navigation buttons
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8; // Scroll by 80% of the visible width
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!mounted) return null;

  return (
    <section
      ref={ref}
      id="certificates"
      className={cn("w-full max-w-7xl mx-auto py-16 px-4 md:px-8", className)}
      aria-labelledby="reports-heading"
      {...props}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 id="reports-heading" className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white">
            {title}
          </h2>
          <p className="text-[#a1a1aa] text-sm md:text-lg">{subtitle}</p>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={cn(
              "p-4 rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/10"
            )}
          >
            <ChevronLeftIcon />
          </button>
          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={cn(
              "p-4 rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/10"
            )}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide space-x-6 pb-8"
      >
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex-shrink-0 w-[320px] sm:w-[480px] snap-start"
          >
            {/* Report Card */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0c] border border-white/10 mb-4 transition-all duration-500 ease-out group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] group-hover:-translate-y-2">
                <img
                  src={report.imageSrc}
                  alt={`Report for ${report.quarter}`}
                  className="w-full h-[240px] sm:h-[340px] object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-between text-white">
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1">Professional Certification</h3>
                    <p className="text-xs font-medium text-white/90">{report.period}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold tracking-widest uppercase opacity-60">Credential ID: {report.id.toUpperCase()}</p>
                    <div className="h-[2px] w-8 bg-white transition-all duration-500 group-hover:w-full opacity-50" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-1">
                <h4 className="font-black text-xl uppercase tracking-tighter text-white leading-tight">{report.quarter}</h4>
                {report.isNew && (
                  <span className="text-[10px] font-black bg-white text-black px-3 py-1 rounded-full tracking-widest">
                    NEW
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

ShareholderReports.displayName = "ShareholderReports";
