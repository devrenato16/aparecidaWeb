import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  buttons?: React.ReactNode;
  overlay?: boolean;
}

const Hero = ({
  title,
  subtitle,
  backgroundImage = "https://images.pexels.com/photos/2351722/pexels-photo-2351722.jpeg",
  buttons,
  overlay = true,
}: HeroProps) => {
  return (
    <section
      className="relative h-screen min-h-[600px] flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {overlay && <div className="absolute inset-0 bg-primary-900/70"></div>}

      <div className="container-custom relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        {buttons && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {buttons}
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.8 },
            y: { repeat: Infinity, duration: 1.5 },
          }}
          className="text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
