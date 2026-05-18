import { test, request } from '@playwright/test';

test('Create Order', async () => {

  const apiContext = await request.newContext();

  // AUTH
  const authResponse = await apiContext.post(
    'https://simple-books-api.glitch.me/api-clients/',
    {
      data: {
        clientName: 'vaseem',
        clientEmail: 'vaseem@gmail.com'
      }
    }
  );

  const authBody = await authResponse.json();

  console.log('AUTH BODY =>', authBody);

  const token = authBody.accessToken;

 // ORDER
  const orderResponse = await apiContext.post(
    'https://simple-books-api.glitch.me/orders',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      data: {
        bookId: 1,
        customerName: 'John'
      }
    }
  );

});