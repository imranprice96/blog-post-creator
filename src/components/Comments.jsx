import Comment from "./Comment";
import "../styles/Comments.css";
import { useState } from "react";

function Comments({ comments, postid, count }) {
  const [data, setData] = useState({ username: "", text: "" });
  const url = import.meta.env.VITE_API_URL;

  return (
    <div className="comment-container">
      <h2 className="comment-heading">Comments ({count})</h2>{" "}
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment._id} className="comment-list-item">
            <Comment comment={comment} postid={postid} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
