![H](./assets/header_image.png)

# Tenant Rent Dashboard

## Goals

The app aim to provide **landlords betterways to manage and track their tenants info (rent payment, tenancy length)**

We provide the following tools to help them achieve that:

### Invoice Generator
A RECEIPT panel where we can create a payment receipt for registered tenants.
The receipt / invoice can either be digitally downloaded or printed out.
The data should also be linked back to the TENANTS panel, so that we can overview
the overall payment history.
...

[invoice_creation_showcase.webm](https://github.com/user-attachments/assets/8158b757-2198-42dc-ba06-d1af9b072adc)

> Inspired by [al1abb/Invoify](https://github.com/al1abb/invoify)
  

### Tenant Info Dashboard
A clear illustration of each tenants rent payment situation in the TENANTS
panel, with the ability to click each one to get better details

[tenant_creation_showcase.webm](https://github.com/user-attachments/assets/08cb734f-2c1c-4252-a9cd-80d30b807ad8)

## Technology Stacks

The application take advantage of the NEXT.JS framework to handle things
like page routing and caching. And Daisy UI library for front-end delivery.
PostgreSQL is used as the DBMS.

## Deploy

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Getting Started

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

### Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
