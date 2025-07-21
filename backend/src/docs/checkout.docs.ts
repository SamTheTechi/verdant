
/**
 * @openapi
 * /api/v1/checkout/buyone:
 *   post:
 *     tags:
 *       - Checkout
 *     summary: Create a Razorpay order for a single product
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
 *         description: Success. Returns the Razorpay order details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order_id:
 *                   type: string
 *                   example: order_abcdef123456
 *                 amount:
 *                   type: number
 *                   example: 10000
 *       400:
 *         description: Bad Request - Invalid user ID or product ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: invalid userId and productId
 *       404:
 *         description: Not Found - Product not found.
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
 * /api/v1/checkout/checkout:
 *   get:
 *     tags:
 *       - Checkout
 *     summary: Create a Razorpay order for the entire cart
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Success. Returns the Razorpay order details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order_id:
 *                   type: string
 *                   example: order_abcdef123456
 *                 amount:
 *                   type: number
 *                   example: 10000
 *       400:
 *         description: Bad Request - Invalid user ID or total price is invalid.
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
 *                   example: cart not found
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
 * /api/v1/pay/varify:
 *   post:
 *     tags:
 *       - Checkout
 *     summary: Verify a Razorpay payment
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - razorpay_order_id
 *               - razorpay_payment_id
 *               - razorpay_signature
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *                 example: order_abcdef123456
 *               razorpay_payment_id:
 *                 type: string
 *                 example: pay_abcdef123456
 *               razorpay_signature:
 *                 type: string
 *                 example: 9e4567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
 *     responses:
 *       200:
 *         description: Payment verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad Request - Invalid signature.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid signature
 */

export { };
