import React from "react";

const Documentation = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-8 text-blue-600">
        API Documentation
      </h1>

      {/* Quick Navigation */}
      <div className="sticky top-0 bg-white p-4 shadow-md mb-8">
        <ul className="space-y-4">
          <li>
            <a href="#authentication" className="text-blue-600 hover:underline">
              1. Authentication
            </a>
          </li>
          <li>
            <a href="#user" className="text-blue-600 hover:underline">
              2. Users
            </a>
          </li>
          <li>
            <a href="#cards" className="text-blue-600 hover:underline">
              3. Cards
            </a>
          </li>
          <li>
            <a href="#cardset" className="text-blue-600 hover:underline">
              4. CardSets
            </a>
          </li>
        </ul>
      </div>

      <div className="space-y-10">
        {/* Authentication Section */}
        <section id="authentication" className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            1. Authentication
          </h2>

          {/* POST /api/authenticate */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              1.1 POST /api/authenticate
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Logs in a user and returns an access
              token and refresh token upon successful authentication.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> POST
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> None (No access token required
              for this request).
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/authenticate
            </p>
            <h4 className="font-semibold text-gray-800 mt-4">Request Body:</h4>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "email": "user@example.com",  // User's email.
    "password": "password123"     // User's password.
}`}
            </pre>
            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "accessToken": "your_access_token",   // The new access token.
    "refreshToken": "your_refresh_token", // The new refresh token.
    "message": "Succesful login"
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>404 Not Found:</strong> If the user doesn't exist.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "message": "User not found"
}`}
            </pre>
            <p className="text-sm text-red-600">
              <strong>401 Unauthorized:</strong> If the credentials are
              incorrect.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "message": "Invalid credentials"
}`}
            </pre>
            <p className="text-sm text-red-600">
              <strong>500 Internal Server Error:</strong> If there's a server
              error.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "message": "There was an error signing up"
}`}
            </pre>
          </section>

          {/* POST /api/authenticate/refresh-token */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              1.2 POST /api/authenticate/refresh-token
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Allows a user to get a new access token
              and refresh token using a valid refresh token.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> POST
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> None (No access token required
              for this request, but refresh token is required in the request
              body).
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/authenticate/refresh-token
            </p>
            <h4 className="font-semibold text-gray-800 mt-4">Request Body:</h4>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "refreshToken": "[your_refresh_token]"   // The refresh token used to get new tokens.
}`}
            </pre>
            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "accessToken": "new_access_token",     // The new access token.
    "refreshToken": "new_refresh_token"    // The new refresh token.
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>401 Unauthorized:</strong> If refresh token is missing.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "message": "Refresh token is required"
}`}
            </pre>
            <p className="text-sm text-red-600">
              <strong>403 Forbidden:</strong> If the refresh token is invalid.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "message": "Invalid refresh token"
}`}
            </pre>
          </section>
        </section>

        {/* User Section */}
        <section id="user" className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">2. User</h2>

          {/* POST /api/users/register */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              2.1 POST /api/users/register
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Registers a new user in the system.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> POST
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> None (No access token required).
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/users/register
            </p>

            {/* Validation Schema */}
            <section className="space-y-4 mt-6">
              <h4 className="font-semibold text-gray-800">Validation Schema</h4>
              <p className="text-gray-600">
                The request body is validated using the following schema:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
                {`
