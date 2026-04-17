"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  LineChart,
  MessageCircle,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", icon: Home, href: "#" },
  { label: "About", icon: User, href: "#about" },
  { label: "Works", icon: LineChart, href: "#works" },
  { label: "Contact", icon: MessageCircle, href: "#contact" },
];

const DESKTOP_LABEL_WIDTH = 90;

type BottomNavBarProps = {
  className?: string;
  defaultIndex?: number;
  stickyBottom?: boolean;
};

export function BottomNavBar({
  className,
  defaultIndex = 0,
  stickyBottom = false,
}: BottomNavBarProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  
  // Use a slightly larger uncollapsed width on larger screens to accommodate larger text
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const labelWidth = isDesktop ? DESKTOP_LABEL_WIDTH : 72;

  return (
    <motion.nav
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      role="navigation"
      aria-label="Bottom Navigation"
      className={cn(
        "bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center md:justify-center p-2 md:px-6 md:py-3 shadow-xl space-x-1 md:space-x-6 min-w-[320px] md:min-w-[600px] max-w-[95vw] h-[52px] md:h-[68px]",
        stickyBottom && "fixed inset-x-0 bottom-6 md:bottom-auto md:top-8 mx-auto z-[200] w-fit",
        className,
      )}
    >
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = activeIndex === idx;

        return (
          <motion.a
            key={item.label}
            href={item.href}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "flex items-center justify-center gap-0 px-3 md:px-6 py-2 md:py-3 rounded-full transition-colors duration-200 relative h-10 md:h-12 min-w-[44px] md:min-w-[70px] no-underline",
              isActive
                ? "bg-white/10 text-white gap-2 md:gap-3"
                : "bg-transparent text-neutral-400 hover:bg-white/5",
              "focus:outline-none focus-visible:ring-0",
            )}
            onClick={() => setActiveIndex(idx)}
            aria-label={item.label}
          >
            <Icon
              strokeWidth={2}
              aria-hidden
              className="transition-colors duration-200 w-[22px] h-[22px] md:w-[26px] md:h-[26px]"
            />

            <motion.div
              initial={false}
              animate={{
                width: isActive ? `${labelWidth}px` : "0px",
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? (isDesktop ? "12px" : "8px") : "0px",
              }}
              transition={{
                width: { type: "spring", stiffness: 350, damping: 32 },
                opacity: { duration: 0.19 },
                marginLeft: { duration: 0.19 },
              }}
              className={cn("overflow-hidden flex items-center", isDesktop ? "max-w-[90px]" : "max-w-[72px]")}
            >
              <span
                className={cn(
                  "font-medium whitespace-nowrap select-none transition-opacity duration-200 overflow-hidden text-ellipsis leading-[1.9]",
                  "text-xs md:text-[15px]",
                  isActive ? "text-white" : "opacity-0",
                )}
                title={item.label}
              >
                {item.label}
              </span>
            </motion.div>
          </motion.a>
        );
      })}
    </motion.nav>
  );
}

export default BottomNavBar;
