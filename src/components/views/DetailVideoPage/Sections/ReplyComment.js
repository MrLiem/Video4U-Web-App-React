import React, { useState, useEffect } from "react";
import SingleComment from "./SingleComment";

const ReplyComment = ({
  commentLists,
  postId,
  refreshFunction,
  parentCommentId,
}) => {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    commentLists.map((comment) => {
      if (comment.responseTo === parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [commentLists, parentCommentId]);

  let renderReplyComment = (parentCommentId) => {
    return commentLists.map((comment, index) => (
      <React.Fragment key={index}>
        {comment.responseTo === parentCommentId && (
          <div style={{ marginLeft: "50px", width: "80%" }}>
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
          </div>
        )}
      </React.Fragment>
    ));
  };

  const handleChange = () => {
    setOpenReplyComments(!openReplyComments);
  };
  return (
    <div>
      {childCommentNumber > 0 && (
        <p
          style={{
            fontSize: "14px",
            margin: 0,
            color: "gray",
            cursor: "pointer",
          }}
          onClick={handleChange}
        >
          View {childCommentNumber} more comment(s)
        </p>
      )}

      {openReplyComments && renderReplyComment(parentCommentId)}
    </div>
  );
};

export default ReplyComment;
