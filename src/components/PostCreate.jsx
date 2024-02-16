import { Link } from "react-router-dom";
import "../styles/PostCreate.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";

const PostCreate = () => {
  const location = useLocation();
  const postData = location.state;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [published, setPublished] = useState(false);
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [postid, setPostId] = useState("");

  useEffect(() => {
    if (postData) {
      setTitle(parse(postData.title));
      setText(parse(postData.text));
      setPublished(postData.published);
      setPostId(postData._id);
    }
  }, []);

  const handleCheck = () => {
    setPublished(!published);
  };

  const handleSubmit = (e) => {
    postData != null ? handleUpdate(e) : handleNew(e);
  };

  const handleNew = async (e) => {
    const token = localStorage.getItem("jwt-token");
    e.preventDefault();
    const data = { title: title, text: text, published: published };
    const response = await fetch(`${url}/api/posts/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const result = await response.json();
    if (response.status == 200) {
      alert("Post created successfully");
      navigate("/");
    } else {
      setErrors(result.errors);
    }
  };

  const handleUpdate = async (e) => {
    const token = localStorage.getItem("jwt-token");
    e.preventDefault();
    const data = { title: title, text: text, published: published };
    const response = await fetch(`${url}/api/posts/${postid}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const result = await response.json();
    if (response.status == 200) {
      alert("Post updated successfully");
      navigate("/");
    } else {
      setErrors(result.errors);
    }
  };

  return (
    <div className="container">
      <div className="main-body">
        <Link to="/" className="arrow">
          &larr;
        </Link>
        <div className="create-form-wrapper">
          <form onSubmit={handleSubmit} className="create-post-form">
            <label htmlFor="post-title">Title:</label>
            <input
              type="text"
              name="title"
              id="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={100}
            />
            <label htmlFor="post-text">Text:</label>
            <textarea
              name="text"
              id="post-text"
              rows={8}
              value={text}
              placeholder="Max 5120 characters"
              maxLength={5120}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <span className="published-wrapper">
              {" "}
              <label htmlFor="published">Published:</label>
              <input
                id="published"
                type="checkbox"
                value={published}
                checked={published}
                onChange={handleCheck}
              />
            </span>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      {errors > 0 && (
        <div className="post-errors">
          <ul>{errors}</ul>
        </div>
      )}
    </div>
  );
};

export default PostCreate;
