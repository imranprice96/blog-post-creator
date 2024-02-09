//import "../styles/Post.css";
import moment from "moment";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import styled from "styled-components";

function Post({ post }) {
  function getDate(date) {
    const dateFormat = "Do MMMM YYYY, h:mm:ss a";
    return moment(date).format(dateFormat);
  }

  return (
    <Link to={`posts/${post._id}`}>
      <StyledPostContainer>
        <PostTitle>{parse(post.title)}</PostTitle>
        <PostInfo>
          <p>Posted: {getDate(post.createdAt)}</p>
          <p>Updated: {getDate(post.updatedAt)}</p>
        </PostInfo>
      </StyledPostContainer>
    </Link>
  );
}

export default Post;

const StyledPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 1rem;
  background-color: var(--box-inner);
  gap: 0.5rem;
  border-bottom: 2px dotted var(--hover);
  &:hover {
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  }
`;

const PostTitle = styled.h2`
  text-overflow: ellipsis;
  font-size: 1.5rem;
  width: 50%;
`;

const PostInfo = styled.div`
  font-style: italic;
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
`;

/*
      <div className="post-container">
        <h2>{parse(post.title)}</h2>
        <div className="post-info">
          <p>Posted: {getDate(post.createdAt)}</p>
          <p>Updated: {getDate(post.updatedAt)}</p>
        </div>
      </div>
      */
