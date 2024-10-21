# Lupus Decoupled Next.js Demo

## What is supported?
- Rendering custom elements via components
- Rendering a tree of custom elements
- Forwarding /some-page requests to the backend and rendering results
- breadcrumbs
- metatags

## Manual setup steps

For local setup you'll get some network error until base URLs are set right. To do so:

1. Set the Drupal base URL(`NEXT_PUBLIC_DRUPAL_BASE_URL`) in `env.file`, e.g. `https://8080-drunomics-lupusdecouple-xeqrf6qqxk4.ws-eu116.gitpod.io`
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
