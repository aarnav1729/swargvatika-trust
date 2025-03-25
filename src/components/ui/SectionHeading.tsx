
import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string | ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
}

const SectionHeading: FC<SectionHeadingProps> = ({
  title,
  subtitle,
  description,
  align = 'center',
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={cn('mb-12 max-w-3xl', alignmentClasses[align], className)}>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p 
            className={cn(
              "uppercase tracking-wider text-sm font-medium mb-2 inline-block px-3 py-1 rounded-full",
              "bg-primary/10 text-primary dark:bg-primary/20",
              subtitleClassName
            )}
          >
            {subtitle}
          </p>
        </motion.div>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className={cn(
          "font-serif text-3xl md:text-4xl font-bold leading-tight", 
          titleClassName
        )}
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className={cn(
            "mt-4 text-muted-foreground text-lg",
            descriptionClassName
          )}
        >
          {description}
        </motion.div>
      )}
    </div>
  );
};

export default SectionHeading;
