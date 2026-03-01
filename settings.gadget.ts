import type { GadgetSettings } from "gadget-server";

export const settings: GadgetSettings = {
  type: "gadget/settings/v1",
  frameworkVersion: "v1.6.0",
  plugins: {
    connections: {
      shopify: {
        apiVersion: "2026-01",
        enabledModels: [
          "shopifyOrder",
          "shopifyOrderLineItem",
          "shopifyProduct",
          "shopifyProductVariant",
        ],
        type: "partner",
        scopes: ["write_app_proxy", "write_orders", "write_products"],
      },
    },
  },
};
