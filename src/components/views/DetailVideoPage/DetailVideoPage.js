import React, { useState, useEffect } from "react";
import { List, Avatar, Row, Col } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscriber from "./Sections/Subscriber";
import Comments from "./Sections/Comments";
import LikeDislikes from "./Sections/LikeDislikes";
const DetailVideoPage = (props) => {
  const videoId = props.match.params.videoId;
  const videoVariable = {
    videoId,
  };
  const [video, setVideo] = useState({});
  const [commentLists, setCommentLists] = useState([]);
  useEffect(() => {
    const getVideo = async () => {
      const response = await axios.post("/api/video/getVideo", videoVariable);
      if (response.data.success) {
        setVideo(response.data.video);
      } else {
        alert("Failed to get video Info");
      }
    };
    const getComments = async () => {
      const response = await axios.post(
        "/api/comment/getComments",
        videoVariable
      );
      if (response.data.success) {
        console.log("detail data comments");
        setCommentLists(response.data.comments);
      } else {
        alert("Failed to get video Info");
      }
    };
    getVideo();
    getComments();
  }, []);
  const updateComment = (newComment) => {
    setCommentLists(commentLists.concat(newComment));
  };
  return (
    <Row>
      <Col lg={18} xs={24}>
        <div
          className="postPage"
          style={{ width: "100%", padding: "3rem 4rem" }}
        >
          {video.filePath !== undefined && (
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.filePath}`}
              controls
            ></video>
          )}

          <List.Item
            actions={[
              <LikeDislikes
                video
                videoId={videoId}
                userId={localStorage.getItem("userId")}
              />,
              video.writer && (
                <Subscriber
                  userTo={video.writer._id}
                  userFrom={localStorage.getItem("userId")}
                />
              ),
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={video.writer && video.writer.image} />}
              title={<a href="https://ant.design">{video.title}</a>}
              description={video.description}
            />
            <div></div>
          </List.Item>
          <Comments
            commentLists={commentLists}
            postId={video._id}
            refreshFunction={updateComment}
          />
        </div>
      </Col>
      <Col lg={6} xs={24}>
        <SideVideo />
      </Col>
    </Row>
  );
};

export default DetailVideoPage;
