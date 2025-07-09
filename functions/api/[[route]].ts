interface Env {
  // Добавьте переменные окружения, если они нужны
}

interface PagesFunction<E = unknown> {
  (context: {
    request: Request;
    env: E;
    params: { [key: string]: string };
  }): Promise<Response> | Response;
}

interface ApiModel {
  id: string;
  username: string;
  display_name: string;
  gender: string;
  members_count: number;
  is_online: boolean;
  profile_images: {
    thumbnail_image_big: string;
  };
  display_age?: string;
}

interface ApiResponse {
  models: ApiModel[];
  success: boolean;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const API_URL = 'https://bngprm.com/api/v2/models-online';
  const CLIENT_IP = context.request.headers.get('CF-Connecting-IP') || '0.0.0.0';

  try {
    const url = new URL(API_URL);
    url.searchParams.set('c', '824519');
    url.searchParams.set('client_ip', CLIENT_IP);
    url.searchParams.set('limit', '0');

    const response = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://bngprm.com/',
        'Origin': 'https://bngprm.com'
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const rawData = await response.json();
    
    if (!rawData.models || !Array.isArray(rawData.models)) {
      throw new Error('Invalid API response format');
    }

    // Преобразуем данные в нужный формат
    const formattedData = {
      success: true,
      models: rawData.models
        .filter(model => model.gender === 'female')
        .sort((a, b) => b.members_count - a.members_count)
        .slice(0, 10)
        .map(model => ({
          id: model.id || model.username,
          username: model.display_name || model.username,
          imageUrl: model.profile_images?.thumbnail_image_big || '',
          isOnline: model.is_online
        }))
    };

    // Проверяем, что у нас есть достаточно моделей
    if (formattedData.models.length < 2) {
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Not enough models available',
        models: [] 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response(JSON.stringify(formattedData), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, max-age=10',
      },
    });
  } catch (error) {
    console.error('Error fetching models:', error);
    
    return new Response(JSON.stringify({ 
      success: false,
      error: 'Failed to fetch models',
      models: [] 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}; 