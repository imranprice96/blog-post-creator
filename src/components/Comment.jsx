import moment from "moment";
import "../styles/Comment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import parse from "html-react-parser";
import { useEffect, useState } from "react";

function Comment({ comment, postid, setCommentCount, setComments }) {
  const url = import.meta.env.VITE_API_URL;
  function getDate(date) {
    const dateFormat = "Do MMMM YYYY";
    return moment(date).format(dateFormat);
  }
  const [token, setToken] = useState(localStorage.getItem("jwt-token"));

  const handleCommentDelete = async (commentid, postid) => {
    const token = localStorage.getItem("jwt-token");
    const response = await fetch(
      `${url}/api/posts/${postid}/comments/${commentid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const result = await response.json();
    if (result.success) {
      alert("Comment delelted successfully");
      setCommentCount((count) => count - 1);
      setComments((comments) =>
        comments.filter((item) => item._id != comment._id)
      );
    } else {
      alert(result.error);
    }
  };

  return (
    <div>
      <span className="comment-button-wrapper">
        {token != null && (
          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you wish to delete this comment?")
              ) {
                handleCommentDelete(comment._id, postid);
              }
            }}
          >
            Delete
          </button>
        )}
      </span>
      <p className="comment-text">{parse(comment.text)}</p>
      <div className="comment-info">
        <div className="user">
          <FontAwesomeIcon icon={faUser} style={{ color: "#4b5563" }} />
          <p>{parse(comment.username)}</p>
        </div>

        <p>{getDate(parse(comment.createdAt))}</p>
      </div>
    </div>
  );
}
export default Comment;
