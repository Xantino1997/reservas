import React, { useState } from "react";
import "./stylesPages/LikesDislikes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

function LikesDislikes() {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  const handleLikeClick = () => {
    if (likeClicked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
      if (dislikeClicked) {
        setDislikes(dislikes - 1);
        setDislikeClicked(false);
      }
    }
    setLikeClicked(!likeClicked);
  };

  const handleDislikeClick = () => {
    if (dislikeClicked) {
      setDislikes(dislikes - 1);
    } else {
      setDislikes(dislikes + 1);
      if (likeClicked) {
        setLikes(likes - 1);
        setLikeClicked(false);
      }
    }
    setDislikeClicked(!dislikeClicked);
  };

  return (
    <div className="likes-dislikes-container">
      <div>
        <button
          className={`like-button ${likeClicked ? "active" : ""}`}
          onClick={handleLikeClick}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
        <span className="like-count">{likes}</span>
      </div>
      <div>
        <button
          className={`dislike-button ${dislikeClicked ? "active" : ""}`}
          onClick={handleDislikeClick}
        >
          <FontAwesomeIcon icon={faThumbsDown} />
        </button>
        <span className="dislike-count">{dislikes}</span>
      </div>
    </div>
  );
}

export default LikesDislikes;
