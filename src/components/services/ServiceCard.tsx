
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  iconClassName?: string;
  delay?: number;
}

export default function ServiceCard({
  title,
  description,
  icon,
  className,
  iconClassName,
  delay = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700",
        "hover:shadow-lg transition-all duration-300 h-full flex flex-col",
        className
      )}
    >
      <div className={cn(
        "w-14 h-14 flex items-center justify-center rounded-lg mb-4",
        "bg-primary/10 text-primary dark:bg-primary/20",
        iconClassName
      )}>
        {icon}
      </div>
      <h3 className="font-serif text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm flex-grow">{description}</p>
    </motion.div>
  );
}
