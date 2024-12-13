# Simple API Documentation

## Base URL
The API is hosted at: `localhost:8000`

---

## Endpoints

### 1. User Authentication
**POST /users/auth**

Authenticate an existing user.

#### Request Body:
```json
{
  "userID": "string",
  "password": "string"
}
```

#### Responses:
- **200 OK**: Authentication successful
  ```json
  {
    "message": "Authentication successful"
  }
  ```
- **401 Unauthorized**: Invalid credentials
  ```json
  {
    "message": "Invalid credentials"
  }
  ```
- **400 Bad Request**: Missing required fields
  ```json
  {
    "message": "Missing userID or password"
  }
  ```

---

### 2. User Registration
**POST /users/register**

Register a new user.

#### Request Body:
```json
{
  "userID": "string",
  "password": "string"
}
```

#### Responses:
- **201 Created**: User registered successfully
  ```json
  {
    "message": "User registered successfully"
  }
  ```
- **409 Conflict**: User already exists
  ```json
  {
    "message": "User already exists"
  }
  ```
- **400 Bad Request**: Missing required fields
  ```json
  {
    "message": "Missing userID or password"
  }
  ```

---

### 3. Get User Files
**GET /files/{userID}**

Retrieve the csv file associated with the user.

#### Path Parameter:
- **userID**: The ID of the user.

#### Responses:
- **200 OK**: Returns the content of the file
- **404 Not Found**: File doesn't exist

---

## Error Codes
- **400**: Bad request, missing required parameters.
- **401**: Unauthorized, invalid credentials.
- **404**: Resource not found.
- **409**: Conflict, user already exists.
- **405**: Method not allowed.

---

## Notes
- All requests and responses use JSON format.
- Ensure appropriate headers: `Content-Type: application/json`.

