import { CardContent, Button, Typography, ButtonBase } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import {
  CardContainer,
  MediaCard,
  Overlay,
  Overlay2,
  Details,
  Title,
  ActionCard,
  BtnBase,
} from "./style";
import { useDispatch } from "react-redux";
import {
  useDeletePostMutation,
  useLikePostMutation,
} from "../../../redux/services/api";
import { removePost, likeAnyPost } from "../../../redux/features/postSlice";
import { useNavigate } from "react-router-dom";

const Likes = ({ post, user }) => {
  if (post?.likes?.length > 0) {
    return post.likes.find(
      (like) => like === (user?.result?.sub || user?.result?._id)
    ) ? (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;
        {post.likes.length > 2
          ? `You and ${post.likes.length - 1} others`
          : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
      </>
    ) : (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
      </>
    );
  }

  return (
    <>
      <ThumbUpAltOutlinedIcon fontSize="small" />
      &nbsp;Like
    </>
  );
};

const Post = ({ post, setCurrentId, formRef }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };
  const editBtn = () => {
    setCurrentId(post?._id);
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <CardContainer raised elevation={6}>
      <BtnBase onClick={openPost}>
        <MediaCard image={post?.selectedFile} title={post?.title} />
        <Overlay>
          <Typography variant="h6">{post?.name}</Typography>
          <Typography variant="body2">
            {moment(post?.createdAt).fromNow()}
          </Typography>
        </Overlay>
        {/* <Overlay2>
          {(user?.result?.sub === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button
              style={{
                color: "white",
                minWidth: "0",
                zIndex: 100,
              }}
              size="small"
              onClick={() => setCurrentId(post?._id)}
            >
              <MoreHorizIcon fontSize="small" />
            </Button>
          )}
        </Overlay2> */}
        <Details>
          <Typography variant="body2" color="textSecondary">
            {post?.tags.map((tag) => ` #${tag}`)}
          </Typography>
        </Details>
        <Title variant="h5" gutterBottom>
          {post?.title}
        </Title>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post?.message}
          </Typography>
        </CardContent>
      </BtnBase>
      <Overlay2>
        {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            style={{
              color: "white",
              minWidth: "0",
              zIndex: 100,
            }}
            size="small"
            onClick={editBtn}
          >
            <MoreHorizIcon fontSize="small" />
          </Button>
        )}
      </Overlay2>
      <ActionCard>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => {
            likePost({ id: post._id, ...post });
            dispatch(
              likeAnyPost({
                ...post,
                userId: user.result._id ? user.result._id : user.result.sub,
              })
            );
          }}
        >
          <Likes post={post} user={user} />
        </Button>
        {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              deletePost(post?._id);
              dispatch(removePost(post?._id));
            }}
          >
            <DeleteIcon fontSize="small" color="secondary" />
            &nbsp; Delete
          </Button>
        )}
      </ActionCard>
    </CardContainer>
  );
};
export default Post;
