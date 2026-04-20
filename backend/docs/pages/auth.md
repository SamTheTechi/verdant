# Authentication

Authentication endpoints are mounted under `/api/v1/auth`.

## POST `/api/v1/auth/signup`

Create a new user account and set login cookies.

**Auth required:** No

### Request body

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | string | Yes | Display name for the new account |
| `email` | string | Yes | Must be a valid email |
| `password` | string | Yes | Plain-text password before hashing |

### Example request

```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

### Success response

Status: `201 Created`

```json
{
  "message": "user created"
}
```

### Error responses

- `400 Bad Request`
- `500 Internal Server Error`

## POST `/api/v1/auth/login`

Authenticate a user and set `access_token` and `refresh_token` cookies.

**Auth required:** No

### Request body

| Field | Type | Required |
| --- | --- | --- |
| `email` | string | Yes |
| `password` | string | Yes |

### Example request

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Success response

Status: `201 Created`

```json
{
  "message": "login successful"
}
```

### Error responses

- `200 OK` with `{"message":"user not found"}` when the user does not exist
- `401 Unauthorized`
- `400 Bad Request`
- `500 Internal Server Error`

## GET `/api/v1/auth/logout`

Log out the current user and clear auth cookies.

**Auth required:** No explicit middleware, but meaningful only when cookies exist.

### Success response

Status: `200 OK`

```json
{
  "message": "logout successful"
}
```

### Error responses

- `500 Internal Server Error`

## GET `/api/v1/auth/islogin`

Check whether an access token cookie is present.

**Auth required:** No

### Success response

Status: `200 OK`

```json
{
  "value": true
}
```

or

```json
{
  "value": false
}
```

### Error responses

- `500 Internal Server Error`

## POST `/api/v1/auth/refreshtoken`

Create a new access token using the refresh token cookie.

**Auth required:** Refresh token cookie

### Success response

Status: `200 OK`

Sets a fresh `access_token` cookie.

### Error responses

- `400 Bad Request`
- `500 Internal Server Error`

## DELETE `/api/v1/auth/delete`

Delete the authenticated user account.

**Auth required:** Yes

### Request body

| Field | Type | Required |
| --- | --- | --- |
| `password` | string | Yes |

### Example request

```json
{
  "password": "password123"
}
```

### Success response

Status: `200 OK`

```json
{
  "message": "user deleted"
}
```

### Error responses

- `404 Not Found`
- `500 Internal Server Error`
