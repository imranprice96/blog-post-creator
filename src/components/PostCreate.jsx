import { Link } from "react-router-dom";
import "../styles/PostCreate.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostCreate = ({ postData }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [published, setPublished] = useState(false);
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [postid, setPostId] = useState("");

  if (postData) {
    setTitle(postData.title);
    setText(postData.text);
    setPublished(postData.published);
    setPostId(postData.postid);
  }

  const handleCheck = () => {
    setPublished(!published);
  };

  const handleSubmit = (e) => {
    postid != "" ? handleUpdate(e) : handleNew(e);
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
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={100}
            />
            <label htmlFor="text">Text:</label>
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
              <input type="checkbox" value={published} onChange={handleCheck} />
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
