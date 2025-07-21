
/**
 * @openapi
 * /api/v1/product:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get a list of products with optional filters
 *     parameters:
 *       - in: query
 *         name: category
 *         description: Filter products by category.
 *       - in: query
 *         name: price
 *         description: Filter products by price (less than or equal to).
 *       - in: query
 *         name: page
 *         description: Page number for pagination.
 *       - in: query
 *         name: sort
 *         description: Sort order for the products (ascending or descending price).
 *     responses:
 *       200:
 *         description: Success. Returns an array of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 getitem:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d0fe4f5e3a6b001c8e3b1a
 *                       name:
 *                         type: string
 *                         example: Example Product
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 99.99
 *                       category:
 *                         type: string
 *                         example: electronics
 *                       image:
 *                         type: string
 *                         example: http://example.com/image.jpg
 *                 length:
 *                   type: number
 *                   example: 1
 *
 * /api/v1/{productId}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get a single product by its ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to retrieve.
 *         schema:
 *           type: string
 *           example: 683f2d0c8d107c4aa12dcdd0
 *     responses:
 *       200:
 *         description: Success. Returns the product details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60d0fe4f5e3a6b001c8e3b1a
 *                 name:
 *                   type: string
 *                   example: Example Product
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 99.99
 *                 category:
 *                   type: string
 *                   example: electronics
 *                 image:
 *                   type: string
 *                   example: http://example.com/image.jpg
 *       404:
 *         description: Not Found - Invalid product ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: invalid parameter
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: server error
 */

export { };

