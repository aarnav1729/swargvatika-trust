
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  title: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  end,
  duration = 2,
  title,
  prefix = '',
  suffix = '',
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const countRef = useRef(false);

  // Handle the counter animation
  useEffect(() => {
    if (inView && !countRef.current) {
      countRef.current = true;
      let start = 0;
      const steps = Math.floor(duration * 60);
      const increment = end / steps;
      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        className="mb-2 font-serif"
      >
        <span className="text-3xl md:text-4xl font-bold">
          {prefix}
          {count}
          {suffix}
        </span>
      </motion.div>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-muted-foreground"
      >
        {title}
      </motion.p>
    </div>
  );
}
