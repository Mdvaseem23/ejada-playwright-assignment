# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\books-api.spec.ts >> Simple Books API Tests >> GET Books
- Location: tests\api\books-api.spec.ts:59:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 401
```

# Test source

```ts
  1   | import { test, expect, request, APIRequestContext } from '@playwright/test';
  2   | 
  3   | test.describe('Simple Books API Tests', () => {
  4   | 
  5   |   let apiContext: APIRequestContext;
  6   |   let token: string;
  7   |   let orderId: string;
  8   | 
  9   |   test.beforeAll(async () => {
  10  | 
  11  |     apiContext = await request.newContext();
  12  | 
  13  |     // Register API Client
  14  |     const registerResponse = await apiContext.post(
  15  |       'https://simple-books-api.glitch.me/api-clients/',
  16  |       {
  17  |         data: {
  18  |           clientName: 'Mohamed',
  19  |           clientEmail: `mohamed${Date.now()}@mail.com`
  20  |         }
  21  |       }
  22  |     );
  23  | 
  24  |     expect(registerResponse.status()).toBe(201);
  25  | 
  26  |     const registerBody = await registerResponse.json();
  27  |     token = registerBody.accessToken;
  28  | 
  29  |     expect(token).toBeTruthy();
  30  |     console.log('Access Token:', token);
  31  | 
  32  |     // Create Order (shared for Update and Delete tests)
  33  |     const createOrderResponse = await apiContext.post(
  34  |       'https://simple-books-api.glitch.me/orders',
  35  |       {
  36  |         headers: {
  37  |           Authorization: `Bearer ${token}`
  38  |         },
  39  |         data: {
  40  |           bookId: 1,
  41  |           customerName: 'Mohamed Vaseem'
  42  |         }
  43  |       }
  44  |     );
  45  | 
> 46  |     expect(createOrderResponse.status()).toBe(201);
      |                                          ^ Error: expect(received).toBe(expected) // Object.is equality
  47  | 
  48  |     const createOrderBody = await createOrderResponse.json();
  49  |     orderId = createOrderBody.orderId;
  50  | 
  51  |     expect(orderId).toBeTruthy();
  52  |     console.log('Order ID:', orderId);
  53  |   });
  54  | 
  55  |   test.afterAll(async () => {
  56  |     await apiContext.dispose();
  57  |   });
  58  | 
  59  |   test('GET Books', async () => {
  60  | 
  61  |     const response = await apiContext.get(
  62  |       'https://simple-books-api.glitch.me/books'
  63  |     );
  64  | 
  65  |     expect(response.status()).toBe(200);
  66  | 
  67  |     const responseBody = await response.json();
  68  | 
  69  |     console.log(responseBody);
  70  | 
  71  |     expect(responseBody.length).toBeGreaterThan(0);
  72  |   });
  73  | 
  74  |   test('Create Order', async () => {
  75  | 
  76  |     const createOrderResponse = await apiContext.post(
  77  |       'https://simple-books-api.glitch.me/orders',
  78  |       {
  79  |         headers: {
  80  |           Authorization: `Bearer ${token}`
  81  |         },
  82  |         data: {
  83  |           bookId: 2,
  84  |           customerName: 'Mohamed Vaseem'
  85  |         }
  86  |       }
  87  |     );
  88  | 
  89  |     expect(createOrderResponse.status()).toBe(201);
  90  | 
  91  |     const createOrderBody = await createOrderResponse.json();
  92  | 
  93  |     expect(createOrderBody.orderId).toBeTruthy();
  94  |     console.log('Created Order ID:', createOrderBody.orderId);
  95  |   });
  96  | 
  97  |   test('Update Order', async () => {
  98  | 
  99  |     const updateResponse = await apiContext.patch(
  100 |       `https://simple-books-api.glitch.me/orders/${orderId}`,
  101 |       {
  102 |         headers: {
  103 |           Authorization: `Bearer ${token}`
  104 |         },
  105 |         data: {
  106 |           customerName: 'Updated Mohamed'
  107 |         }
  108 |       }
  109 |     );
  110 | 
  111 |     expect(updateResponse.status()).toBe(204);
  112 |     console.log('Order Updated Successfully');
  113 |   });
  114 | 
  115 |   test('Delete Order', async () => {
  116 | 
  117 |     const deleteResponse = await apiContext.delete(
  118 |       `https://simple-books-api.glitch.me/orders/${orderId}`,
  119 |       {
  120 |         headers: {
  121 |           Authorization: `Bearer ${token}`
  122 |         }
  123 |       }
  124 |     );
  125 | 
  126 |     expect(deleteResponse.status()).toBe(204);
  127 |     console.log('Order Deleted Successfully');
  128 |   });
  129 | 
  130 | });
```