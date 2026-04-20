# Cart

Cart routes are mounted under `/api/v1/cart`.

All cart endpoints require authenticated requests with cookies enabled.

## GET `/api/v1/cart/item`

Return all items in the current user's cart.

**Auth required:** Yes

### Success response

Status: `200 OK`

```json
[
  {
    "_id": "60d0fe4f5e3a6b001c8e3b1a",
    "name": "Example Product",
    "image": "http://example.com/image.jpg",
    "price": 99.99,
    "count": 2
  }
]
```

### Error responses

- `404 Not Found`
- `500 Internal Server Error`

## POST `/api/v1/cart/additem`

Add an item to the cart or increase its quantity.

**Auth required:** Yes

### Request body

| Field | Type | Required |
| --- | --- | --- |
| `productId` | string | Yes |
| `count` | number | Yes |

### Example request

```json
{
  "productId": "60d5ecf4f7b3c2001c8c4d1a",
  "count": 1
}
```

### Success response

Status: `200 OK`

```json
{
  "message": "product added"
}
```

### Error responses

- `400 Bad Request`
- `404 Not Found`
- `500 Internal Server Error`

## PATCH `/api/v1/cart/clearitem`

Remove a specific product from the cart.

**Auth required:** Yes

### Request body

| Field | Type | Required |
| --- | --- | --- |
| `productId` | string | Yes |

### Example request

```json
{
  "productId": "60d5ecf4f7b3c2001c8c4d1a"
}
```

### Success response

Status: `200 OK`

```json
{
  "message": "item removed"
}
```

### Error responses

- `400 Bad Request`
- `404 Not Found`
- `500 Internal Server Error`

## DELETE `/api/v1/cart/clearcart`

Clear the authenticated user's cart completely.

**Auth required:** Yes

### Success response

Status: `200 OK`

```json
{
  "message": "cart empty"
}
```

### Error responses

- `400 Bad Request`
- `404 Not Found`
- `500 Internal Server Error`
