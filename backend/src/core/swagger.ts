import swaggerJSDoc, { Options } from "swagger-jsdoc";
import path from "path";

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VERDANT MARKET API',
      version: '1.0',
    },
    tags: [
      { name: 'Auth' },
      { name: 'Products' },
      { name: 'Cart' },
      { name: 'Checkout' },
      { name: 'Metrics' },
    ]
  },
  apis: [
    path.resolve(__dirname, '../docs/auth.docs.ts'),
    path.resolve(__dirname, '../docs/products.docs.ts'),
    path.resolve(__dirname, '../docs/cart.docs.ts'),
    path.resolve(__dirname, '../docs/checkout.docs.ts'),
    path.resolve(__dirname, '../docs/metrics.docs.ts'),
  ],
}

export const swaggerCssUrl = `https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.27.0/swagger-ui.min.css`;
export const swaggerSpec = swaggerJSDoc(swaggerOptions);
