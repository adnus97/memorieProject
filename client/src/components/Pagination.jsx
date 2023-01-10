import { Pagination, PaginationItem } from "@mui/material";
import { PaginationComponent } from "./styles";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getPosts } from "../redux/features/postSlice";

import { useDispatch, useSelector } from "react-redux";

export const Paginate = ({ currentData, page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    if (page) {
      dispatch(getPosts(currentData));
    }
  }, [currentData, page]);

  return (
    <PaginationComponent
      count={numberOfPages}
      page={Number(page || 1)}
      variant="outlined"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};
