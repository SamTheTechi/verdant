# Checkout

Checkout routes are mounted under `/api/v1/pay`.

All checkout endpoints require authenticated requests with cookies enabled.

## POST `/api/v1/pay/buyone`

Create a Razorpay order for a single product.

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
  "order_id": "order_abcdef123456",
  "amount": 10000
}
```

### Error responses

- `400 Bad Request`
- `404 Not Found`
- `500 Internal Server Error`

## GET `/api/v1/pay/checkout`

Create a Razorpay order for the current cart total.

### Success response

Status: `200 OK`

```json
{
  "order_id": "order_abcdef123456",
  "amount": 10000
}
```

### Error responses

- `400 Bad Request`
- `404 Not Found`
- `500 Internal Server Error`

## POST `/api/v1/pay/varify`

Verify the Razorpay payment signature returned by the checkout flow.

### Request body

| Field | Type | Required |
| --- | --- | --- |
| `razorpay_order_id` | string | Yes |
| `razorpay_payment_id` | string | Yes |
| `razorpay_signature` | string | Yes |

### Example request

```json
{
  "razorpay_order_id": "order_abcdef123456",
  "razorpay_payment_id": "pay_abcdef123456",
  "razorpay_signature": "9e4567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
}
```

### Success response

Status: `200 OK`

```json
{
  "success": true
}
```

### Error responses

- `400 Bad Request`
