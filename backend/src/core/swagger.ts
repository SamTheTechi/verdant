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
    path.resolve(__dirname, '../docs/*.docs.{ts,js}'),
  ],
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
