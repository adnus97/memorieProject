import { styled } from "../../stiches.theme";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export const AppBarComp = styled(AppBar, {
  borderRadius: "15px",
  margin: "30px 0",
  display: "flex",
  flexDirection: "row !important",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 30px",
  "@bp5": {
    paddingLeft: "0",
    flexDirection: "column !important",
  },
});

export const BrandContainer = styled(Link, {
  display: "flex",
  alignItems: "center",
  "@bp4": {
    // width: "200px",
    //  alignSelf: "flex-end",
    paddingBottom: "10px",
  },
});

export const Purple = styled(Avatar, {
  color: "white !important",
  backgroundColor: "#905E96 !important",
});

export const UserName = styled(Typography, {
  display: "flex",
  alignItems: "center",
  "@bp5": {
    fontSize: "1rem !important",
  },
});

export const Profile = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

export const ToolbarComp = styled(Toolbar, {
  display: "flex",
  justifyContent: "flex-end",
  width: "400px",
  "@bp2": {
    width: "320px",
  },
  "@bp4": {
    width: "270px",
  },
});
