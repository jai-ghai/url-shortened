import { nanoid } from "nanoid";
import { ShortenedURL } from "../models/ShortenedURL.js";

const generateShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortUrl = nanoid(6);

    const newShortenedURL = new ShortenedURL({
      originalUrl,
      shortUrl,
    });

    await newShortenedURL.save();
    res.json({ shortenedUrl: shortUrl });
  } catch (error) {
    console.error("Error generating shortened URL:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default generateShortUrl;
