import useSWR from 'swr';
import type { Model } from '../types/model';

interface ApiResponse {
  models: Model[];
  online_models: number;
  random_chat_url: string;
  popular_chat_url: string;
}

const TOP_MODELS_COUNT = 10;

const fetcher = async (url: string): Promise<Model[]> => {
  try {
    console.log('Fetching models...');
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      throw new Error(`Failed to fetch models: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    console.log('API Response:', data);
    
    if (!data.models || !Array.isArray(data.models)) {
      console.error('Invalid API response:', data);
      throw new Error('Invalid API response format - no models array');
    }

    // Фильтруем модели
    const validModels = data.models.filter((model: Model) => {
      const hasImage = Boolean(model.profile_images?.thumbnail_image_big);
      const hasName = Boolean(model.display_name);
      const isOnline = model.is_online !== false;
      const isFemale = model.gender === 'female';
      
      if (!isFemale) {
        console.log(`Skipping model ${model.display_name} - not female (gender: ${model.gender})`);
      }
      
      return hasImage && hasName && isOnline && isFemale;
    });

    // Сортируем по количеству зрителей и берем топ-10
    const topModels = validModels
      .sort((a: Model, b: Model) => b.members_count - a.members_count)
      .slice(0, TOP_MODELS_COUNT);

    console.log(`Selected ${topModels.length} top female models out of ${validModels.length} valid models`);
    console.log('Top models:', topModels.map(m => ({ 
      name: m.display_name, 
      viewers: m.members_count,
      gender: m.gender
    })));

    return topModels;
  } catch (error) {
    console.error('Fetcher error:', error);
    throw error;
  }
};

export function useModels() {
  const { data, error, isLoading } = useSWR<Model[]>('/api/models', fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: false,
    dedupingInterval: 5000
  });

  return {
    models: data,
    isLoading,
    error
  };
} 