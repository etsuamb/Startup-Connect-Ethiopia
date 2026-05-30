const securityMonitoringService = require("../services/securityMonitoringService");

const windows = new Map();

function getKey(req, scope) {
  const ip = securityMonitoringService.readIpAddress(req) || "unknown";
  return `${scope}:${ip}`;
}

function hit(key, max, windowMs) {
  const now = Date.now();
  let entry = windows.get(key);
  if (!entry || now - entry.start > windowMs) {
    entry = { start: now, count: 0 };
    windows.set(key, entry);
  }
  entry.count += 1;
  return entry.count > max;
}

/** Rate limit sensitive auth endpoints per IP */
function authRateLimit({ scope, max = 10, windowMs = 15 * 60 * 1000 }) {
  return (req, res, next) => {
    const key = getKey(req, scope);
    if (hit(key, max, windowMs)) {
      return res.status(429).json({
        message: "Too many attempts. Please try again later.",
        code: "RATE_LIMITED",
      });
    }
    next();
  };
}

module.exports = { authRateLimit };
