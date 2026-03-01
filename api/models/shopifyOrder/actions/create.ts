import { applyParams, save, ActionOptions } from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

export const run: ActionRun = async ({ params, record }) => {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
};

export const onSuccess: ActionOnSuccess = async ({ record, logger, api }) => {
  try {
    const priceSet = record.currentTotalPriceSet as { shopMoney?: { amount?: string } } | null;
    const orderTotal = Number(priceSet?.shopMoney?.amount ?? record.totalPrice ?? 0);

    logger.info(`Order total detected: ${orderTotal}`);

    if (orderTotal > 2000) {
      if (!process.env.SLACK_WEBHOOK_URL) {
        logger.error("SLACK_WEBHOOK_URL is not set");
        return;
      }

      const lineItems = (await (api as any).shopifyOrderLineItem.findMany({
        filter: { orderId: { equals: record.id } },
        select: { title: true, quantity: true, price: true },
      })) as Array<{ title: string | null; quantity: number | null; price: string | null }>;

      const itemsList = lineItems
        .map((item) => `  • ${item.quantity}x ${item.title} @ $${item.price}`)
        .join('\n');

      const response = await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🚨 HIGH VALUE ORDER ALERT 🚨
Order: ${record.name}
Total: $${orderTotal}
Customer: ${record.email || 'No email'}
Shop: ${record.shopId}
Items:\n${itemsList || 'No items'}`
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        logger.error({ error: errorText }, "Slack webhook failed");
      } else {
        logger.info(`Slack alert sent for order ${record.name}`);
      }
    }
  } catch (error) {
    logger.error({ error }, "Error sending Slack notification");
  }
};

export const options: ActionOptions = {
  actionType: "create",
};