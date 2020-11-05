import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import LikeDislikes from "./LikeDislikes";
const { TextArea } = Input;

const SingleComment = ({ postId, comment, refreshFunction }) => {
  const user = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState("");
  const [openReply, setOpenReply] = useState(false);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onOpenReply = () => {
    setOpenReply(!openReply);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const variables = {
      writer: user.userData._id,
      postId: postId,
      responseTo: comment._id,
      content: commentValue,
    };

    const response = await axios.post("/api/comment/saveComment", variables);
    if (response.data.success) {
      setCommentValue("");
      setOpenReply(!openReply);
      refreshFunction(response.data.result);
    } else {
      alert("Failed to save Comment");
    }
  };

  const actions = [
    <LikeDislikes
      comment
      commentId={comment._id}
      userId={localStorage.getItem("userId")}
    />,
    <span onClick={onOpenReply} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={comment.writer.name}
        avatar={<Avatar src={comment.writer.image} />}
        content={<p>{comment.content}</p>}
      ></Comment>
      {openReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleChange}
            value={commentValue}
            placeholder="write some comments"
          />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default SingleComment;
