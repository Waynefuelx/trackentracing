This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

This project is configured for automated deployment via GitHub Actions. You have two deployment options:

### Option 1: Deploy to Vercel (Recommended)

Vercel is the recommended platform for Next.js applications. The project includes a GitHub Actions workflow that automatically deploys to Vercel on every push to the `main` branch.

#### Setup Steps:

1. **Create a Vercel account** (if you don't have one):
   - Go to [vercel.com](https://vercel.com) and sign up

2. **Create a new project on Vercel**:
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure the project

3. **Get your Vercel credentials**:
   - Go to Vercel Dashboard → Settings → Tokens
   - Create a new token and copy it
   - Go to your project settings and copy:
     - **Organization ID** (from the project settings URL or API)
     - **Project ID** (from the project settings)

4. **Add GitHub Secrets**:
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `VERCEL_TOKEN`: Your Vercel token
     - `VERCEL_ORG_ID`: Your Vercel organization ID
     - `VERCEL_PROJECT_ID`: Your Vercel project ID

5. **Push to main branch**:
   - The workflow will automatically trigger and deploy your app

The workflow file is located at `.github/workflows/deploy.yml`.

### Option 2: Deploy to GitHub Pages

For GitHub Pages deployment, you'll need to configure Next.js for static export. Note that some Next.js features (like API routes and server-side rendering) won't work with static export.

#### Setup Steps:

1. **Enable GitHub Pages**:
   - Go to your GitHub repository → Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Configure Next.js for static export** (if needed):
   - The workflow will handle the build, but you may need to update `next.config.ts` if you use dynamic routes or server features

3. **Push to main branch**:
   - The workflow will automatically build and deploy to GitHub Pages

The workflow file is located at `.github/workflows/deploy-pages.yml`.

### Manual Deployment

You can also deploy manually using Vercel CLI:

```bash
npm i -g vercel
vercel
```

Or use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) directly.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
