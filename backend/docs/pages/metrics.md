# Metrics

Metrics routes are mounted under `/api/v1`.

## GET `/api/v1/metrics`

Export Prometheus-compatible application and process metrics.

**Auth required:** No

### Success response

Status: `200 OK`

Content type: `text/plain`

```text
# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.
# TYPE process_cpu_user_seconds_total counter
process_cpu_user_seconds_total 0.03
# HELP process_cpu_system_seconds_total Total system CPU time spent in seconds.
# TYPE process_cpu_system_seconds_total counter
process_cpu_system_seconds_total 0.01
```

### Error responses

- `500 Internal Server Error`
