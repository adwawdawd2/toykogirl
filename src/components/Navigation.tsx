import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, BarChart3, BookOpen, Menu, X } from "lucide-react";

const navItems = [
  { id: "map", label: "地图", icon: MapPin },
  { id: "data", label: "数据", icon: BarChart3 },
  { id: "article", label: "报告", icon: BookOpen },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: scrolled ? 0 : -60 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
        <a href="#" className="text-sm font-serif text-gradient-gold">東京研究</a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border px-4 py-3 space-y-2">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </a>
          ))}
        </div>
      )}
    </motion.nav>
  );
}
