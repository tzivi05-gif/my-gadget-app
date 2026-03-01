import { RouteHandler } from "gadget-server";

const route: RouteHandler = async ({ api, reply, logger }) => {
  try {
    // Query the first 4 products from the database
    // Note: The shopifyProduct model doesn't have an images relationship in the current schema
    // If images are added to the model in the future, they can be selected through the relationship
    const products = await api.shopifyProduct.findMany({
      first: 4,
      filter: {
        status: { equals: "active" }
        // To filter by product type 'mug', add:
        // productType: { equals: "mug" }
      },
      select: {
        id: true,
        title: true,
        handle: true,
        body: true
      }
    });

    // Map the products to the desired response format
    const featuredProducts = products.map((product) => ({
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.body,
      imageUrl: null // Images relationship not available in current schema
    }));

    await reply.send({
      products: featuredProducts
    });
  } catch (error) {
    logger.error({ error }, "Error fetching featured products");
    await reply.code(500).send({ error: "Failed to fetch featured products" });
  }
};

route.options = {
  cors: {
    origin: true
  }
};

export default route;