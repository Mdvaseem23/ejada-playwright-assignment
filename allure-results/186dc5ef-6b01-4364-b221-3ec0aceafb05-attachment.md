# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\books-api.spec.ts >> Create Order
- Location: tests\api\books-api.spec.ts:3:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 401
```

# Test source

```ts
  1  | import { test, expect, request } from '@playwright/test';
  2  | 
  3  | test('Create Order', async () => {
  4  | 
  5  |   const apiContext = await request.newContext();
  6  | 
  7  |   // Generate Token
  8  |   const authResponse = await apiContext.post(
  9  |     'https://simple-books-api.glitch.me/api-clients/',
  10 |     {
  11 |       data: {
  12 |         clientName: 'Vaseem',
  13 |         clientEmail: `vaseem${Date.now()}@gmail.com`
  14 |       }
  15 |     }
  16 |   );
  17 | 
  18 |   expect(authResponse.status()).toBe(201);
  19 | 
  20 |   const authBody = await authResponse.json();
  21 | 
  22 |   const token: string = authBody.accessToken;
  23 | 
  24 |   console.log(token);
  25 | 
  26 |   // Create Order
  27 |   const createOrder = await apiContext.post(
  28 |     'https://simple-books-api.glitch.me/orders',
  29 |     {
  30 |       headers: {
  31 |         Authorization: `Bearer ${token}`
  32 |       },
  33 |       data: {
  34 |         bookId: 1,
  35 |         customerName: 'Vaseem'
  36 |       }
  37 |     }
  38 |   );
  39 | 
> 40 |   expect(createOrder.status()).toBe(201);
     |                                ^ Error: expect(received).toBe(expected) // Object.is equality
  41 | 
  42 |   const orderBody = await createOrder.json();
  43 | 
  44 |   console.log(orderBody);
  45 | 
  46 | });
```