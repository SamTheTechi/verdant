# Verdant API Docs

This site documents the Verdant Market backend that powers authentication, product browsing, cart management, checkout, and metrics export.

## Base URL

Use the same origin as the deployed backend:

```text
https://your-backend-host
```

All endpoints in this reference are relative to that origin.

## Authentication Model

Verdant uses cookie-based authentication.

- `access_token` is set after login or signup and is used for authenticated API requests.
- `refresh_token` is set alongside the access token and is used to refresh sessions.
- Protected routes expect cookies to be sent with the request.

For browser clients, send requests with credentials enabled.

```js
axios.get('/api/v1/cart/item', { withCredentials: true });
```

## API Areas

- **Authentication**: create accounts, log in, log out, check session state, refresh access tokens, and delete accounts.
- **Products**: list products and fetch one product by id.
- **Cart**: add, list, remove, and clear cart items.
- **Checkout**: create Razorpay orders and verify payments.
- **Metrics**: expose Prometheus-compatible runtime metrics.

## Reference Pages

- [Authentication](auth.md)
- [Products](products.md)
- [Cart](cart.md)
- [Checkout](checkout.md)
- [Metrics](metrics.md)

## Response Conventions

The API does not use a single universal response envelope. Most successful write actions return a JSON object with a `message` field, while list/detail endpoints return arrays or objects directly.

Common error payload pattern:

```json
{
  "message": "server error"
}
```

Checkout verification may return:

```json
{
  "error": "Invalid signature"
}
```
