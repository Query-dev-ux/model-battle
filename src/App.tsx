import { useState } from 'react';
import type { Model } from './types/model';
import { useModels } from './hooks/useModels';
import { ModelBattle } from './components/ModelBattle';
import { WinnerDisplay } from './components/WinnerDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { COLORS } from './constants/styles';

function App() {
  const { models, isLoading, error } = useModels();
  const [winner, setWinner] = useState<Model | null>(null);

  const handleWinnerSelected = (selectedWinner: Model) => {
    setWinner(selectedWinner);
  };

  const handleRestart = () => {
    setWinner(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorDisplay
        title="Error loading models"
        message="Please try again later or check your connection"
        icon="⚠️"
      />
    );
  }

  if (!models || models.length < 2) {
    return (
      <ErrorDisplay
        title="Not enough models online"
        message="Please try again in a few minutes"
        icon="😢"
        buttonText="Refresh"
      />
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      {winner ? (
        <WinnerDisplay winner={winner} onRestart={handleRestart} />
      ) : (
        <ModelBattle 
          models={models} 
          onWinnerSelected={handleWinnerSelected} 
        />
      )}
    </div>
  );
}

export default App;
