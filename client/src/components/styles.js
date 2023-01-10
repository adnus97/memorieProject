import { styled } from "@stitches/react";
import { Pagination, PaginationItem } from "@mui/material";

export const PaginationComponent = styled(Pagination, {
  marginTop: "20px",
  ">ul": {
    padding: "5px",
    justifyContent: "space-evenly",
  },
});
