import { test, request } from '@playwright/test';

test('Create Order', async () => {

  const apiContext = await request.newContext();

  // AUTH
  const authResponse = await apiContext.post(
    'https://simple-books-api.glitch.me/api-clients/',
    {
      data: {
        clientName: 'Test',
        clientEmail: `test${Date.now()}@gmail.com`
      }
    }
  );

  const authBody = await authResponse.json();

  console.log('AUTH BODY =>', authBody);

  const token = authBody.accessToken;

  console.log('TOKEN =>', token);

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

  console.log('STATUS =>', orderResponse.status());

  console.log('RESPONSE =>', await orderResponse.text());

});