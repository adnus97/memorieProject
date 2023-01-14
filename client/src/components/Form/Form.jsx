import { forwardRef, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import Filebase from "react-file-base64";
import {
  useCreateNewPostMutation,
  useUpdatePostMutation,
} from "../../redux/services/api";
import { ButtonSubmit, FileInput, FormComp, PaperComp } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { editPost, addPost } from "../../redux/features/postSlice";
import { useNavigate } from "react-router-dom";

const Form = forwardRef(({ currentId, setCurrentId }, ref) => {
  const [createNewPost, response] = useCreateNewPostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const user = JSON.parse(localStorage.getItem("profile"));

  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.posts);
  const post = currentId ? posts.find((p) => p._id === currentId) : null;
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      updatePost({ id: currentId, ...postData, name: user?.result?.name });
      dispatch(
        editPost({ id: currentId, ...postData, name: user?.result?.name })
      );
    } else {
      createNewPost({ ...postData, name: user?.result?.name })
        .unwrap()
        .then((data) => {
          dispatch(addPost(data));
          const addedId = localStorage.getItem("addedId");
          navigate(`/posts/${addedId}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    clear();
  };
  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setCurrentId(null);
  };
  if (!user?.result?.name) {
    return (
      <PaperComp>
        <Typography variant="h6" align="center">
          Please sign in to create your own memories and like other's
        </Typography>
      </PaperComp>
    );
  }
  return (
    <PaperComp elevation={6}>
      <FormComp autoComplete="off" noValidate onSubmit={handleSubmit} ref={ref}>
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          minRows={3}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <FileInput>
          <Filebase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </FileInput>
        <ButtonSubmit
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </ButtonSubmit>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </FormComp>
    </PaperComp>
  );
});
export default Form;
