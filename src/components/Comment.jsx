import moment from "moment";
import "../styles/Comment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import parse from "html-react-parser";

function Comment({ comment, postid }) {
  function getDate(date) {
    const dateFormat = "Do MMMM YYYY";
    return moment(date).format(dateFormat);
  }

  const handleCommentDelete = async (commentid, postid) => {
    const response = await fetch(
      `${url}/api/posts/${postid}/comments/${commentid}`,
      {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
  };

  return (
    <div>
      <span className="comment-button-wrapper">
        <div
          className="delete-button"
          onClick={() => {
            if (window.confirm("Are you sure you wish to delete this item?")) {
              //handleCommentDelete();
              console.log(comment);
              console.log(postid);
            }
          }}
        >
          <button>Delete</button>
        </div>
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