const schema = Joi.object({
    first_name: Joi.string().min(3).max(50).pattern(/^[a-zA-Z\\s]+$/).messages({
        'string.max': 'First name cannot be longer than 50 characters.',
        'string.pattern.base': 'First name cannot contain numbers or special characters.',
        'any.required': 'First name is required.'
    }),
    last_name: Joi.string().min(3).max(50).pattern(/^[a-zA-Z\\s]+$/).messages({
        'string.max': 'Last name cannot be longer than 50 characters.',
        'string.pattern.base': 'Last name cannot contain numbers or special characters.',
        'any.required': 'Last name is required.'
    }),
    username: Joi.string().min(5).max(50).messages({
        'string.max': 'Username cannot be longer than 50 characters.',
        'any.required': 'Username is required.'
    }),
    email: Joi.string().email().messages({
        'string.email': 'Invalid email format.',
        'any.required': 'Email is required.'
    }),
    password: Joi.string().min(6).messages({
        'string.min': 'Password must be at least 6 characters long.',
        'any.required': 'Password is required.'
    })
});`}
              </pre>
            </section>

            <h4 className="font-semibold text-gray-800 mt-4">Request Body:</h4>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "first_name": "John",         // User's first name.
    "last_name": "Doe",           // User's last name.
    "username": "johndoe",        // User's username.
    "email": "johndoe@example.com", // User's email.
    "password": "password123"     // User's password (must be hashed).
}`}
            </pre>
            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (201 Created):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "message": "User created successfully.",
    "userId": "1"   // The ID of the newly created user.
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>400 Bad Request:</strong> If the email already exists in
              the system or validation fails.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "message": "User already exists"
}`}
            </pre>
            <p className="text-sm text-red-600">
              <strong>500 Internal Server Error:</strong> If there's an issue
              with creating the user.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "message": "There was an error while creating the user.",
    "error": "error_message"
}`}
            </pre>
          </section>

          {/* GET /api/users/:id */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              2.2 GET /api/users/:id
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Retrieves a user by their unique ID.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> Requires an access token in the
              request header.
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/users/:id
            </p>
            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "user": {
        "id": "1",           // The user's ID.
        "first_name": "John", // The user's first name.
        "last_name": "Doe",   // The user's last name.
        "email": "johndoe@example.com", // The user's email.
        "username": "johndoe" // The user's username.
    }
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>404 Not Found:</strong> If the user is not found.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "message": "User not found"
}`}
            </pre>
          </section>

          {/* PUT /api/users/update/:id */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              2.3 PUT /api/users/update/:id
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Updates the details (first name, last
              name, username, and email) of a specific user by their ID.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> PUT
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> Requires an access token in the
              request header.
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/users/update/:id
            </p>
            <h4 className="font-semibold text-gray-800 mt-4">Request Body:</h4>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "first_name": "Updated Name",   // Updated first name.
    "last_name": "Updated Lastname", // Updated last name.
    "username": "newusername",       // Updated username.
    "email": "newemail@example.com"  // Updated email.
}`}
            </pre>
            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "message": "User updated successfully."
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>404 Not Found:</strong> If the user doesn't exist.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "message": "User not found"
}`}
            </pre>
            <p className="text-sm text-red-600">
              <strong>401 Unauthorized:</strong> If the authentication token is
              invalid.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
    "message": "Invalid token"
}`}
            </pre>
          </section>
          {/* PATCH /api/users/update/password/:id */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              2.4 PATCH /api/users/update/password/:id
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Updates the password of a specific user
              by their ID.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> PATCH
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> Requires an access token in the
              request header.
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/users/update/password/:id
            </p>
            <h4 className="font-semibold text-gray-800 mt-4">Request Body:</h4>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "password": "newPassword123" // The new password (must be hashed before saving).
}`}
            </pre>
            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "Password updated successfully."
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>404 Not Found:</strong> If the user doesn't exist.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "User not found."
}`}
            </pre>
            <p className="text-sm text-red-600">
              <strong>500 Internal Server Error:</strong> If there's an issue
              with updating the password.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "There was an error while updating the password.",
  "error": "error_message"
}`}
            </pre>
          </section>

          {/* DELETE /api/users/delete/:id */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              2.5 DELETE /api/users/delete/:id
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Deletes a specific user by their ID.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> DELETE
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> Requires an access token in the
              request header.
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/users/delete/:id
            </p>
            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "User with ID 1 has been deleted successfully."
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>404 Not Found:</strong> If the user doesn't exist.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "No user found with ID 1"
}`}
            </pre>
            <p className="text-sm text-red-600">
              <strong>401 Unauthorized:</strong> If the authentication token is
              invalid.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "Invalid token"
}`}
            </pre>
            <p className="text-sm text-red-600">
              <strong>500 Internal Server Error:</strong> If there's an issue
              with deleting the user.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "There was an error deleting the user.",
  "error": "error_message"
}`}
            </pre>
          </section>

          {/* GET /api/users/all */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              2.6 GET /api/users/
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Retrieves a list of all users in the
              system.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> Requires an access token in the
              request header.
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/users/
            </p>
            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "users": [
    {
      "id": "1",
      "first_name": "John",
      "last_name": "Doe",
      "email": "johndoe@example.com",
      "username": "johndoe"
    },
    {
      "id": "2",
      "first_name": "Jane",
      "last_name": "Smith",
      "email": "janesmith@example.com",
      "username": "janesmith"
    }
  ]
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>500 Internal Server Error:</strong> If there's an issue
              fetching users.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "There was an error fetching the users.",
  "error": "error_message"
}`}
            </pre>
          </section>
        </section>

        {/* CardSets Section */}
        <section id="cards" className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">3. Cards</h2>

          {/* POST /api/cards/create/:id */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              3.1 POST /api/cards/create/:id
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Creates a new card within a specific
              card set.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> POST
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> Requires an access token in the
              request header.
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/cards/create/:id
            </p>

            <section className="space-y-4 mt-6">
              <h4 className="font-semibold text-gray-800">Validation Schema</h4>
              <p className="text-gray-600">
                The request body is validated using the following schema:
              </p>
              <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
                {`
