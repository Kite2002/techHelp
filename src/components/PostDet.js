import { useParams } from "react-router";
import CommentList from "./CommentList";
import useFetch from "./hooks/useFetch";
import { useState } from "react";
import { useHistory } from "react-router";
import { format} from 'date-fns'

const PostDet = () => {
  const his = useHistory();
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const { id } = useParams();
  const {
    data: post,
    error,
    isPending,
  } = useFetch("http://localhost:8000/posts/" + id);
  const {
    data: comments,
    error: commentErr,
    isPending: commentIsPending,
  } = useFetch("http://localhost:8000/comments");
  const addComment = (e) => {
    e.preventDefault();
    const postid = post.id;
    const created = format(new Date(),'yyyy-MM-dd')
    const comment = { postid, body, author ,created };
    fetch("http://localhost:8000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    }).then(() => {
      his.push(`/posts/${post.id}`)
    });
  };

  return (
    <div className="PostDet">
      {isPending && <div>Loading</div>}
      {error && <div>{error}</div>}
      {post && (
        <article>
          <p>{post.author}</p>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML = {{__html : post.body}} className="postBody"></div>
        </article>
      )}
      <div className="comments">
        <br />
        <h2>Comments</h2>
        <form onSubmit={addComment}>
          <label>Username*</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <label>Add a comment</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
          <button>Add</button>
          <div className="commentList">
            {commentErr && <div className="error">{error}</div>}
            {commentIsPending && <div className="loading">Loding.....</div>}
            {comments && post && (
              <CommentList comments={comments} postid={post.id} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostDet;
