# Item Match API

Item Match is an API for matching lost and found items based on various criteria such as title, description, location, and images.

## Features

- Post lost items
- Post found items
- Match items based on multiple criteria
- Notify users of potential matches

## Technologies

- NestJS
- TypeScript
- SOLID principles
- Object-Oriented Programming (OOP)

## Integration

This API retrieves items to compare from another API. The source of the items is an endpoint from the project [Lost and Found API](https://github.com/PedroSupimpa/lost_found-API). We use an endpoint from this project to get all the existing posts, allowing this new API to perform comparisons and find matches.

## Getting Started

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lost-and-found-matcher.git

```
2. Navigate to the project directory:

  ```bash
  cd lost-and-found-matcher

```
3. Install the dependencies:

  ```bash
  npm install

```
4. Running the Application:
  
  ```bash
    npm run start
```

## Usage

1. Post a lost item:
    ```http
    POST /posts/lost
    Content-Type: application/json

    {
      "title": "Lost Wallet",
      "description": "Black leather wallet",
      "location": {
        "x": -15.7657588,
        "y": -47.8953524
      },
      "createdDate": "2024-06-18T21:59:57.983Z",
      "closedDate": null,
      "category": {
        "id": 1,
        "name": "Documents"
      },
      "images": []
    }
    ```

2. Post a found item:
    ```http
    POST /posts/found
    Content-Type: application/json

    {
      "id": 5,
      "title": "Perdi uma carteira",
      "description": "ela contem documentos",
      "location": {
        "x": -15.7657588,
        "y": -47.8953524
      },
      "createdDate": "2024-06-18T21:59:57.983Z",
      "closedDate": null,
      "category": {
        "id": 1,
        "name": "Documents"
      },
      "images": []
    }
    ```

3. The API will automatically match items based on the criteria and notify users of potential matches.

### The API will be available at http://localhost:3000.

## Principles Applied
- Single Responsibility Principle (SRP): Each class and module has a single responsibility.
- Open/Closed Principle (OCP): The system is open to extension but closed to modification.
- Liskov Substitution Principle (LSP): Subtypes can replace their base types without altering the correctness of the program.
- Interface Segregation Principle (ISP): Clients should not be forced to depend on interfaces they do not use.
- Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules. Both should depend on abstractions.
  
## License
This project is licensed under the MIT License - see the LICENSE file for details.


