import React, { useState, useEffect } from "react";
import { Tooltip, Icon } from "antd";
import axios from "axios";
const LikeDislikes = ({ videoId, commentId, userId }) => {
  const [likes, setLikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikes, setDislikes] = useState(0);
  const [dislikeAction, setDislikeAction] = useState(null);
  let variable = {};
  if (videoId) {
    variable = { videoId, userId };
  } else {
    variable = { commentId, userId };
  }

  useEffect(() => {
    const getLikes = async () => {
      const response = await axios.post("/api/like/getLikes", variable);
      if (response.data.success) {
        // How many likes does this video or comment have
        setLikes(response.data.likes.length);

        //if I already click this like button or not
        response.data.likes.map((like) => {
          if (like.userId === userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Failed to get likes");
      }
    };
    const getDislikes = async () => {
      const response = await axios.post("/api/like/getDislikes", variable);
      if (response.data.success) {
        // How many likes does this video or comment have
        setDislikes(response.data.dislikes.length);

        //if I already click this like button or not
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("Failed to get dislikes");
      }
    };
    getLikes();
    getDislikes();
  }, []);

  const onLike = async () => {
    if (likeAction === null) {
      const response = await axios.post("/api/like/uplike", variable);
      if (response.data.success) {
        setLikes(likes + 1);
        setLikeAction("liked");

        //if dislike button is already clicked
        if (dislikeAction !== null) {
          setDislikeAction(null);
          setDislikes(dislikes - 1);
        }
      } else {
        alert("Failed to increase the like");
      }
    } else {
      const response = await axios.post("/api/like/unlike", variable);
      if (response.data.success) {
        setLikes(likes - 1);
        setLikeAction(null);
      } else {
        alert("Failed to decrease the like");
      }
    }
  };

  const onDislike = async () => {
    if (dislikeAction !== null) {
      const response = await axios.post("/api/like/unDislike", variable);
      if (response.data.success) {
        setDislikes(dislikes - 1);
        setDislikeAction(null);
      } else {
        alert("Failed to decrease dislike");
      }
    } else {
      const response = await axios.post("/api/like/upDislike", variable);
      if (response.data.success) {
        setDislikes(dislikes + 1);
        setDislikeAction("disliked");

        // if like button is already clicked
        if (likeAction !== null) {
          setLikes(likes - 1);
          setLikeAction(null);
        }
      } else {
        alert("Failed to increase dislike");
      }
    }
  };

  return (
    <React.Fragment>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={likeAction === "liked" ? "filled" : "outlined"}
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{likes}</span>
      </span>
      &nbsp;&nbsp;
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={dislikeAction === "disliked" ? "filled" : "outlined"}
            onClick={onDislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{dislikes}</span>
      </span>
    </React.Fragment>
  );
};

export default LikeDislikes;
