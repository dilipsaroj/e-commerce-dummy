const BASE_URL = 'https://fakestoreapi.com';

export const fetchJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
};
