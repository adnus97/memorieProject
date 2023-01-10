import { useEffect, useState } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchPostQuery } from "../../redux/services/api";
import { getPost, getSearchedPosts } from "../../redux/features/postSlice";
import { useFetchPostsBySearchQuery } from "../../redux/services/api";
import { CommentSection } from "./CommentSection";
import {
  ImageSection,
  ImgComponent,
  RecommendedPosts,
  Section,
  Card,
  LoadingPaper,
} from "./style";

export const PostDetails = () => {
  const { id } = useParams();
  const { data, isFetching } = useFetchPostQuery(id);
  const { posts, post } = useSelector((state) => state.posts);
  const { data: recommendedData } = useFetchPostsBySearchQuery({
    search: "none",
    tags: post?.tags.join(","),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) return;
    dispatch(getPost(data));
  }, [data, id]);
  // console.log("post", post);
  useEffect(() => {
    if (!post || !recommendedData) return;
    dispatch(getSearchedPosts(recommendedData));
  }, [post, recommendedData]);
  // console.log("posts", recommendedData);
  const recommendedPosts = posts?.filter?.((el) => el?._id != post?._id);
  //  console.log("recommended", recommendedPosts);
  const openPost = (id) => {
    navigate(`/posts/${id}`);
  };
  if (isFetching)
    return (
      <LoadingPaper elevation={6}>
        <CircularProgress size="7em" />
      </LoadingPaper>
    );
  if (!post) return;
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <Card>
        <Section>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </Section>
        <ImageSection>
          <ImgComponent
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </ImageSection>
      </Card>
      <Divider style={{ margin: "20px 0" }} />

      <CommentSection post={post} />

      <Divider style={{ margin: "20px 0" }} />
      {recommendedPosts?.length ? (
        <Section style={{ width: "100%" }}>
          <Typography gutterBottom variant="h5">
            You might also like :
          </Typography>
          <Divider />
          <RecommendedPosts>
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div
                  key={_id}
                  style={
                    recommendedPosts.length > 3
                      ? {
                          margin: "20px",
                          cursor: "pointer",
                          width: "200px",
                          paddingInline: "20px",
                        }
                      : {
                          margin: "20px",
                          cursor: "pointer",
                        }
                  }
                  onClick={() => openPost(_id)}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    <b> Created by</b>:{name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes?.length}
                  </Typography>
                  <img
                    src={selectedFile}
                    style={{
                      width: "200px",
                      maxHeight: "200px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )
            )}
          </RecommendedPosts>
        </Section>
      ) : (
        ""
      )}
    </Paper>
  );
};
