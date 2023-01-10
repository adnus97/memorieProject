import { styled } from "@stitches/react";
import { Avatar, Button, Paper } from "@mui/material";

export const PaperComp = styled(Paper, {
  marginTop: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
});

export const AvatarComp = styled(Avatar, {
  margin: "10px",
  backgroundColor: "#e75480 !important",
});
export const Form = styled("form", {
  width: "100%",
  marginTop: "10px",
});
export const SubmitButton = styled(Button, {
  marginTop: "25px !important",
  marginBottom: "15px !important",
});
export const ChangeFormButton = styled(Button, {
  color: "#000 !important",
});
