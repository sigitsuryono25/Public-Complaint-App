# CivicSync API - Insomnia / Postman Guide 🚀

This guide provides the necessary details to test and interact with the CivicSync Backend API using **Insomnia Core** or **Postman**.

---

## 🛠️ Environment Setup

Create an environment in Insomnia with the following variables:

```json
{
  "base_url": "http://localhost:5001/api",
  "jwt_token": "YOUR_JWT_TOKEN_HERE"
}
```

> **Note**: For all protected routes, use the **Bearer Token** authentication method and set it to `{{ jwt_token }}`.

---

## 🔐 Authentication & Users

### 1. Register User
- **Method**: `POST`
- **URL**: `{{ base_url }}/users/register`
- **Body (JSON)**:
```json
{
  "name": "Jane Citizen",
  "email": "jane@example.com",
  "password": "password123",
  "role": "CITIZEN",
  "fcm_token": "token_placeholder"
}
```
- **Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "name": "Jane Citizen",
    "email": "jane@example.com",
    "role": "CITIZEN",
    "token": "eyJhbGci..."
  }
}
```

### 2. Login
- **Method**: `POST`
- **URL**: `{{ base_url }}/users/login`
- **Body (JSON)**:
```json
{
  "email": "admin@test.com",
  "password": "admin123"
}
```
- **Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "name": "Admin User",
    "email": "admin@test.com",
    "role": "ADMIN",
    "token": "eyJhbGci..."
  }
}
```
> ⚠️ The token is nested inside `data.token`. Copy the value and update your `jwt_token` environment variable.

### 3. Get All Users
- **Method**: `GET`
- **URL**: `{{ base_url }}/users`
- **Auth**: `Bearer {{ jwt_token }}`
- **Response (200)**:
```json
{
  "success": true,
  "data": [{ "id": "...", "name": "...", "email": "...", "role": "..." }]
}
```

---

## 📢 Complaint Management

### 4. Submit Complaint
- **Method**: `POST`
- **URL**: `{{ base_url }}/complaints`
- **Auth**: `Bearer {{ jwt_token }}`
- **Body (JSON)**:
```json
{
  "citizen_id": "REPORTER_UUID",
  "category_id": "CATEGORY_UUID",
  "title": "Broken Street Lamp",
  "description": "The lamp at intersection 5 is flickering.",
  "photo_url": "http://example.com/photo.jpg",
  "latitude": -6.1754,
  "longitude": 106.8272
}
```
- **Response (201)**:
```json
{
  "success": true,
  "data": { "id": "...", "title": "...", "status": "SUBMITTED", "..." : "..." }
}
```

### 5. Fetch All Complaints
- **Method**: `GET`
- **URL**: `{{ base_url }}/complaints`
- **Auth**: `Bearer {{ jwt_token }}`
- **Query Params (all optional)**:
  - `status`: `SUBMITTED`, `VERIFIED`, `IN_PROGRESS`, `RESOLVED`, `REJECTED`
  - `skpd_id`: UUID
  - `category_id`: UUID
- **Response (200)**:
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "...",
      "title": "...",
      "description": "...",
      "status": "SUBMITTED",
      "photo_url": null,
      "latitude": -6.1754,
      "longitude": 106.8272,
      "created_at": "2024-03-09T00:00:00.000Z",
      "Category": { "name": "Infrastructure" },
      "SKPD": { "name": "Dinas PU" },
      "Citizen": { "name": "Jane", "email": "jane@example.com" }
    }
  ]
}
```

### 6. Get Complaint Details
- **Method**: `GET`
- **URL**: `{{ base_url }}/complaints/:id`
- **Auth**: `Bearer {{ jwt_token }}`
- **Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "...",
    "title": "...",
    "status": "...",
    "Category": { "name": "..." },
    "SKPD": { "name": "..." },
    "Citizen": { "name": "...", "email": "..." },
    "ComplaintLogs": [
      {
        "status_from": null,
        "status_to": "SUBMITTED",
        "notes": "Initial submission",
        "created_at": "..."
      }
    ]
  }
}
```

### 7. Update Status & Assign SKPD
- **Method**: `PATCH`
- **URL**: `{{ base_url }}/complaints/:id/status`
- **Auth**: `Bearer {{ jwt_token }}`
- **Body (JSON)**:
```json
{
  "status": "VERIFIED",
  "notes": "Verified by field agent. Moving to work queue.",
  "skpd_id": "SKPD_UUID_HERE"
}
```
- **Response (200)**:
```json
{
  "success": true,
  "data": { "id": "...", "status": "VERIFIED", "..." : "..." }
}
```

---

## 🏛️ Admin Settings

### 8. List Categories
- **Method**: `GET`
- **URL**: `{{ base_url }}/admin/categories`
- **Response (200)**:
```json
{
  "success": true,
  "data": [{ "id": "...", "name": "Infrastructure", "SKPD": { "name": "..." } }]
}
```

### 9. Create Category
- **Method**: `POST`
- **URL**: `{{ base_url }}/admin/categories`
- **Body (JSON)**:
```json
{
  "name": "Public Transport"
}
```
- **Response (201)**:
```json
{
  "success": true,
  "data": { "id": "...", "name": "Public Transport" }
}
```

### 10. List SKPDs
- **Method**: `GET`
- **URL**: `{{ base_url }}/admin/skpds`
- **Response (200)**:
```json
{
  "success": true,
  "data": [{ "id": "...", "name": "Dinas Perhubungan", "Categories": [] }]
}
```

### 11. Create SKPD
- **Method**: `POST`
- **URL**: `{{ base_url }}/admin/skpds`
- **Body (JSON)**:
```json
{
  "name": "Dinas Perhubungan",
  "category_id": "CATEGORY_UUID"
}
```
- **Response (201)**:
```json
{
  "success": true,
  "data": { "id": "...", "name": "Dinas Perhubungan" }
}
```

---

## 📋 Response Status Codes

| Code | Meaning |
| :--- | :--- |
| `200` | Success |
| `201` | Created Successfully |
| `400` | Bad Request (Validation Error) |
| `401` | Unauthorized (Invalid / Missing Token) |
| `403` | Forbidden (Not an Admin) |
| `404` | Resource Not Found |
| `500` | Internal Server Error |

---

## 📌 Key Notes

- **All responses** follow the envelope `{ "success": boolean, "data": ... }` pattern.
- **Login & Register token** is located at `response.data.token`, **not** at `response.token`.
- **Complaint list response** includes a top-level `count` field alongside the `data` array.
- **Complaint details** include a nested `ComplaintLogs` array for full audit trail history.
- The `Citizen`, `Category`, and `SKPD` fields in complaint responses are **Sequelize association aliases** (capitalized).
