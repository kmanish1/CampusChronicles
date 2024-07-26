# Campus Chronicles
Campus Chronicles is a modern blogging application designed to empower seniors of a college to share their stories and experiences, so that the juniors can read them.

## Tech Stack
### Frontend

- **React**
- **Zod**
- **TypeScript**
- **JWT (JSON Web Tokens)**


### Backend
- **Cloudflare Workers**
- **TypeScript**
- **Prisma**
- **PostgreSQL**


## Getting Started


1. Clone the repository:

```bash
git clone https://github.com/kmanish1/CampusChronicles.git
```
2. Navigate to the project directory:
```bash
cd CampusChronicles
```
3. Install dependencies for both the frontend and backend:
```bash
cd frontend
npm install
```
```bash
cd ../backend
npm install
```
4. Create a `.env` and `wrangler.toml` file inside backend.

   - inside `.env` - Use [AIVEN](https://aiven.io/) postgres database
    ```
    DATABASE_URL="PASTE DATABASE URL"
    ```
    #### Creating Connection Pool
    - Move to [PRISMA](https://www.prisma.io/data-platform/accelerate) site create a new Project. Click Enable Accelerate.
    - Under Database Connection String PASTE THE AIVEN DB URL created initially.
    - Click ENABLE ACCELERATE
    - Click Generate API KEY
    - A URL is generated paste inside `wrangler.toml` file 

    ```
    name = "backend"
    compatibility_date = "2023-12-01"

    [vars]
    DATABASE_URL="PASTE the PRISMA URL (Connection Pool)"
    
    JWT_SECRET="secret"
    ```

5. Start the `backend` server using Cloudflare Workers:

```bash
npm run dev
```
6. Start the `frontend` development server:
```bash
npm run dev
```

- **NOTE** If you make changes in the database i.e `schema.prisma` file you need to migrate using the follwing command to tell the database the the table you had added is been altered.
```bash
npx prisma migrate dev --name init_schema
```
- It will generate migration folder inside prisma.
- And then Generate the prisma client  
```
npx prisma generate --no-engine
```

Access in your browser at http://localhost:3000.


### To Deploy

```
npx wrangler login
```
```
npm run deploy
```

> cloudflare worker not take environment variable from `.env` file it takes from `wrangle.toml` file
