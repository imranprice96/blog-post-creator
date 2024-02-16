import { Link } from "react-router-dom";
import "../styles/CommentCreate.css";

const CommentCreate = (props) => {
  return (
    <div className="container">
      <div className="main-body">
        <Link to="/" className="arrow">
          &larr;
        </Link>
      </div>
    </div>
  );
};

export default CommentCreate;
