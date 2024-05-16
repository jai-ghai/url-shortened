import dns from "dns";
import { ShortenedURL } from "../models/ShortenedURL.js";
import { IPAddress } from "../models/IPAddress.js";

const getIpAddress = async (req, res) => {
  try {
    const { shortUrl } = req.params;

    dns.lookup(req.hostname, async (err, address) => {
      if (err) {
        console.error("Error getting IP address:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const shortenedUrl = await ShortenedURL.findOne({ shortUrl });

      if (!shortenedUrl) {
        return res.status(404).json({ error: "Shortened URL not found" });
      }

      const location =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      // Find or create the IPAddress document for the shortUrlId
      let ipAddressEntry = await IPAddress.findOne({
        shortUrlId: shortenedUrl._id,
      });

      if (!ipAddressEntry) {
        // If no existing document, create a new one and set totalClicks to 1
        ipAddressEntry = new IPAddress({
          shortUrlId: shortenedUrl._id,
          ipAddressData: [{ ipAddress: address, location }],
          totalClicks: 1,
        });
      } else {
        // If an existing document exists, update ipAddressData and increment totalClicks
        ipAddressEntry.ipAddressData.push({ ipAddress: address, location });
        ipAddressEntry.totalClicks += 1;
      }

      await ipAddressEntry.save();

      // Redirect the user to the original URL
      res.redirect(shortenedUrl.originalUrl);
    });
  } catch (error) {
    console.error("Error getting IP address and redirecting:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getIpAddress;
