import { useState, useEffect } from "react";
import "../styles/App.css";
import Post from "./Post";
import { Link } from "react-router-dom";

function App() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const url = import.meta.env.VITE_API_URL;
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${url}/api/posts`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.posts);
        //console.log(data.posts);
      } catch (err) {
        setError(err.message);
        setPosts(null);
      } finally {
        setLoading(false);
      }
    };
    setToken(localStorage.getItem("jwt-token"));
    fetchPosts();
  }, []);

  if (error) {
    return (
      <div className="container">
        <div className="main-body">
          <p>Error loading posts: {error}</p>
        </div>
      </div>
    );
  } else if (loading) {
    return (
      <div className="container">
        <div className="main-body">
          <p></p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="main-body">
          <span className="create-wrapper">
            <Link to={"/posts/create"} className="create-link">
              <button className="create-btn">Create post</button>
            </Link>
          </span>
          <div className="published-container">
            <h2 className="published-heading">Published</h2>
            {posts.map(
              (post) => post.published && <Post key={post._id} post={post} />
            )}
          </div>
          <hr></hr>
          <div className="not-published-container">
            <h2 className="published-heading">
              {token != null ? "Not Published" : ""}
            </h2>
            {posts.map(
              (post) =>
                !post.published &&
                token != null && <Post key={post._id} post={post} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
