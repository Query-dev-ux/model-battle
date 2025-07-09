import { motion } from 'framer-motion';
import type { Model } from '../types/model';
import { COLORS } from '../constants/styles';

interface ModelCardProps {
  model: Model;
  onClick: () => void;
}

export function ModelCard({ model, onClick }: ModelCardProps) {
  return (
    <div className="relative group">
      {/* Градиентное свечение */}
      <div className="absolute -inset-4 bg-gradient-to-r from-pink-600 via-[#8B1538] to-orange-500 rounded-[32px] blur-xl group-hover:blur-2xl transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#8B1538] group-hover:via-pink-600 group-hover:to-orange-500 opacity-75 group-hover:opacity-100" />
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-[140px] h-[180px] sm:w-[180px] sm:h-[240px] md:w-[320px] md:h-[240px] rounded-2xl overflow-hidden cursor-pointer bg-[#8B1538]"
        onClick={onClick}
      >
        <img
          src={model.profile_images.thumbnail_image_big}
          alt={model.display_name}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4">
          <div className="flex items-center gap-2">
            {model.is_online && (
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full animate-pulse" style={{ backgroundColor: COLORS.primary }} />
            )}
            <h3 className="text-sm sm:text-lg md:text-xl font-bold text-white truncate">
              {model.display_name}
            </h3>
          </div>
          <div className="flex items-center gap-2 md:gap-4 mt-1 md:mt-2">
            <span className="text-xs md:text-sm text-white/80">
              {model.display_age} y.o.
            </span>
            <span className="text-xs md:text-sm text-white/80">
              {model.members_count.toLocaleString()} followers
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 