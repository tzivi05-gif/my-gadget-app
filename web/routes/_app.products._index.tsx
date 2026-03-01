import { AutoTable } from "@gadgetinc/react/auto/polaris";
import { Page, Layout, Card, Text, Box, BlockStack } from "@shopify/polaris";
import { api } from "../api";

export default function Products() {
  return (
    <Page title="Products">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Box paddingBlockEnd="200">
                <Text as="p" variant="bodyMd">
                  View and manage all products synced from your Shopify store.
                </Text>
              </Box>
              <AutoTable
                model={api.shopifyProduct}
                columns={["title", "handle", "status", "productType", "vendor"]}
              />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}