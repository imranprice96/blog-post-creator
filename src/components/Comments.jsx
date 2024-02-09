import Comment from "./Comment";
import "../styles/Comments.css";
import { useState } from "react";

function Comments({ comments }) {
  const [data, setData] = useState({ username: "", text: "" });
  const url = import.meta.env.VITE_API_URL;

  return (
    <div className="comment-container">
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment._id} className="comment-list-item">
            <Comment comment={comment} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
