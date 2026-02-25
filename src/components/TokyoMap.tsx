import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { neighborhoods, zones, getNeighborhoodImage, type Neighborhood, type ZoneId } from "@/data/neighborhoods";
import { zoneBorderColors, zoneSolidColors, zoneTextColors } from "@/lib/zone-theme";

interface Props {
  onSelectNeighborhood: (n: Neighborhood) => void;
  activeZone: ZoneId | null;
  onSetActiveZone: (z: ZoneId | null) => void;
}

interface NeighborhoodDotProps {
  neighborhood: Neighborhood;
  isActive: boolean;
  onHover: (id: string | null) => void;
  onFocus: (id: string | null) => void;
  onSelectNeighborhood: (n: Neighborhood) => void;
}

const NeighborhoodDot = memo(
  ({ neighborhood, isActive, onHover, onFocus, onSelectNeighborhood }: NeighborhoodDotProps) => (
    <button
      className={`absolute z-10 group transition-all duration-200 ${isActive ? "opacity-100 scale-100" : "opacity-20 scale-90"}`}
      style={{ left: `${neighborhood.mapX}%`, top: `${neighborhood.mapY}%`, transform: "translate(-50%, -50%)" }}
      onMouseEnter={() => onHover(neighborhood.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onFocus(neighborhood.id)}
      onBlur={() => onFocus(null)}
      onClick={() => onSelectNeighborhood(neighborhood)}
      aria-label={`打开 ${neighborhood.name}：${neighborhood.persona}`}
    >
      <span className={`absolute inset-0 w-4 h-4 md:w-5 md:h-5 rounded-full ${zoneSolidColors[neighborhood.zone]} opacity-30 animate-pulse-glow -translate-x-1/2 -translate-y-1/2`} />
      <span className={`relative block w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${zoneSolidColors[neighborhood.zone]} border border-background shadow-lg -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-150 group-focus-visible:scale-150 ring-offset-2 ring-offset-background group-focus-visible:ring-2 group-focus-visible:ring-foreground/60`} />
    </button>
  ),
  (prev, next) => prev.neighborhood.id === next.neighborhood.id && prev.isActive === next.isActive,
);

export default function TokyoMap({ onSelectNeighborhood, activeZone, onSetActiveZone }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const activePreviewId = hoveredId ?? focusedId;
  const hovered = neighborhoods.find(n => n.id === activePreviewId) ?? null;

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
        {neighborhoods.map(n => (
          <NeighborhoodDot
            key={n.id}
            neighborhood={n}
            isActive={!activeZone || n.zone === activeZone}
            onHover={setHoveredId}
            onFocus={setFocusedId}
            onSelectNeighborhood={onSelectNeighborhood}
          />
        ))}

        {/* Single map-level tooltip/preview */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.id}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className="absolute w-56 md:w-64 bg-card/95 backdrop-blur-md border border-border rounded-lg overflow-hidden shadow-2xl z-30 pointer-events-none"
              style={{
                left: `min(calc(${hovered.mapX}% + 16px), calc(100% - 18rem))`,
                top: `max(calc(${hovered.mapY}% - 160px), 8px)`,
              }}
            >
              <img
                src={getNeighborhoodImage(hovered.id, 400, 200)}
                alt={hovered.name}
                className="w-full h-28 object-cover"
                loading="lazy"
              />
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
