# Deployment Guide: MedusaJS Backend on Render & Frontend on Netlify

This guide provides a complete, step-by-step process for deploying a MedusaJS e-commerce application using a monorepo structure.

- **Backend**: A Dockerized MedusaJS server running on **Render**.
- **Frontend**: A Next.js storefront running on **Netlify**.

---

## Project Structure

This guide assumes you are using a monorepo structure. 
---

## Part 1: Deploy the Backend (`/backend`) to Render

We will start by getting the backend live, as the frontend will need its URL to connect to.

### Step 1: Create the Medusa Backend Locally

First, create the backend application inside your main project folder.

1.  Navigate to your root project folder in your terminal.
2.  Run the `create-medusa-app` command, specifying `backend` as the folder name:

    ```bash
    npx create-medusa-app@latest backend
    ```

### Step 2: Create the Production `Dockerfile`

For a robust and consistent deployment, we will use Docker.

1.  Navigate into your new backend directory: `cd backend`
2.  Create a new file named `Dockerfile` (no extension).
3.  Add the following multi-stage build configuration to the `Dockerfile`. This optimizes the final image for size and security.

    ```dockerfile
    # ---- Base Stage ----
    FROM node:18-alpine AS base
    WORKDIR /app

    # ---- Dependencies Stage ----
    FROM base AS deps
    COPY package.json package-lock.json* ./
    RUN npm install --omit=dev

    # ---- Build Stage ----
    FROM base AS builder
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    # Build the Medusa project for production
    RUN npm run build

    # ---- Production Stage ----
    FROM base AS production
    ENV NODE_ENV=production

    # Copy built files and production node_modules
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/package.json ./package.json
    COPY --from=deps /app/node_modules ./node_modules

    # Expose the port the app runs on
    EXPOSE 9000

    # Command to run the Medusa server
    CMD ["npm", "run", "start"]
    ```

### Step 3: Push Your Project to GitHub

Both Render and Netlify will deploy directly from your Git repository.

1.  In your root project folder (`/your-ecommerce-project/`), initialize a Git repository.
2.  Create a new repository on GitHub.
3.  Commit all your files (both the `backend` folder and its new `Dockerfile`) and push them to your GitHub repository.

### Step 4: Set Up Database & Redis on Render

Your production backend requires a PostgreSQL database and a Redis instance.

1.  Log in to your Render dashboard.
2.  **Create PostgreSQL:**
    * Click **New +** > **PostgreSQL**.
    * Give it a unique name (e.g., `my-medusa-db`) and click **Create Database**.
    * Once created, go to the **Connect** tab and copy the **Internal Connection String**.
3.  **Create Redis:**
    * Click **New +** > **Redis**.
    * Give it a unique name (e.g., `my-medusa-redis`) and click **Create Redis**.
    * Copy the **Internal Redis URL**.

### Step 5: Deploy the Backend Service on Render

Now, let's deploy the backend application itself.

1.  On Render, click **New +** > **Web Service**.
2.  Connect the GitHub repository for your project.
3.  Configure the service settings:
    * **Name:** A unique name for your service (e.g., `medusa-api`).
    * **Root Directory:** This is a crucial step for a monorepo. Set this to **`backend`**.
    * **Runtime:** Select **`Docker`**. Render will automatically detect and use your `Dockerfile`.
4.  Go to the **Environment** tab and add the following variables:
    * `DATABASE_URL`: Paste the **Internal Connection String** from your Render PostgreSQL database.
    * `REDIS_URL`: Paste the **Internal Redis URL** from your Render Redis instance.
    * `JWT_SECRET`: Generate a long, random string for security.
    * `COOKIE_SECRET`: Generate another long, random string.
5.  Click **Create Web Service**. Render will build the Docker image and deploy your backend. Once complete, copy the live URL provided by Render (e.g., `https://medusa-api.onrender.com`).

---

## Part 2: Deploy the Frontend (`/frontend`) to Netlify

With the backend running, we can now deploy the storefront.

### Step 6: Get the Frontend Code

1.  Navigate back to your root project folder in the terminal.
2.  Use the Next.js starter template to create your frontend in the `frontend` folder:

    ```bash
    npx create-next-app@latest frontend --example "[https://github.com/medusajs/nextjs-starter-medusa](https://github.com/medusajs/nextjs-starter-medusa)"
    ```
3.  Commit the new `frontend` folder and push it to your GitHub repository.

### Step 7: Deploy the Frontend on Netlify

1.  Log in to your Netlify dashboard.
2.  Click **Add new site** > **Import an existing project**.
3.  Connect to the same GitHub repository that holds your monorepo.
4.  Configure the build settings:
    * **Base directory:** Set this to **`frontend`**. This tells Netlify where your frontend code is.
    * **Build command** and **Publish directory** should be auto-detected (e.g., `next build` and `.next`).
5.  Before deploying, go to **Site configuration > Environment variables**. Add the following:
    * **Key:** `NEXT_PUBLIC_MEDUSA_BACKEND_URL`
    * **Value:** Paste the live URL of your backend on Render (e.g., `https://medusa-api.onrender.com`).
6.  Click **Deploy site**. Netlify will build and deploy your frontend.

---

## Part 3: Final Connection

### Step 8: Update Backend CORS

The final step is to allow your Netlify frontend to communicate with your Render backend.

1.  Go back to your **`medusa-api`** service on Render.
2.  Navigate to the **Environment** tab.
3.  Add one more environment variable:
    * **Key:** `STORE_CORS`
    * **Value:** Your live Netlify site URL (e.g., `https://your-store.netlify.app`).
4.  Click **Save Changes**. Render will automatically redeploy your service with the new setting.

**Congratulations!** Your full-stack, headless e-commerce platform is now live.
