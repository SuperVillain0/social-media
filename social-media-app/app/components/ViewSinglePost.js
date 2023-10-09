import React, { useState, useEffect } from "react";
import Page from "./Page";
import LoadingDotsIcon from "./LoadingDotsIcon";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import ReactMarkdown from "react-markdown";
import { Tooltip } from "react-tooltip";

function ViewSinglePost() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    const fetchPost = async () => {
      try {
        const response = await Axios.get(`/post/${id}`, { cancelToken: ourRequest.token });
        setPost(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log("There was a problem or the request timed out.");
      }
    };
    fetchPost();

    return () => {
      ourRequest.cancel();
    };
  }, []);

  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );

  const date = new Date(post.createdDate);
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <a href="#" data-tooltip-content="Edit" data-tooltip-id="edit" className="text-primary mr-2">
            <i className="fas fa-edit"></i>
          </a>
          <Tooltip id="edit" className="custom-tooltip" />{" "}
          <a data-tooltip-content="Delete" data-tooltip-id="delete" className="delete-post-button text-danger">
            <i className="fas fa-trash"></i>
          </a>
          <Tooltip id="delete" className="custom-tooltip" />
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} />
        </Link>
        Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {dateFormatted}
      </p>

      <div className="body-content">
        <ReactMarkdown
          children={post.body}
          allowedElements={["p", "em", "strong", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "li", "ol"]}
        />
      </div>
    </Page>
  );
}

export default ViewSinglePost;
