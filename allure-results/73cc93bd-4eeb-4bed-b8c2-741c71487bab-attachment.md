# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\books-api.spec.ts >> Create and Delete Order
- Location: tests\api\books-api.spec.ts:18:5

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
  3  | test('GET Books', async () => {
  4  | 
  5  |   const api = await request.newContext();
  6  | 
  7  |   const response = await api.get(
  8  |     'https://simple-books-api.glitch.me/books'
  9  |   );
  10 | 
  11 |   expect(response.status()).toBe(200);
  12 | 
  13 |   const body = await response.json();
  14 | 
  15 |   expect(body.length).toBeGreaterThan(0);
  16 | });
  17 | 
  18 | test('Create and Delete Order', async () => {
  19 | 
  20 |   const api = await request.newContext();
  21 | 
  22 |   const register = await api.post(
  23 |     'https://simple-books-api.glitch.me/api-clients/',
  24 |     {
  25 |       data: {
  26 |         clientName: 'Mohamed',
  27 |         clientEmail: `test${Date.now()}@mail.com`
  28 |       }
  29 |     }
  30 |   );
  31 | 
  32 |   const registerBody = await register.json();
  33 |   const token = registerBody.accessToken;
  34 | 
  35 |   const createOrder = await api.post(
  36 |     'https://simple-books-api.glitch.me/orders',
  37 |     {
  38 |       headers: {
  39 |         Authorization: `Bearer ${token}`
  40 |       },
  41 |       data: {
  42 |         bookId: 1,
  43 |         customerName: 'Mohamed'
  44 |       }
  45 |     }
  46 |   );
  47 | 
> 48 |   expect(createOrder.status()).toBe(201);
     |                                ^ Error: expect(received).toBe(expected) // Object.is equality
  49 | 
  50 |   const orderBody = await createOrder.json();
  51 | 
  52 |   const deleteOrder = await api.delete(
  53 |     `https://simple-books-api.glitch.me/orders/${orderBody.orderId}`,
  54 |     {
  55 |       headers: {
  56 |         Authorization: `Bearer ${token}`
  57 |       }
  58 |     }
  59 |   );
  60 | 
  61 |   expect(deleteOrder.status()).toBe(204);
  62 | });
```