import axios from 'axios';

const API_TYPES = {
  WEB: 'web',
  VIDEO: 'video',
};

const BASE_URLS = {
  [API_TYPES.WEB]: process.env.REACT_APP_BACKEND_API || 'http://localhost:3003',
  [API_TYPES.VIDEO]: process.env.REACT_APP_VIDEO_PROCESSOR_SERVICE_URL || 'http://localhost:3002',
};


export async function apiGet(apiType = API_TYPES.WEB, endpoint = '/', options = {}) {

  if (!endpoint.startsWith('/')) {
    endpoint = `/${endpoint}`;
  }

  const base = BASE_URLS[apiType].replace(/\/+$/, '');
  const url = `${base}${endpoint}`;

  try {
    const response = await axios.get(url, {
      headers: { Accept: 'application/json' },
      timeout: 30000,  // 30 seconds
      ...options,
    });
    return response.data;
  } catch (error) {
    const status = error.response?.status || 'Network Error';
    const statusText = error.response?.statusText || 'No response from server';
    const data = error.response?.data
      ? JSON.stringify(error.response.data, null, 2).slice(0, 500) // Increased limit, formatted
      : 'No response data';

    throw new Error(`HTTP ${status} ${statusText}: ${data}`);
  }
}

export { API_TYPES }; 