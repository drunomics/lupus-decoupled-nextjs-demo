# Lupus Decoupled Next.js Demo

## What is supported?
- Rendering custom elements via components
- Rendering a tree of custom elements
- Forwarding /some-page requests to the backend and rendering results
- breadcrumbs
- metatags

## Try it online

### Option 1: Try it Online with Stackblitz

You can quickly try this project online using Stackblitz:

[Open in Stackblitz](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/basic?file=README.md)

1. After launching the project, create a `.env` file in the root directory.
2. Paste the following environment variable into the `.env` file:

```bash
NEXT_PUBLIC_DRUPAL_BASE_URL="https://8080-drunomics-lupusdecouple-xeqrf6qqxj3.ws-eu116.gitpod.io"
```

3. Save the file and continue working with the project directly in Stackblitz.

### Option 2: Run Locally

To run the project on your local machine:

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:drunomics/lupus-decoupled-nextjs-demo.git
   ```

2. **Create a `.env` File**:
   - If a `.env` file doesn't already exist in the root directory, create one.
   - Then, add the following environment variable:

   ```bash
   NEXT_PUBLIC_DRUPAL_BASE_URL="https://8080-drunomics-lupusdecouple-xeqrf6qqxj3.ws-eu116.gitpod.io"
   ```

3. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies:

```bash
npm install
```

4. **Run the Project**: Start the development server:

```bash
npm run dev
```

5. **View the Project**: Open your browser and navigate to `http://localhost:3000` to view the application

## Manual setup steps

For local setup you'll get some network error until base URLs are set right. To do so:

1. Set the Drupal base URL(`NEXT_PUBLIC_DRUPAL_BASE_URL`) in `env.file`, e.g. `https://drunomics-lupusdecouple-xeqrf6qqxj3.ws-eu116.gitpod.io/`
   When using a Drupal gitpod/DrupalPod as a backend, make sure to set your environment to "Shared" via the workspace options menu, as found in the dashhboard at https://gitpod.io. That way the frontend can connect to it.
2. Test it. Best add some content nodes and some menu-items pointing to them. /node/1 of the backend is available under /node/1 in the frontend. You should see some naked frontend with menus, breadcrumbs & basic node-content (body field) working.


## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
