export default {
  async fetch(request: Request, env: any, ctx: any) {
    // Обработка API запросов
    if (request.url.includes('/api/models')) {
      const response = await fetch('https://bngprm.com/api/v2/models-online?c=824519&client_ip=0.0.0.0&limit=0&gender=female&online=1&sort=members_count&order=desc', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://bngprm.com/',
          'Origin': 'https://bngprm.com',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
          'Sec-Ch-Ua-Mobile': '?0',
          'Sec-Ch-Ua-Platform': '"Windows"',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin'
        }
      });

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Обслуживание статических файлов
    try {
      const url = new URL(request.url);
      const response = await env.ASSETS.fetch(url);
      return response;
    } catch {
      return new Response('Not Found', { status: 404 });
    }
  }
}; 