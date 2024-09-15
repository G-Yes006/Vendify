# SuperKart

SuperKart is an enterprise-level inventory and e-commerce application built using Node.js, TypeScript, PostgreSQL, and Prisma ORM. It includes various features such as user authentication, product management, cart functionality, and order processing.

## Project Structure

Here's an overview of the project structure:

```
/src
  /config       # Configuration files (e.g., database connection)
  /controllers  # Business logic and request handling
  /middlewares  # Authentication and other middlewares
  /models       # Prisma models
  /repositories # Database interactions
  /services     # Business services
  /utils        # Utility functions
  app.ts        # Entry point of the application
  server.ts     # Server configuration and startup
/prisma          # Prisma configuration and migrations
  schema.prisma # Prisma schema definition
.env            # Environment variables
.gitignore      # Git ignore rules
package.json    # Project metadata and dependencies
tsconfig.json   # TypeScript configuration
```

## Dependencies Installation Guide

### 1. **Install Dependencies**

To install all necessary dependencies and devDependencies, you can run:

```bash
npm install
```

This will install both runtime dependencies and development tools specified in `package.json`.

### 2. **Manually Installing Dependencies**

If you prefer to manually install dependencies, use the following commands:

**Dependencies:**

```bash
npm install @prisma/client bcrypt cors dotenv express express-rate-limit express-validator helmet jsonwebtoken nodemailer prisma stripe
```

**DevDependencies:**

```bash
npm install --save-dev @types/bcrypt @types/cors @types/express @types/helmet @types/jsonwebtoken @types/nodemailer @types/stripe @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint jest supertest ts-jest ts-node typescript
```

## Prisma Setup Guide

### 1. **Install Prisma CLI**

Ensure that Prisma CLI is installed. You can install it globally or use it locally:

```bash
npm install --save-dev prisma
```

### 2. **Initialize Prisma**

If you haven’t already initialized Prisma in your project, run:

```bash
npx prisma init
```

This will create a `prisma` folder with `schema.prisma` and a `.env` file.

### 3. **Configure `schema.prisma`**

Define your database schema in `prisma/schema.prisma`. Ensure your models are correctly set up.

### 4. **Run Migrations**

Apply the migrations to your database:

```bash
npx prisma migrate dev --name init
```

### 5. **Generate Prisma Client**

Generate the Prisma client to reflect the latest schema changes:

```bash
npx prisma generate
```

## `.env` Configuration

Create a `.env` file in the root directory of the project with the following content:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
PORT=3000
```

Replace `username`, `password`, and `mydatabase` with your actual PostgreSQL credentials and database name.

## Running the Project Locally

### 1. **Build the Project**

Compile TypeScript files:

```bash
npm run build
```

### 2. **Run the Project**

To start the application, use:

```bash
npm run start
```

Alternatively, for development with automatic reloading, use:

```bash
npm run dev
```

### 3. **Run Tests**

To run tests, use:

```bash
npm test
```

## Additional Information

- **Code Formatting**: Use Prettier to format your code:

  ```bash
  npm run format:write
  ```

- **Code Linting**: Use ESLint to lint your code:

  ```bash
  npm run lint
  ```
