
/**
 * @openapi
 * /api/v1/cart/item:
 *   get:
 *     tags:
 *       - Cart
 *     summary: Get all items in the user's cart
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Success. Returns an array of cart items.
 *         content:
 *           application/json:
 *       404:
 *         description: Not Found - Invalid user ID.
 *       500:
 *         description: Server Error
 *
 * /api/v1/cart/additem:
 *   post:
 *     tags:
 *       - Cart
 *     summary: Add an item to the cart
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - count
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 60d5ecf4f7b3c2001c8c4d1a
 *               count:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Product added to cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: product added
 *       404:
 *         description: Not Found - Invalid product ID, count, or user ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: invalid productId or count or userId
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
 *
 * /api/v1/cart/clearitem:
 *   patch:
 *     tags:
 *       - Cart
 *     summary: Remove a specific item from the cart
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 60d5ecf4f7b3c2001c8c4d1a
 *     responses:
 *       200:
 *         description: Item removed from cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: item removed
 *       400:
 *         description: Bad Request - Invalid user ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: invalid userId
 *       404:
 *         description: Not Found - Product not found in the database or in the user's cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: product not found
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
 *
 * /api/v1/cart/clearcart:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: Clear all items from the user's cart
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: cart empty
 *       400:
 *         description: Bad Request - Invalid user ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: invalid userId
 *       404:
 *         description: Not Found - User's cart not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user's cart not found
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
