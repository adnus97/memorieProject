import { styled } from "../../stiches.theme";
import { Paper } from "@mui/material";

export const ImgComponent = styled("img", {
  borderRadius: "20px",
  objectFit: "cover",
  width: "100%",
  maxHeight: "400px",
});
export const Card = styled("div", {
  display: "flex",
  width: "100%",
  "@bp8": {
    flexWrap: "wrap",
    flexDirection: "column",
  },
});
export const Section = styled("div", {
  borderRadius: "20px",
  margin: "10px",
  flex: 1,
});
export const ImageSection = styled("div", {
  marginLeft: "20px",
  width: "fit-content",
  "@bp5": {
    marginLeft: 0,
  },
});
export const RecommendedPosts = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  "@bp5": {
    flexDirection: "column",
  },
});
export const LoadingPaper = styled(Paper, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  borderRadius: "15px",
  height: "39vh",
});
export const CommentsOuterContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  width: "70%",
  //media
  "@bp5": {
    flexDirection: "column",
    gap: "18px",
    width: "100%",
  },
});
export const CommentsInnerContainer = styled("div", {
  height: "200px",
  overflowY: "auto",
  marginRight: "30px",
  //media
  "@bp8": {
    width: "100%",
  },
});
export const Div = styled("div", {
  width: "60%",
  "@bp8": {
    width: "90%",
  },
});
