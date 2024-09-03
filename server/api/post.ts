import type { IPost } from '@/shared/types/Post'; 

export default defineEventHandler(async (event): Promise<IPost[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data;
});