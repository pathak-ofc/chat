import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../lib/arcjet.js"; 

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied()){
        if (decision.reason.isRateLimit()) {
            return res.status(429).json({ message: "Too Many Requests" });
        }
        else if (decision.reason.isBot()) {
            return res.status(403).json({ message: "Forbidden: Bot Detected" });
        }
        else {
            return res.status(403).json({ message: "Forbidden: Access Denied" });
        }
    }

    if (decision.results.some(isSpoofedBot)) {
        return res.status(403).json({ error: "Forbidden: Spoofed Bot Detected" }, {message: "Malicious Activity Detected" });
    }
    next();
  } 
  catch (error) {
    console.error("Arcjet Middleware Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
    next();
  }
};

export default arcjetMiddleware;