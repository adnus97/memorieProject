import { styled } from "@stitches/react";
import { TextField, Button, Typography, Paper } from "@mui/material";
export const PaperComp = styled(Paper, {
  padding: "10px",
});
export const FormComp = styled("form", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  "& .MuiTextField-root": {
    margin: "7px",
  },
});
export const FileInput = styled("div", {
  width: "97%",
  margin: "10px 0",
});
export const ButtonSubmit = styled(Button, {
  marginBottom: "10px !important",
});
