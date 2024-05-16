import axios from "axios";
export const BASE_URL = "http://localhost:8000/v1";

export const generateShortUrl = async (originalUrl) => {
  try {
    const response = await axios.post(`${BASE_URL}/shorten`, originalUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting data:", error);
    throw error;
  }
};

export const getAnalytics = async (url) => {
  try {
    console.log(url);
    const Url = url.url;
    const parts = Url.split("/");
    const shortUrl = parts[parts.length - 1];
    const response = await axios.post(
      `${BASE_URL}/analytics`,
      { shortUrl },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("====================================");
    console.log(response.data);
    console.log("====================================");
    return response.data;
  } catch (error) {
    console.error("Error submitting data:", error);
    throw error;
  }
};
