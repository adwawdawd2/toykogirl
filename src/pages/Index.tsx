import { useState } from 'react';
import { type Neighborhood, type ZoneId } from '@/data/neighborhoods';
import HeroSection from '@/components/HeroSection';
import Navigation from '@/components/Navigation';
import TokyoMap from '@/components/TokyoMap';
import NeighborhoodCard from '@/components/NeighborhoodCard';
import DataOverview from '@/components/DataOverview';
import ArticleSection from '@/components/ArticleSection';
import SocialShare from '@/components/SocialShare';

const Index = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);
  const [activeZone, setActiveZone] = useState<ZoneId | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground bg-noise">
      <Navigation />

      <HeroSection />

      {/* Map Section */}
      <section className="py-16 md:py-24" id="map-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-gradient-gold mb-3">互动街区地図</h2>
            <p className="text-muted-foreground text-sm">点击街区查看详细人设 · 按分类筛选</p>
          </div>
          <TokyoMap
            onSelectNeighborhood={setSelectedNeighborhood}
            activeZone={activeZone}
            onSetActiveZone={setActiveZone}
          />
        </div>
      </section>

      <DataOverview onSelectNeighborhood={setSelectedNeighborhood} />

      <ArticleSection />

      <SocialShare />

      {/* Neighborhood detail modal */}
      {selectedNeighborhood && (
        <NeighborhoodCard
          neighborhood={selectedNeighborhood}
          onClose={() => setSelectedNeighborhood(null)}
          onNavigate={setSelectedNeighborhood}
        />
      )}
    </div>
  );
};

export default Index;
