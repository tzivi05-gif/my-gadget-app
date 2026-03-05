# Empowered Gadget App

A Shopify app built with Gadget that syncs store data and adds product recommendations to the storefront.

## What it does

- **Syncs Shopify data** – Products, orders, and shop info to Gadget
- **Admin dashboard** – View shop info, products, and orders inside Shopify admin
- **Theme extension** – "Featured Mugs" block for product recommendations on the storefront

## Getting started

1. **Clone** the repository and install dependencies:
   ```bash
   yarn install
   ```
2. **Sync with Gadget** (keeps local code and Gadget environment in sync):
   ```bash
   ggt dev
   ```
3. **Start the Shopify app**:
   ```bash
   yarn shopify:dev
   ```

## Prerequisites

- Node.js, Yarn
- [Gadget CLI](https://docs.gadget.dev) (ggt)
- Shopify CLI
