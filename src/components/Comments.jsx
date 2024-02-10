import Comment from "./Comment";
import "../styles/Comments.css";

function Comments({ comments, postid, count, setCommentCount, setComments }) {
  return (
    <div className="comment-container">
      <h2 className="comment-heading">Comments ({count})</h2>{" "}
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment._id} className="comment-list-item">
            <Comment
              comment={comment}
              postid={postid}
              setCommentCount={setCommentCount}
              setComments={setComments}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
