import { motion } from 'framer-motion';
import { articleSections, sectionImages } from '@/data/neighborhoods';
import AppImage from '@/components/AppImage';

export default function ArticleSection() {
  return (
    <section className="py-16 md:py-24" id="article">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-gradient-gold mb-3">深度研究報告</h2>
          <p className="text-muted-foreground">城市空间、社会阶层与身份策展</p>
        </motion.div>

        {articleSections.map((section, idx) => {
          const images = sectionImages[section.id] || [];
          return (
            <motion.article
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              {/* Section header */}
              <div className="mb-6">
                <p className="text-xs text-primary tracking-[0.2em] uppercase mb-1">{section.subtitle}</p>
                <h3 className="text-2xl md:text-3xl font-serif text-foreground">{section.title}</h3>
              </div>

              {/* Hero image for section */}
              {images[0] && (
                <div className="relative mb-8 rounded-xl overflow-hidden aspect-[2/1]">
                  <AppImage
                    src={images[0]}
                    alt={section.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={1200}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="space-y-4 text-foreground/85 leading-relaxed text-[15px]">
                {section.content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Highlight quote */}
              <blockquote className="my-8 pl-4 border-l-2 border-primary py-2">
                <p className="text-primary font-medium italic text-base">{section.highlight}</p>
              </blockquote>

              {/* Additional images */}
              {images.length > 1 && (
                <div className="grid grid-cols-2 gap-3 mt-8">
                  {images.slice(1).map((img, imgIdx) => (
                    <div key={imgIdx} className="rounded-lg overflow-hidden aspect-[3/2]">
                      <AppImage
                        src={img}
                        alt={`${section.title} ${imgIdx + 2}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        width={600}
                        height={400}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Divider */}
              {idx < articleSections.length - 1 && (
                <div className="mt-16 flex items-center justify-center gap-3">
                  <span className="w-12 h-px bg-border" />
                  <span className="text-primary text-lg">✦</span>
                  <span className="w-12 h-px bg-border" />
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
