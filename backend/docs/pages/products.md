# Products

Product routes are mounted under `/api/v1`.

## GET `/api/v1/product`

Fetch a paginated product list with optional filtering.

**Auth required:** No

### Query parameters

| Param | Type | Required | Notes |
| --- | --- | --- | --- |
| `category` | string | No | Filter by product category |
| `price` | number | No | Maximum price filter |
| `page` | number | No | Page index used by backend pagination |
| `sort` | string | No | `asc` for ascending price, anything else sorts descending |

### Example request

```text
GET /api/v1/product?page=0&category=indoor&price=999&sort=asc
```

### Success response

Status: `200 OK`

```json
{
  "getitem": [
    {
      "_id": "60d0fe4f5e3a6b001c8e3b1a",
      "name": "Example Product",
      "price": 99.99,
      "category": "indoor",
      "image": "http://example.com/image.jpg"
    }
  ],
  "length": 1
}
```

## GET `/api/v1/:productId`

Fetch a single product by id.

**Auth required:** No

### Path parameters

| Param | Type | Required |
| --- | --- | --- |
| `productId` | string | Yes |

### Example request

```text
GET /api/v1/683f2d0c8d107c4aa12dcdd0
```

### Success response

Status: `200 OK`

```json
{
  "_id": "60d0fe4f5e3a6b001c8e3b1a",
  "name": "Example Product",
  "price": 99.99,
  "category": "indoor",
  "image": "http://example.com/image.jpg"
}
```

### Error responses

- `404 Not Found`
- `500 Internal Server Error`
