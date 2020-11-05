import React, { useState } from "react";
import { Button, Input } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
const { TextArea } = Input;

const Comments = ({ postId, refreshFunction, commentLists }) => {
  const user = useSelector((state) => state.user.userData);
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const variables = {
      content: comment,
      writer: user._id,
      postId: postId,
    };
    // console.log(variables);
    const response = await axios.post("/api/comment/saveComment", variables);
    if (response.data.success) {
      // console.log(response.data.result);
      setComment("");
      refreshFunction(response.data.result);
    } else {
      alert("Failed to save comment");
    }
  };
  return (
    <div>
      <br />
      <p>replies</p>
      {/* Comment Lists */}
      {/* {console.log(commentLists)} */}
      {commentLists &&
        commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment
                  comment={comment}
                  postId={postId}
                  refreshFunction={refreshFunction}
                />
                <ReplyComment
                  commentLists={commentLists}
                  postId={postId}
                  refreshFunction={refreshFunction}
                  parentCommentId={comment._id}
                />
              </React.Fragment>
            )
        )}

      {/* Root Comment From */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={comment}
          placeholder="write some comments"
        />
        <br />
        <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Comments;
