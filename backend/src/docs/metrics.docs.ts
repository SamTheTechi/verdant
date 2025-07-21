
/**
 * @openapi
 * /api/v1/metrics:
 *   get:
 *     tags:
 *       - Metrics
 *     summary: Export Prometheus metrics
 *     description: Provides system and application metrics in the Prometheus format.
 *     responses:
 *       200:
 *         description: Success. Returns metrics in the Prometheus text format.
 *         content:
 *           text/plain:
 *             example: |
 *               # HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.
 *               # TYPE process_cpu_user_seconds_total counter
 *               process_cpu_user_seconds_total 0.03
 *               # HELP process_cpu_system_seconds_total Total system CPU time spent in seconds.
 *               # TYPE process_cpu_system_seconds_total counter
 *               process_cpu_system_seconds_total 0.01
 *               # HELP redis_set_total Total number of Redis SET operations.
 *               # TYPE redis_set_total counter
 *               redis_set_total 0
 *               # HELP redis_get_total Total number of Redis GET operations.
 *               # TYPE redis_get_total counter
 *               redis_get_total 0
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: oops server error
 */

export {};