const schema = Joi.object({
    user_id: Joi.number().integer().positive().messages({
        "number.base": "User ID must be a number.",
        "number.integer": "User ID must be an integer.",
        "number.positive": "User ID must be a positive number.",
        "any.required": "User ID is required.",
    }),
    question: Joi.string().min(4).max(255).messages({
      "string.base": "Question must be a string.",
      "string.min": "Question must be at least 4 characters.",
      "string.max": "Question cannot be longer than 255 characters.",
      "any.required": "Question is required.",
    }),
    answer: Joi.string().min(2).max(255).messages({
      "string.base": "Answer must be a string.",
      "string.min": "Answer must be at least 2 characters.",
      "string.max": "Answer cannot be longer than 255 characters.",
      "any.required": "Answer is required.",
    }),
  }).or("question", "answer");`}
              </pre>
            </section>

            <h4 className="font-semibold text-gray-800 mt-4">Request Body:</h4>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "user_id": 1,               // ID of the user creating the card.
  "question": "Sample question?", // The question text.
  "answer": "Sample answer."      // The answer text.
}`}
            </pre>
            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (201 Created):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "Card created successfully.",
  "cardId": 10, // The ID of the newly created card.
  "card": {
      "question": "Sample question?",
      "answer": "Sample answer."
  }
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>404 Not Found:</strong> If the card set with the given ID
              does not exist.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "Card set not found."
}`}
            </pre>
            <p className="text-sm text-red-600">
              <strong>500 Internal Server Error:</strong> If there is an error
              while creating the card.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "There was an error while creating the card.",
  "error": "error_message"
}`}
            </pre>
          </section>

          {/* PUT /api/cards/update/:set_id/:id */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              3.2 PUT /api/cards/update/:set_id/:id
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Updates an existing card in a specific
              card set.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> PUT
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> Requires an access token in the
              request header.
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/cards/update/:set_id/:id
            </p>

            <h4 className="font-semibold text-gray-800 mt-4">Request Body:</h4>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "question": "Updated question?", // The updated question text.
  "answer": "Updated answer."      // The updated answer text.
}`}
            </pre>
            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "Card updated successfully."
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>404 Not Found:</strong> If the card set or card does not
              exist.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "Card set not found."
}`}
            </pre>
            <p className="text-sm text-red-600">
              <strong>500 Internal Server Error:</strong> If there is an error
              while updating the card.
            </p>
          </section>

          {/* DELETE /api/cards/delete/:set_id/:id */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              3.3 DELETE /api/cards/delete/:set_id/:id
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Deletes an existing card from a specific
              card set.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> DELETE
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> Requires an access token in the
              request header.
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/cards/delete/:set_id/:id
            </p>

            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "Card deleted successfully."
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>404 Not Found:</strong> If the card set or card does not
              exist.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "Card not found."
}`}
            </pre>
            <p className="text-sm text-red-600">
              <strong>500 Internal Server Error:</strong> If there is an error
              while deleting the card.
            </p>
          </section>

          {/* GET /api/cards/:set_id/:id */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              3.4 GET /api/cards/:set_id/:id
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Retrieves a specific card by its ID
              within a card set.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/cards/:set_id/:id
            </p>

            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "id": 10,
  "card_set_id": 1,
  "question": "Sample question?",
  "answer": "Sample answer."
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>404 Not Found:</strong> If the card or card set does not
              exist.
            </p>
          </section>

          {/* GET /api/cards/all */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              3.5 GET /api/cards/all
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Retrieves all cards across all card
              sets.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/cards/all
            </p>

            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`[
  {
    "id": 10,
    "card_set_id": 1,
    "question": "Sample question?",
    "answer": "Sample answer."
  },
  {
    "id": 11,
    "card_set_id": 1,
    "question": "Another question?",
    "answer": "Another answer."
  }
]`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>500 Internal Server Error:</strong> If there is an error
              while retrieving the cards.
            </p>
          </section>
        </section>
        <section id="cardset" className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">4. Cardset</h2>
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              4.1 POST /api/cardsets/create/:id
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Creates a new card set for a specific
              user.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> POST
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> Requires an access token in the
              request header.
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/cardsets/create/:id
            </p>

            <h4 className="font-semibold text-gray-800 mt-4">Request Body:</h4>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "title": "Card Set Title",
  "description": "Description of the card set.",
  "visibility": "public"
}`}
            </pre>
            <section className="space-y-4 mt-6">
              <h4 className="font-semibold text-gray-800">Validation Schema</h4>
              <p className="text-gray-600">
                The request body is validated using the following schema (card_set_id is not required for creating a card set):
              </p>
              <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
                {`
  const schema = Joi.object({
    card_set_id: Joi.number().integer().positive().messages({
        "number.base": "Set ID must be a number.",
        "number.integer": "Set ID must be an integer.",
        "number.positive": "Set ID must be a positive number.",
        "any.required": "Set ID is required.",
      }),
    title: Joi.string().min(4).max(255).messages({
      "string.base": "Title must be a string.",
      "string.min": "Title must be atleast 4 characters.",
      "string.max": "Title cannot be longer than 255 characters.",
      "any.required": "Title name is required.",
    }),
    description: Joi.string().min(15).max(255).messages({
      "string.base": "Description must be a string.",
      "string.min": "Description must be atleast 15 characters.",
      "string.max": "Description cannot be longer than 255 characters.",
      "any.required": "Description is required.",
    }),
    visibility: Joi.string().valid("private", "public").messages({
      "any.only": 'Visibility must be either "private" or "public".',
      "string.base": "Visibility must be a string.",
      "any.required": "Visibility is required.",
    })
});`}
              </pre>
            </section>
            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (201 Created):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "CardSet created successfully.",
  "setId": 1
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>404 Not Found:</strong> If the user does not exist.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "User not found."
}`}
            </pre>
            <p className="text-sm text-red-600">
              <strong>500 Internal Server Error:</strong> If there is an error
              while creating the card set.
            </p>
          </section>
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              4.2 PUT /api/cardsets/update/:id
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Updates an existing card set.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> PUT
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> Requires an access token in the
              request header.
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/cardsets/update/:id
            </p>

            <h4 className="font-semibold text-gray-800 mt-4">Request Body:</h4>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "title": "Updated Title",
  "description": "Updated Description",
  "visibility": "private"
}`}
            </pre>
            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "Cardset updated successfully."
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>500 Internal Server Error:</strong> If there is an error
              while updating the card set.
            </p>
          </section>
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              4.3 DELETE /api/cardsets/delete/:id
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Deletes a specific card set.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> DELETE
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> Requires an access token in the
              request header.
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/cardsets/delete/:id
            </p>

            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "Card set deleted successfully."
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>404 Not Found:</strong> If the card set does not exist.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "Card set not found."
}`}
            </pre>
            <p className="text-sm text-red-600">
              <strong>500 Internal Server Error:</strong> If there is an error
              while deleting the card set.
            </p>
          </section>
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              4.4 PATCH /api/cardsets/:id
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Updates the visibility of a specific
              card set.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> PATCH
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> Requires an access token in the
              request header.
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/cardsets/:id
            </p>

            <h4 className="font-semibold text-gray-800 mt-4">Request Body:</h4>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "visibility": "public"
}`}
            </pre>
            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "Cardset updated successfully."
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>404 Not Found:</strong> If the card set does not exist.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "Card set not found."
}`}
            </pre>
          </section>
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              4.5 GET /api/cardsets/
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Retrieves all card sets with optional
              search, limit, and offset parameters.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> No authentication required.
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/cardsets/
            </p>
            <p className="text-gray-600">
              <strong>Query Parameters:</strong>
            </p>
            <ul className="text-gray-600 list-disc pl-5">
              <li>
                <code>limit</code> (optional): Number of results to return.
                Default is <code>10</code>.
              </li>
              <li>
                <code>offset</code> (optional): Number of results to skip for
                pagination. Default is <code>0</code>.
              </li>
              <li>
                <code>search</code> (optional): Keyword to filter the card sets
                by title or description.
              </li>
            </ul>

            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`[
  {
    "id": 1,
    "title": "Sample Card Set",
    "description": "A sample description.",
    "visibility": "public"
  },
  {
    "id": 2,
    "title": "Another Card Set",
    "description": "Another sample description.",
    "visibility": "private"
  }
]`}
            </pre>
            <p>
              <strong>Errors:</strong> None.
            </p>
          </section>
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              4.6 GET /api/cardsets/all
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Retrieves all card sets without any
              search parameters.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> No authentication required.
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/cardsets/all
            </p>
            <p className="text-gray-600">
              <strong>Query Parameters:</strong> None.
            </p>

            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`[
  {
    "id": 1,
    "title": "Sample Card Set",
    "description": "A sample description.",
    "visibility": "public"
  }
]`}
            </pre>
            <p>
              <strong>Errors:</strong> None.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              4.7 GET /api/cardsets/:userId
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Retrieves all card sets created by a
              specific user.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> Requires an access token in the
              request header.
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/cardsets/:userId
            </p>

            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`[
  {
    "id": 1,
    "title": "User's Card Set",
    "description": "Description of the user's card set.",
    "visibility": "public"
  }
]`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>404 Not Found:</strong> If the user does not exist.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "User not found."
}`}
            </pre>
          </section>
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              4.8 GET /api/cardsets/cards/:id
            </h3>
            <p className="text-gray-600">
              <strong>Purpose:</strong> Retrieves a specific card set along with
              its cards.
            </p>
            <p className="text-gray-600">
              <strong>Method:</strong> GET
            </p>
            <p className="text-gray-600">
              <strong>Authentication:</strong> No authentication required.
            </p>
            <p className="text-gray-600">
              <strong>Request URL:</strong> /api/cards/cardsets/:id
            </p>

            <h4 className="font-semibold text-gray-800 mt-4">Response:</h4>
            <p>
              <strong>Success (200 OK):</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "id": 1,
  "title": "Card Set with Cards",
  "description": "A card set description.",
  "cards": [
    {
      "id": 1,
      "question": "What is an API?",
      "answer": "An Application Programming Interface."
    },
    {
      "id": 2,
      "question": "What is REST?",
      "answer": "Representational State Transfer."
    }
  ]
}`}
            </pre>
            <p>
              <strong>Errors:</strong>
            </p>
            <p className="text-sm text-red-600">
              <strong>404 Not Found:</strong> If the card set does not exist.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
              {`{
  "message": "Card set not found."
}`}
            </pre>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
