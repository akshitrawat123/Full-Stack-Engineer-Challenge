# Frontend 

## Project Overview:
The project is a simple dashboard that displays a form for submitting a security scan result and two screens for displaying the list of scan results and their findings. The project uses TypeScript, ReactJS, and Semantic UI React.

### Project Directory:
The project should be available in the dashboard directory with meaningful commit messages.

### Technologies:
The project uses the following technologies:

- TypeScript
- ReactJS
- Semantic UI React

### Screens:
The project contains three screens:

- The first screen displays a form for submitting a scan result.
- The second screen displays the list of security scan results. The list contains the following columns: repository name, scan status, findings (displayed on a badge/label component), and the corresponding timestamp.
- The third screen displays the list of findings for a selected security scan. The list contains the following columns: RuleId, Description, Severity, and Path name: line number.

### State Management:
The project does not use any state management libraries. The state management is clean, simple, and easy to test.

# Results API

This is a simple REST API built with Express and Mongoose for managing results data.

## Getting Started

Clone the repository and navigate to the directory:

```bash
git clone gh repo clone akshitrawat123/Full-Stack-Engineer-Challenge
cd api
```
Install dependencies:

```bash
npm install
```

Create a .env file in the root directory with the following variables:

```bash
MONGODB_URI=<mongodb-uri>
```

Start the server:

```
npm start
```

## Endpoints
- ```GET /results:``` Get all results.
- ```GET /results/:id:``` Get a specific result by ID.
- ```POST /results:``` Create a new result.
- ```PUT /results/:id:``` Update a specific result by ID.
- ```DELETE /results/:id:``` Delete a specific result by ID.

## Data Model
Each result has the following properties:

- **`status`** (required): The status of the result (e.g.'Queued', 'In Progress', 'Success', 'Failure').
- **`repositoryName`** (required): The name of the repository.
- **`findings`** (required): An array of findings.
- **`queuedAt`** (required): The time the result was queued.
- **`scanningAt`** (required): The time the result started scanning.
- **`finishedAt`** (required): The time the result finished scanning.


### Endpoint
#### GET /results
Retrieves a list of all results stored in the database.

#### Response
The response will be a JSON array containing objects representing each result in the following format:
```
[
  {
    "status": "Queued",
    "repositoryName": "my-repo",
    "findings": {
      "severity": "high",
      "description": "This is a high severity finding.",
      "recommendation": "Fix the issue as soon as possible."
    },
    "queuedAt": "2022-03-12T01:23:45.678Z",
    "scanningAt": "2022-03-12T01:23:46.789Z",
    "finishedAt": "2022-03-12T01:24:00.000Z"
  },
  {
    "status": "Success",
    "repositoryName": "another-repo",
    "findings": {},
    "queuedAt": "2022-03-11T12:00:00.000Z",
    "scanningAt": "2022-03-11T12:01:00.000Z",
    "finishedAt": "2022-03-11T12:05:00.000Z"
  }
]
```

#### GET /results/:id
Retrieves a result stored in the database.

#### Response
The response will be a JSON objects representing each result in the following format:
```
[
  {
    "status": "Queued",
    "repositoryName": "my-repo",
    "findings": {
      "severity": "high",
      "description": "This is a high severity finding.",
      "recommendation": "Fix the issue as soon as possible."
    },
    "queuedAt": "2022-03-12T01:23:45.678Z",
    "scanningAt": "2022-03-12T01:23:46.789Z",
    "finishedAt": "2022-03-12T01:24:00.000Z"
  }
]
```

#### POST /results
Create a new result
```
POST /results
Content-Type: application/json

{
  "status": "pending",
  "repositoryName": "my-repo",
  "findings": [
    {
      "severity": "high",
      "description": "This is a high severity finding.",
      "recommendation": "Fix the issue as soon as possible."
    }
  ]
}
```

#### PUT /result/:id
Update a specific result by ID:

```
PUT /results/12345
Content-Type: application/json

{
  "status": "completed",
  "findings": [
    {
      "severity": "high",
      "description": "This is a high severity finding.",
      "recommendation": "Fix the issue as soon as possible."
    },
    {
      "severity": "medium",
      "description": "This is a medium severity finding.",
      "recommendation": "Fix the issue when possible."
    }
  ],
  "finishedAt": "2022-01-01T00:00:00.000Z"
}
```

#### DELETE /result/:id
Delete a specific result by ID:

```
DELETE /results/12345
```
