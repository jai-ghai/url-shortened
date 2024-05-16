import express from "express";
import generateShortUrl from "../controllers/generateShortUrl.js";
import getIpAddress from "../controllers/ipAddress.js";
import getAnalytics from "../controllers/getAnalytics.js";

const router = express.Router();

router.post("/shorten", generateShortUrl);
router.get("/:shortUrl", getIpAddress);
router.post("/analytics", getAnalytics);

export default router;
