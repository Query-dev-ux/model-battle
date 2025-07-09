import { motion } from 'framer-motion';
import { useState } from 'react';
import { ModelCard } from './ModelCard';
import type { Model } from '../types/model';
import { COLORS } from '../constants/styles';

interface ModelBattleProps {
  models: Model[];
  onWinnerSelected: (winner: Model) => void;
}

export function ModelBattle({ models, onWinnerSelected }: ModelBattleProps) {
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [leftModel, setLeftModel] = useState<Model>(models[0]);
  const [rightModel, setRightModel] = useState<Model>(models[1]);

  if (!models || models.length < 2) {
    return null;
  }

  const handleModelSelect = (selectedModel: Model) => {
    const nextRound = currentRound + 1;
    const isLastRound = nextRound >= models.length - 1;

    if (isLastRound) {
      onWinnerSelected(selectedModel);
      return;
    }

    const isLeftModel = selectedModel === leftModel;
    if (isLeftModel) {
      setRightModel(models[nextRound + 1]);
    } else {
      setLeftModel(rightModel);
      setRightModel(models[nextRound + 1]);
    }
    setCurrentRound(nextRound);
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center text-white mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          WebCam Model Battle
        </motion.h1>
        <motion.p 
          className="text-2xl md:text-3xl text-center font-bold mb-36"
          style={{ color: COLORS.accent }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Choose your favorite model
        </motion.p>

        <div className="relative">
          <div className="flex justify-center items-center gap-4 md:gap-8">
            <ModelCard model={leftModel} onClick={() => handleModelSelect(leftModel)} />
            <div className="text-4xl font-bold text-white">VS</div>
            <ModelCard model={rightModel} onClick={() => handleModelSelect(rightModel)} />
          </div>
          
          {/* Progress bar */}
          <div className="mt-28 w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: COLORS.primary }}
              initial={{ width: '0%' }}
              animate={{
                width: `${((currentRound + 1) / (models.length - 1)) * 100}%`
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 