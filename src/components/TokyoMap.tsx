import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { neighborhoods, zones, getNeighborhoodImage, getNeighborhoodImageSrcSet, type Neighborhood, type ZoneId } from "@/data/neighborhoods";
import { zoneBorderColors, zoneSolidColors, zoneTextColors } from "@/lib/zone-theme";

interface Props {
  onSelectNeighborhood: (n: Neighborhood) => void;
  activeZone: ZoneId | null;
  onSetActiveZone: (z: ZoneId | null) => void;
}

export default function TokyoMap({ onSelectNeighborhood, activeZone, onSetActiveZone }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const activePreviewId = hoveredId ?? focusedId;
  const hovered = neighborhoods.find(n => n.id === activePreviewId);

  const filtered = activeZone ? neighborhoods.filter(n => n.zone === activeZone) : neighborhoods;

  return (
    <section className="relative w-full" id="map">
      {/* Zone legend */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {zones.map(z => (
          <button
            key={z.id}
            onClick={() => onSetActiveZone(activeZone === z.id ? null : z.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              activeZone === z.id
                ? `${zoneSolidColors[z.id]} text-primary-foreground border-transparent`
                : `border-border text-muted-foreground hover:${zoneTextColors[z.id]}`
            }`}
          >
            {z.name}
          </button>
        ))}
      </div>

      {/* Map container */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-secondary/30 rounded-xl border border-border overflow-hidden bg-noise">
        {/* Background grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i}>
              <line x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="hsl(var(--foreground))" strokeWidth="0.1" />
              <line x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="hsl(var(--foreground))" strokeWidth="0.1" />
            </g>
          ))}
        </svg>

        {/* Tokyo label */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <h3 className="text-xs md:text-sm text-muted-foreground tracking-[0.3em] uppercase">Tokyo Metropolitan</h3>
          <h2 className="text-lg md:text-2xl font-serif text-gradient-gold">東京 23区</h2>
        </div>

        {/* Neighborhood dots */}
        {neighborhoods.map(n => {
          const isActive = !activeZone || n.zone === activeZone;
          return (
            <motion.button
              key={n.id}
              className="absolute z-10 group"
              style={{ left: `${n.mapX}%`, top: `${n.mapY}%`, transform: "translate(-50%, -50%)" }}
              onMouseEnter={() => setHoveredId(n.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setFocusedId(n.id)}
              onBlur={() => setFocusedId(current => (current === n.id ? null : current))}
              onClick={() => onSelectNeighborhood(n)}
              aria-label={`打开 ${n.name}：${n.persona}`}
              animate={{ opacity: isActive ? 1 : 0.15, scale: isActive ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              {/* Pulse ring */}
              <span className={`absolute inset-0 w-4 h-4 md:w-5 md:h-5 rounded-full ${zoneSolidColors[n.zone]} opacity-30 animate-pulse-glow -translate-x-1/2 -translate-y-1/2`} />
              {/* Dot */}
              <span className={`relative block w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${zoneSolidColors[n.zone]} border border-background shadow-lg -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-150 group-focus-visible:scale-150 ring-offset-2 ring-offset-background group-focus-visible:ring-2 group-focus-visible:ring-foreground/60`} />
              {/* Label on hover */}
              <AnimatePresence>
                {(hoveredId === n.id || focusedId === n.id) && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className={`absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap px-2 py-1 rounded text-[10px] md:text-xs bg-card border ${zoneBorderColors[n.zone]} shadow-lg z-20`}
                  >
                    <span className={`font-bold ${zoneTextColors[n.zone]}`}>{n.name}</span>
                    <span className="text-muted-foreground ml-1">{n.persona}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}

        {/* Hover preview card */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-4 bottom-4 md:right-6 md:bottom-6 w-60 md:w-72 bg-card/95 backdrop-blur-md border border-border rounded-lg overflow-hidden shadow-2xl z-30"
            >
              <div className="relative h-28">
                <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden="true" />
                <img
                  src={getNeighborhoodImage(hovered.id, 320, 192)}
                  srcSet={getNeighborhoodImageSrcSet(hovered.id, [
                    { width: 320, height: 192 },
                    { width: 640, height: 384 },
                    { width: 960, height: 576 },
                  ])}
                  sizes="(max-width: 768px) 240px, 288px"
                  alt={hovered.name}
                  className="relative z-10 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${zoneSolidColors[hovered.zone]}`} />
                  <span className="text-sm font-bold text-foreground">{hovered.name}</span>
                  <span className="text-xs text-muted-foreground">{hovered.nameEn}</span>
                </div>
                <p className={`text-sm font-medium ${zoneTextColors[hovered.zone]}`}>{hovered.persona}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{hovered.fashion}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
