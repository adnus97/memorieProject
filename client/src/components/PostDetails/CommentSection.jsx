import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Typography, TextField, Button, Divider } from "@mui/material";
import { CommentsOuterContainer, CommentsInnerContainer, Div } from "./style";
import { useCreateCommentMutation } from "../../redux/services/api";
import { postWithComment } from "../../redux/features/postSlice";
import { useEffect } from "react";

export const CommentSection = ({ post }) => {
  const [comments, setComments] = useState();
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const [createComment] = useCreateCommentMutation();
  const dispatch = useDispatch();
  const commentsRef = useRef();
  useEffect(() => {
    if (post) setComments(post?.comments);
  }, [post]);
  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    createComment({ value: finalComment, id: post._id })
      .unwrap()
      .then((data) => {
        dispatch(postWithComment(data));
        setComments(data.comments);
        commentsRef.current.scrollTo({
          top: commentsRef.current.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setComment("");
  };
  return (
    <div>
      <CommentsOuterContainer>
        <CommentsInnerContainer ref={commentsRef}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((com, i) => (
            <Typography key={i} gutterBottom variant="subtitle2">
              <strong>{com.split(": ")[0]}</strong>: {com.split(":")[1]}
              <Divider />
            </Typography>
          ))}
        </CommentsInnerContainer>
        {user?.result?.name && (
          <Div>
            <Typography gutterBottom variant="h6">
              write a comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
            >
              Comment
            </Button>
          </Div>
        )}
      </CommentsOuterContainer>
    </div>
  );
};
