import { AutoTable } from "@gadgetinc/react/auto/polaris";
import { Page, Layout, Card, Text, Box, BlockStack } from "@shopify/polaris";
import { api } from "../api";

export default function Orders() {
  return (
    <Page title="Orders">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Box paddingBlockEnd="200">
                <Text as="p" variant="bodyMd">
                  View all orders synced from your Shopify store.
                </Text>
              </Box>
              <AutoTable
                model={api.shopifyOrder}
                columns={["name", "email", "financialStatus", "fulfillmentStatus", "totalPrice"]}
              />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
