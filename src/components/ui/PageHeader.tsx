
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string | ReactNode;
  children?: ReactNode;
  backgroundImage?: string;
  className?: string;
  contentClassName?: string;
}

export default function PageHeader({
  title,
  description,
  children,
  backgroundImage,
  className,
  contentClassName,
}: PageHeaderProps) {
  return (
    <div 
      className={cn(
        "relative py-16 md:py-24 overflow-hidden",
        className
      )}
    >
      {/* Background Image with Overlay */}
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-black/50 z-0" />
        </>
      )}

      {/* Content */}
      <div className={cn(
        "container mx-auto px-4 relative z-10",
        backgroundImage ? "text-white" : "",
        contentClassName
      )}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl md:text-5xl font-bold mb-4"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={cn(
                "text-lg md:text-xl",
                backgroundImage ? "text-white/80" : "text-muted-foreground"
              )}
            >
              {description}
            </motion.div>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
