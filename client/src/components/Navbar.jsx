import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          URL Shortener
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/analytics"
          style={{ marginLeft: "auto" }}
        >
          Analytics
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
