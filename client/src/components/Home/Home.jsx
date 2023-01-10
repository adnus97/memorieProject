import {
  Container,
  AppBar,
  Grid,
  Grow,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getSearchedPosts } from "../../redux/features/postSlice";
import { useSelector } from "react-redux";
import { Paginate } from "../Pagination";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { AppBarSearch, GridContainer, PostsGrid, FormGrid } from "./styles";
import {
  useFetchPostsBySearchQuery,
  useFetchPostsQuery,
} from "../../redux/services/api";
import { useDebounce } from "../../hooks/useDebounce";
import { useRef } from "react";
// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

export const Home = () => {
  const formRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  // const query = useQuery();
  const navigate = useNavigate();
  const page = searchParams.get("page") || 1;
  const searchQuery = searchParams.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const debounceSearch = useDebounce(search, 500);
  const { data: searchData, isFetching: isFetchingSearch } =
    useFetchPostsBySearchQuery({
      search: debounceSearch,
      tags: tags.join(","),
    });
  const { currentData, isFetching } = useFetchPostsQuery(page, {
    refetchOnMountOrArgChange: true,
  });
  const searchPosts = () => {
    if (isFetchingSearch) {
      return <CircularProgress />;
    }
    if (search.trim() || tags) {
      dispatch(getSearchedPosts(searchData));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPosts();
    }
  };
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag != tagToDelete));
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <GridContainer
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <PostsGrid item xs={12} sm={6} md={9}>
            <Posts
              isFetching={isFetching}
              setCurrentId={setCurrentId}
              formRef={formRef}
            />
          </PostsGrid>
          <FormGrid item xs={12} sm={6} md={3}>
            <AppBarSearch position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onKeyDown={handleKeyPress}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <MuiChipsInput
                sx={{ margin: "10px 0" }}
                label="Search Tags"
                value={tags}
                onAddChip={handleAdd}
                onDeleteChip={handleDelete}
                onKeyDown={handleKeyPress}
                addOnWhichKey={[" "]}
                placeholder="Type and press space"
                variant="outlined"
              />
              <Button onClick={searchPosts} color="primary" variant="contained">
                Search
              </Button>
            </AppBarSearch>

            <Form
              currentId={currentId}
              setCurrentId={setCurrentId}
              ref={formRef}
            />
            {!searchQuery && !tags.length && (
              <Paper elevation={6}>
                <Paginate currentData={currentData} page={page} />
              </Paper>
            )}
          </FormGrid>
        </GridContainer>
      </Container>
    </Grow>
  );
};
