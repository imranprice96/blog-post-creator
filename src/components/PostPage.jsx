import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import "../styles/PostPage.css";
import Comments from "./Comments";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

function PostPage() {
  const { postid } = useParams();
  const [post, setPost] = useState();
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState();
  const [token, setToken] = useState(localStorage.getItem("jwt-token"));

  const [paragraphs, setParagraphs] = useState([]);

  const [comments, setComments] = useState();
  const [commentCount, setCommentCount] = useState(0);
  const url = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  function getDate(date) {
    const dateFormat = "Do MMMM YYYY, h:mm:ss a";
    return moment(date).format(dateFormat);
  }

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(`${url}/api/posts/${postid}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
        //console.log(data.text);
      } catch (err) {
        setError(err.message);
        setPost(null);
      } finally {
        setLoadingPost(false);
      }
    };
    getPost();
  }, []);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetch(`${url}/api/posts/${postid}/comments`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setComments(data.comments);
        setCommentCount(data.comments.length);
        setError(null);
        //console.log(data.comments);
      } catch (err) {
        setError(err.message);
        setComments(null);
      } finally {
        setLoadingComments(false);
      }
    };
    getComments();
  }, []);

  const handlePostDelete = async (postid) => {
    const token = localStorage.getItem("jwt-token");
    const response = await fetch(`${url}/api/posts/${postid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const result = await response.json();
    if (result.success) {
      navigate("/");
    } else {
      alert(result.error);
    }
  };

  if (error) {
    return (
      <div className="container">
        <div className="main-body">
          <Link to="/" className="arrow">
            &larr;
          </Link>
          <p>Error loading post {error}</p>
        </div>
      </div>
    );
  } else if (loadingComments || loadingPost) {
    return (
      <div className="container">
        <div className="post-body">
          <p></p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="postpage-body">
          <Link to="/" className="arrow">
            &larr;
          </Link>
          <div className="post-body">
            {token != null && (
              <span className="post-button-wrapper">
                <Link to="/posts/create" state={post} className="edit-link">
                  <button className="edit-btn">Edit</button>
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you wish to delete this post?"
                      )
                    ) {
                      handlePostDelete(postid);
                    }
                  }}
                >
                  Delete
                </button>
              </span>
            )}

            <h1>{parse(post.title)}</h1>
            <h2 className="post-status">
              ({post.published ? "Published" : "Not published"})
            </h2>

            <hr></hr>
            <p className="post-text">{parse(post.text)}</p>
            <hr></hr>
            <div className="post-footer">
              <p className="postpage-info">Posted: {getDate(post.createdAt)}</p>
              <p className="postpage-info">
                Updated: {getDate(post.updatedAt)}
              </p>
            </div>
          </div>
          <Comments
            comments={comments}
            count={commentCount}
            setCommentCount={setCommentCount}
            setComments={setComments}
            postid={postid}
          />
        </div>
      </div>
    );
  }
}

export default PostPage;
