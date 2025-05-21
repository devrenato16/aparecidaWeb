import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionTitleProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  center?: boolean;
  className?: string;
  lineColor?: "primary" | "secondary" | "white";
}

const SectionTitle = ({
  title,
  subtitle,
  center = false,
  className = "",
  lineColor = "secondary",
}: SectionTitleProps) => {
  const lineColorClass = {
    primary: "bg-primary-700",
    secondary: "bg-secondary",
    white: "bg-white",
  }[lineColor];

  return (
    <div className={`mb-10 ${center ? "text-center" : ""} ${className}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-serif font-bold mb-3"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: center ? 80 : 100 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className={`h-1 ${lineColorClass} rounded ${center ? "mx-auto" : ""}`}
      />

      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-4 text-gray-600 max-w-3xl"
        >
          {subtitle}
        </motion.div>
      )}
    </div>
  );
};

export default SectionTitle;
