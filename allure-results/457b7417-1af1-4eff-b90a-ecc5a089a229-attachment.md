# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\books-api.spec.ts >> Simple Books API Tests >> Update Order
- Location: tests\api\books-api.spec.ts:74:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 204
Received: 401
```

# Test source

```ts
  26  | 
  27  |     const apiContext = await request.newContext();
  28  | 
  29  |     // Register API Client
  30  |     const registerResponse = await apiContext.post(
  31  |       'https://simple-books-api.glitch.me/api-clients/',
  32  |       {
  33  |         data: {
  34  |           clientName: 'Mohamed',
  35  |           clientEmail: `mohamed${Date.now()}@mail.com`
  36  |         }
  37  |       }
  38  |     );
  39  | 
  40  |     expect(registerResponse.status()).toBe(201);
  41  | 
  42  |     const registerBody = await registerResponse.json();
  43  | 
  44  |     token = registerBody.accessToken;
  45  | 
  46  |     console.log('Access Token:', token);
  47  | 
  48  |     // Create Order
  49  |     const createOrderResponse = await apiContext.post(
  50  |       'https://simple-books-api.glitch.me/orders',
  51  |       {
  52  |         headers: {
  53  |           Authorization: `Bearer ${token}`
  54  |         },
  55  | 
  56  |         data: {
  57  |           bookId: 1,
  58  |           customerName: 'Mohamed Vaseem'
  59  |         }
  60  |       }
  61  |     );
  62  | 
  63  |     expect(createOrderResponse.status()).toBe(201);
  64  | 
  65  |     const createOrderBody = await createOrderResponse.json();
  66  | 
  67  |     orderId = createOrderBody.orderId;
  68  | 
  69  |     console.log('Order ID:', orderId);
  70  | 
  71  |     expect(orderId).toBeTruthy();
  72  |   });
  73  | 
  74  |   test('Update Order', async () => {
  75  | 
  76  |     const apiContext = await request.newContext();
  77  | 
  78  |     // Register Client Again
  79  |     const registerResponse = await apiContext.post(
  80  |       'https://simple-books-api.glitch.me/api-clients/',
  81  |       {
  82  |         data: {
  83  |           clientName: 'Mohamed',
  84  |           clientEmail: `mohamed${Date.now()}@mail.com`
  85  |         }
  86  |       }
  87  |     );
  88  | 
  89  |     const registerBody = await registerResponse.json();
  90  | 
  91  |     const accessToken = registerBody.accessToken;
  92  | 
  93  |     // Create Order
  94  |     const createOrderResponse = await apiContext.post(
  95  |       'https://simple-books-api.glitch.me/orders',
  96  |       {
  97  |         headers: {
  98  |           Authorization: `Bearer ${accessToken}`
  99  |         },
  100 | 
  101 |         data: {
  102 |           bookId: 1,
  103 |           customerName: 'Mohamed'
  104 |         }
  105 |       }
  106 |     );
  107 | 
  108 |     const createOrderBody = await createOrderResponse.json();
  109 | 
  110 |     const createdOrderId = createOrderBody.orderId;
  111 | 
  112 |     // PATCH Order
  113 |     const updateResponse = await apiContext.patch(
  114 |       `https://simple-books-api.glitch.me/orders/${createdOrderId}`,
  115 |       {
  116 |         headers: {
  117 |           Authorization: `Bearer ${accessToken}`
  118 |         },
  119 | 
  120 |         data: {
  121 |           customerName: 'Updated Mohamed'
  122 |         }
  123 |       }
  124 |     );
  125 | 
> 126 |     expect(updateResponse.status()).toBe(204);
      |                                     ^ Error: expect(received).toBe(expected) // Object.is equality
  127 | 
  128 |     console.log('Order Updated Successfully');
  129 |   });
  130 | 
  131 |   test('Delete Order', async () => {
  132 | 
  133 |     const apiContext = await request.newContext();
  134 | 
  135 |     // Register Client
  136 |     const registerResponse = await apiContext.post(
  137 |       'https://simple-books-api.glitch.me/api-clients/',
  138 |       {
  139 |         data: {
  140 |           clientName: 'Mohamed',
  141 |           clientEmail: `mohamed${Date.now()}@mail.com`
  142 |         }
  143 |       }
  144 |     );
  145 | 
  146 |     const registerBody = await registerResponse.json();
  147 | 
  148 |     const accessToken = registerBody.accessToken;
  149 | 
  150 |     // Create Order
  151 |     const createOrderResponse = await apiContext.post(
  152 |       'https://simple-books-api.glitch.me/orders',
  153 |       {
  154 |         headers: {
  155 |           Authorization: `Bearer ${accessToken}`
  156 |         },
  157 | 
  158 |         data: {
  159 |           bookId: 1,
  160 |           customerName: 'Mohamed'
  161 |         }
  162 |       }
  163 |     );
  164 | 
  165 |     const createOrderBody = await createOrderResponse.json();
  166 | 
  167 |     const createdOrderId = createOrderBody.orderId;
  168 | 
  169 |     // Delete Order
  170 |     const deleteResponse = await apiContext.delete(
  171 |       `https://simple-books-api.glitch.me/orders/${createdOrderId}`,
  172 |       {
  173 |         headers: {
  174 |           Authorization: `Bearer ${accessToken}`
  175 |         }
  176 |       }
  177 |     );
  178 | 
  179 |     expect(deleteResponse.status()).toBe(204);
  180 | 
  181 |     console.log('Order Deleted Successfully');
  182 |   });
  183 | 
  184 | });
  185 | 
```