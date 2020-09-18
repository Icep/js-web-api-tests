**Node Version & Mocha**

At the time of writing, the NodeJS environment on Hacker Rank is running version v8.15.1. Upgrading the version of Mocha to the latest (if you're a stickler for removing `npm audit` warnings) will cause your test runs to fail owing to the lack of support for CommonJS/ES.

Leave the version of Mocha in `package.json` set to 3.5.0 and everything will be fine.

## Setting up the API for Development

This is a NodeJS project. Install all the required packages using:

```
npm install
```

To run the API:

```
npm start
```

The API endpoint will be available at [http://localhost:8000/users](http://localhost:8000/users).

## API Data Model

The user data model contains the following fields, all required at time of entry:

- `name`: a string containing the user's name. Minimum 3 characters, maximum 30.
- `email`: a string containing a valid email address
- `dateOfBirth`: a date value in ISO-8601 format

We have created a schema in `routes/validation/index.js` that will be used whenever a user is created or updated.

## Expected User Operations

- Create a user: given valid input, store the user against a new ID and return status code `201 Created` with the ID
- List users: return a full list of users
- Get a user by ID: returns the user data
- Update a user: given valid input, update the user record and return status code `200 OK`, echoing the id
- Delete a user by ID: deletes a record based on the user record's ID value. Returns a `202 Accepted` code if the user record was deleted.

In addition to the functional requirements above:

- If an unknown user ID is supplied to an operation that takes an ID in the path, return `404 Not Found`
- If input data does not pass validation against the schema, return `400 Bad Request`. This includes cases where additional fields are supplied.

## Testing Requirements

We need you to add a set of tests into `tests/test.js` to verify that the internals of the API work as expected and the API serves traffic as expected.

For consistency, we use [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) for defining tests and assertions. However, you may add as many additional libraries as are necessary to the project to support your submission.

## Supporting Code Tools

We have added a couple of common utilities to the Node package to help with your build:

- `npm run test`: runs your tests
- `npm run start`: runs the API service
- `npm run lint`: runs ESLint over the code to make sure it adheres to code linting rules
- `npm run prettier:check` and `npm run prettier:fix`: checks/fixes code format
