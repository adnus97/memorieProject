import Post from "./Post/Post";
import { Grid, CircularProgress } from "@mui/material";
import { MainContainer } from "./style";
import { useSelector } from "react-redux";

const Posts = ({ isFetching, setCurrentId, formRef }) => {
  const { posts } = useSelector((state) => state.posts);

  if (isFetching) {
    return <CircularProgress />;
  }
  return !posts?.length ? (
    "no posts found"
  ) : (
    <MainContainer container alignItems="Stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post?._id} item xs={12} sm={12} md={6} lg={4} xl={3}>
          <Post post={post} setCurrentId={setCurrentId} formRef={formRef} />
        </Grid>
      ))}
    </MainContainer>
  );
};

export default Posts;
