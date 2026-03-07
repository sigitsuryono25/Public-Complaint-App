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
*Copy the `token` from the response and update your `jwt_token` environment variable.*

---

## 📢 Complaint Management

### 3. Submit Complaint
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

### 4. Fetch All Complaints
- **Method**: `GET`
- **URL**: `{{ base_url }}/complaints`
- **Params**:
  - `status`: `SUBMITTED`, `VERIFIED`, `IN_PROGRESS`, etc. (Optional)
  - `category_id`: UUID (Optional)

### 5. Get Complaint Details
- **Method**: `GET`
- **URL**: `{{ base_url }}/complaints/{{ id }}`

### 6. Update Status & Assign SKPD
- **Method**: `PATCH`
- **URL**: `{{ base_url }}/complaints/{{ id }}/status`
- **Auth**: `Bearer {{ jwt_token }}`
- **Body (JSON)**:
```json
{
  "status": "VERIFIED",
  "notes": "Verified by field agent. Moving to work queue.",
  "skpd_id": "SKPD_UUID_HERE"
}
```

---

## 🏛️ Admin Settings

### 7. List Categories
- **Method**: `GET`
- **URL**: `{{ base_url }}/admin/categories`

### 8. Create Category
- **Method**: `POST`
- **URL**: `{{ base_url }}/admin/categories`
- **Body (JSON)**:
```json
{
  "name": "Public Transport"
}
```

### 9. List SKPDs
- **Method**: `GET`
- **URL**: `{{ base_url }}/admin/skpds`

### 10. Register SKPD
- **Method**: `POST`
- **URL**: `{{ base_url }}/admin/skpds`
- **Body (JSON)**:
```json
{
  "name": "Dinas Perhubungan",
  "category_id": "CATEGORY_UUID"
}
```

---

## 📋 Response Status Codes

| Code | Meaning |
| :--- | :--- |
| `200` | Success |
| `201` | Created Successfully |
| `400` | Bad Request (Validation Error) |
| `401` | Unauthorized (Invalid Token) |
| `403` | Forbidden (Not an Admin) |
| `404` | Resource Not Found |
| `500` | Internal Server Error |
