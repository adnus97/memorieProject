import { AppBar, Grid, Pagination } from "@mui/material";
import { styled } from "../../stiches.theme";

export const AppBarSearch = styled(AppBar, {
  borderRadius: "4px",
  marginBottom: "1rem",
  display: "flex",
  padding: "16px",
});
export const PaginationComp = styled(Pagination, {
  borderRadius: "4px",
  marginTop: "1rem",
  padding: "16px",
});
export const GridContainer = styled(Grid, {
  "@bp5": {
    flexDirection: "column-reverse !important",
  },
});
export const PostsGrid = styled(Grid, {
  "@bp5": {
    maxWidth: "100% !important",
  },
});
export const FormGrid = styled(Grid, {
  "@bp5": {
    maxWidth: "100% !important",
  },
});
