import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { BASE_URL, generateShortUrl } from "../apis/api";

const Home = ({ onSubmit }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);

  useEffect(() => {
    // Retrieve short URLs from local storage on component mount
    const storedShortUrls = localStorage.getItem("shortUrls");
    if (storedShortUrls) {
      setShortUrls(JSON.parse(storedShortUrls));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const shortUrlData = await generateShortUrl({ originalUrl });
      const shortUrl = `${BASE_URL}/${shortUrlData.shortenedUrl}`;
      setShortenedUrl(shortUrl);
      // Update short URLs in state and local storage
      const updatedShortUrls = [...shortUrls, { originalUrl, shortUrl }];
      setShortUrls(updatedShortUrls);
      localStorage.setItem("shortUrls", JSON.stringify(updatedShortUrls));
    } catch (error) {
      console.error("Error generating short URL:", error);
    }
    setOriginalUrl("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Grid item xs={12} sm={8} md={6}>
        <Box boxShadow={3} p={4} borderRadius={8} bgcolor="white">
          <Typography variant="h4" gutterBottom>
            URL Shortener
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Enter URL"
              variant="outlined"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              style={{ marginBottom: 16 }}
            />
            <Button variant="contained" type="submit" color="primary">
              Shorten
            </Button>
          </form>
          {shortenedUrl && (
            <Box mt={2} display="flex" alignItems="center">
              <Typography
                variant="body1"
                component="p"
                style={{ marginRight: 8 }}
              >
                Shortened URL:{" "}
                <a
                  href={shortenedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortenedUrl}
                </a>
              </Typography>
              <IconButton onClick={copyToClipboard}>
                <FileCopyIcon />
              </IconButton>
            </Box>
          )}
          {shortUrls.length > 0 && (
            <Box mt={4}>
              <Typography variant="h5" gutterBottom>
                Short URL History
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Original URL</TableCell>
                      <TableCell>Shortened URL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shortUrls.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.originalUrl}</TableCell>
                        <TableCell>
                          <a
                            href={item.shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.shortUrl}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
