import { motion } from 'framer-motion';
import type { Model } from '../types/model';
import { COLORS, BUTTON_STYLES } from '../constants/styles';

interface WinnerDisplayProps {
  winner: Model;
  onRestart: () => void;
}

export function WinnerDisplay({ winner, onRestart }: WinnerDisplayProps) {
  const handleWatchStream = () => {
    window.open(`https://bngprm.com/${winner.username}`, '_blank');
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-12 px-4" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="mb-6"
        >
          <div className="text-6xl mb-3">👑</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
            Winner!
          </h1>
          <p className="text-xl md:text-2xl font-bold mb-6" style={{ color: COLORS.accent }}>
            {winner.display_name} is the champion
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative w-[320px] h-[240px] md:w-[480px] md:h-[360px] mx-auto mb-6 rounded-2xl overflow-hidden"
        >
          <img
            src={winner.profile_images.thumbnail_image_big}
            alt={winner.display_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.primary }} />
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {winner.display_name}
              </h3>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-4">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={handleWatchStream}
            className={BUTTON_STYLES.primary}
          >
            Watch the stream
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            onClick={onRestart}
            className={BUTTON_STYLES.secondary}
          >
            Start New Battle
          </motion.button>
        </div>
      </div>
    </div>
  );
} 