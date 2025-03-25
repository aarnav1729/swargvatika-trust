
import { ReactNode, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 0.6,
  once = true,
  className = '',
}: ScrollRevealProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  });

  // Set direction based offset
  const getOffsetByDirection = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      case 'none':
        return {};
      default:
        return { y: distance };
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration, delay, ease: 'easeOut' }}
      variants={{
        visible: { opacity: 1, ...getOffsetByDirection(), x: 0, y: 0 },
        hidden: { 
          opacity: 0, 
          ...getOffsetByDirection()
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
