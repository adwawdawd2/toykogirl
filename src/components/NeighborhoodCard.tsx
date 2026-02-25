import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Heart, ShoppingBag, Camera, Sparkles } from "lucide-react";
import { type Neighborhood, neighborhoods, zones, getNeighborhoodImage, getNeighborhoodImageSrcSet } from "@/data/neighborhoods";
import { zoneBgColors, zoneBorderColors, zoneTextColors } from "@/lib/zone-theme";

interface Props {
  neighborhood: Neighborhood | null;
  onClose: () => void;
  onNavigate: (n: Neighborhood) => void;
}

export default function NeighborhoodCard({ neighborhood, onClose, onNavigate }: Props) {
  if (!neighborhood) return null;

  const zone = zones.find(z => z.id === neighborhood.zone)!;
  const sameZone = neighborhoods.filter(n => n.zone === neighborhood.zone && n.id !== neighborhood.id);

  const infoItems = [
    { icon: ShoppingBag, label: "穿搭风格", value: neighborhood.fashion },
    { icon: Sparkles, label: "生活关键词", value: neighborhood.lifestyle },
    { icon: Camera, label: "社交媒体画像", value: neighborhood.socialMedia },
    { icon: Heart, label: "恋爱倾向", value: neighborhood.romance },
    { icon: Clock, label: "出没时间", value: neighborhood.peakTime },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-hide bg-card border border-border rounded-xl shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Hero image */}
          <div className="relative h-48 md:h-56 overflow-hidden bg-muted">
            <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden="true" />
            <img
              src={getNeighborhoodImage(neighborhood.id, 640, 360)}
              srcSet={getNeighborhoodImageSrcSet(neighborhood.id, [
                { width: 320, height: 180 },
                { width: 640, height: 360 },
                { width: 960, height: 540 },
              ])}
              sizes="(max-width: 768px) 100vw, 512px"
              alt={neighborhood.name}
              className="relative z-10 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-background/60 backdrop-blur-sm text-foreground hover:bg-background/80 transition-colors"
              aria-label="关闭弹窗"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-4 left-4">
              <div className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium mb-2 ${zoneBgColors[neighborhood.zone]} ${zoneTextColors[neighborhood.zone]} border ${zoneBorderColors[neighborhood.zone]}`}>
                {zone.name}
              </div>
              <h2 className="text-2xl font-serif font-bold text-foreground">
                {neighborhood.name}
                <span className="text-sm text-muted-foreground ml-2 font-sans">{neighborhood.nameEn}</span>
              </h2>
              <p className={`text-lg font-medium ${zoneTextColors[neighborhood.zone]}`}>{neighborhood.persona}</p>
            </div>
          </div>

          {/* Info items */}
          <div className="p-4 space-y-4">
            {infoItems.map(item => (
              <div key={item.label} className="flex gap-3">
                <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${zoneBgColors[neighborhood.zone]}`}>
                  <item.icon className={`w-4 h-4 ${zoneTextColors[neighborhood.zone]}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                  <p className="text-sm text-foreground leading-relaxed">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Same zone navigation */}
          {sameZone.length > 0 && (
            <div className="px-4 pb-4">
              <p className="text-xs text-muted-foreground mb-2">同区域街区</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {sameZone.map(n => (
                  <button
                    key={n.id}
                    onClick={() => onNavigate(n)}
                    className="shrink-0 w-24 rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="relative h-14 bg-muted">
                      <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden="true" />
                      <img
                        src={getNeighborhoodImage(n.id, 320, 192)}
                        srcSet={getNeighborhoodImageSrcSet(n.id, [
                          { width: 320, height: 192 },
                          { width: 640, height: 384 },
                          { width: 960, height: 576 },
                        ])}
                        sizes="96px"
                        alt={n.name}
                        className="relative z-10 w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-1.5">
                      <p className="text-xs font-medium text-foreground truncate">{n.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{n.persona}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
