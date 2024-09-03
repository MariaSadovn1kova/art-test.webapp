import type { ICreatePost } from '@/shared/types/Post'; 

export default defineEventHandler(async (event):Promise<void> => {
  if (event.node.req.method === 'POST') {
    const body = await readBody(event);

    if (!body || !body.title || !body.body || !body.userId) {
      throw createError({ statusCode: 400, statusMessage: 'Title, body, and userID are required' });
    }

    const newPost: ICreatePost = {
      title: body.title,
      body: body.body,
      userId: body.userId,
    };

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newPost), 
    });
  }
});