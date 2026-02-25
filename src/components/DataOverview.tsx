import { useState } from 'react';
import { motion } from 'framer-motion';
import { neighborhoods, zones, type ZoneId, type Neighborhood } from '@/data/neighborhoods';
import { zoneSolidColors, zoneTextColors } from '@/lib/zone-theme';

interface Props {
  onSelectNeighborhood: (n: Neighborhood) => void;
}

export default function DataOverview({ onSelectNeighborhood }: Props) {
  const [filter, setFilter] = useState<ZoneId | 'all'>('all');

  const filtered = filter === 'all' ? neighborhoods : neighborhoods.filter(n => n.zone === filter);

  return (
    <section className="py-16 md:py-24" id="data">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-gradient-gold mb-3">東京女性人設全覧</h2>
          <p className="text-muted-foreground">30个街区的完整对比索引</p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              filter === 'all' ? 'bg-primary text-primary-foreground border-transparent' : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            全部 ({neighborhoods.length})
          </button>
          {zones.map(z => (
            <button
              key={z.id}
              onClick={() => setFilter(z.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                filter === z.id
                  ? `${zoneSolidColors[z.id]} text-primary-foreground border-transparent`
                  : `border-border text-muted-foreground hover:${zoneTextColors[z.id]}`
              }`}
            >
              {z.name}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50">
                <th className="text-left p-3 text-muted-foreground font-medium">街区</th>
                <th className="text-left p-3 text-muted-foreground font-medium">人设</th>
                <th className="text-left p-3 text-muted-foreground font-medium hidden md:table-cell">穿搭</th>
                <th className="text-left p-3 text-muted-foreground font-medium hidden md:table-cell">关键词</th>
                <th className="text-left p-3 text-muted-foreground font-medium hidden lg:table-cell">恋爱</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((n, i) => (
                <motion.tr
                  key={n.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-t border-border hover:bg-secondary/30 cursor-pointer transition-colors"
                  onClick={() => onSelectNeighborhood(n)}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${zoneSolidColors[n.zone]}`} />
                      <span className="font-medium text-foreground">{n.name}</span>
                    </div>
                  </td>
                  <td className={`p-3 font-medium ${zoneTextColors[n.zone]}`}>{n.persona}</td>
                  <td className="p-3 text-muted-foreground hidden md:table-cell max-w-[200px] truncate">{n.fashion}</td>
                  <td className="p-3 text-muted-foreground hidden md:table-cell max-w-[200px] truncate">{n.lifestyle}</td>
                  <td className="p-3 text-muted-foreground hidden lg:table-cell max-w-[200px] truncate">{n.romance}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
