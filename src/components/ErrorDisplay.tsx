import { motion } from 'framer-motion';

interface ErrorDisplayProps {
  title: string;
  message: string;
  icon?: string;
  buttonText?: string;
  onRetry?: () => void;
}

export function ErrorDisplay({ 
  title, 
  message, 
  icon = '⚠️',
  buttonText = 'Retry',
  onRetry = () => window.location.reload()
}: ErrorDisplayProps) {
  return (
    <div className="min-h-screen bg-[#8B1538] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <div className="text-yellow-500 text-6xl mb-4">{icon}</div>
          <div className="text-white text-xl mb-4">
            {title}
          </div>
          <p className="text-pink-200 mb-8">
            {message}
          </p>
          <button 
            onClick={onRetry}
            className="bg-[#00C88C] hover:bg-[#00B77D] text-white font-bold py-3 px-8 rounded-full transition-colors"
          >
            {buttonText}
          </button>
        </motion.div>
      </div>
    </div>
  );
} 