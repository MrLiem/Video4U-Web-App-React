import React, { useState, useEffect } from "react";
// import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from "antd";
import axios from "axios";
import moment from "moment";
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const getVideos = async () => {
      const response = await axios.get("/api/video/getVideos");
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        alert("Failed to get Videos");
      }
    };
    getVideos();
  });

  const renderCard = videos.map((video, index) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "320px" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
            <div
              className="duration"
              style={{
                bottom: 0,
                right: 0,
                position: "absolute",
                margin: "4px",
                color: "#fff",
                backgroundColor: "rgba(17,17,17,0.8)",
                opacity: "0.8",
                padding: "2px 4px",
                borderRadius: "2px",
                letterSpacing: "0.5",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "12px",
              }}
            >
              <span>
                {minutes}: {seconds}
              </span>
            </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
        />
        <span>{video.writer.name}</span>
        <span style={{ marginLeft: "3rem" }}>{video.views}</span>-
        <span>{moment(video.createdAt).format("MMM Do YY")}</span>
      </Col>
    );
  });
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Recommended</Title>
      <hr />
      {renderCard}
    </div>
  );
}

export default LandingPage;
