import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { STATS } from '../constants/data';

interface CounterProps {
  target: number;
  suffix: string;
}

function Counter({ target, suffix }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // East out cubic curve
      const eased = 1 - Math.pow(1 - progress, 3);
      
      const currentVal = Math.floor(eased * target);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-dark tabular-nums">
      {count}
      <span className="text-accent ml-0.5">{suffix}</span>
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section id="stats-counter" className="py-20 lg:py-28 bg-surface border-b border-border-beige relative overflow-hidden">
      {/* Decorative vertical divider stripes */}
      <div className="absolute inset-0 grid grid-cols-2 lg:grid-cols-4 pointer-events-none opacity-20">
        <div className="border-r border-border-beige h-full" />
        <div className="border-r border-border-beige h-full hidden lg:block" />
        <div className="border-r border-border-beige h-full hidden lg:block" />
        <div className="h-full" />
      </div>

      <div className="w-full px-[20px] relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-12 divide-y-0 divide-x-0 lg:divide-x divide-border-beige">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`flex flex-col justify-between h-full pt-2 ${
                idx > 0 ? 'lg:pl-8' : ''
              }`}
            >
              <div className="mb-4">
                <Counter target={stat.count} suffix={stat.suffix} />
              </div>
              
              <div className="space-y-2 mt-auto">
                <h4 className="font-sans text-xs sm:text-sm font-semibold tracking-widest text-dark uppercase">
                  {stat.label}
                </h4>
                <p className="text-xs text-muted-gray leading-relaxed font-light font-sans max-w-[200px]">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
