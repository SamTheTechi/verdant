import rateLimit from 'express-rate-limit';

const RateLimit = rateLimit({
  windowMs: 1000,
  max: 10,
  message: `Too many request`,
});

export default RateLimit;
