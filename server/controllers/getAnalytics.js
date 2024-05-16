import { ShortenedURL } from "../models/ShortenedURL.js";
import { IPAddress } from "../models/IPAddress.js";

const getAnalytics = async (req, res) => {
  try {
    const { shortUrl } = req.body;
    const shortenedUrl = await ShortenedURL.findOne({ shortUrl });

    if (!shortenedUrl) {
      return res.status(404).json({ error: "Shortened URL not found" });
    }

    // Find all IP address details for the given short URL
    const ipAddressDetails = await IPAddress.find({
      shortUrlId: shortenedUrl._id,
    });

    res.json({
      shortUrl,
      originalUrl: shortenedUrl.originalUrl,
      ipAddressDetails,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getAnalytics;
