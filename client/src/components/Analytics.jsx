import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Container,
} from "@mui/material";
import { getAnalytics } from "../apis/api";

const Analytics = () => {
  const [url, setUrl] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    if (showTable) {
      fetchAnalyticsData();
    }
  }, [showTable]);

  const fetchAnalyticsData = async () => {
    try {
      const data = await getAnalytics({ url });
      setAnalyticsData(data.ipAddressDetails || []);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      // Optionally, set an error state or display an error message on the UI
    }
  };

  const handleTrackClick = () => {
    setShowTable(true); // Show the table when track is clicked
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h3" gutterBottom>
          Analytics
        </Typography>

        <Box maxWidth={400} margin="auto">
          <TextField
            label="Enter Short URL"
            variant="outlined"
            style={{ marginBottom: 16, width: "100%" }}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleTrackClick}
            style={{ marginBottom: 16, width: "100%" }}
          >
            Track
          </Button>
        </Box>

        <Typography variant="h6">
          Total Clicks:{" "}
          {analyticsData.length > 0 ? analyticsData[0].totalClicks : 0}
        </Typography>
      </Box>

      {showTable && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Clicks Details
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Map through the analyticsData and display in the table */}
                {analyticsData.length > 0 ? (
                  analyticsData[0].ipAddressData.map((ip) => (
                    <TableRow key={ip._id}>
                      <TableCell>{ip._id}</TableCell>
                      <TableCell>{ip.ipAddress}</TableCell>
                      <TableCell>{ip.location}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <Typography>No IP Address Details Found</Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
};

export default Analytics;
