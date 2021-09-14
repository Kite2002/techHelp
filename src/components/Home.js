import useFetch from "./hooks/useFetch";
import PostList from "./postList";

const Posts = () => {

  const { data : posts , isPending , error} = useFetch("http://localhost:8000/posts");
  return (
    <div className="home">
      {error && <div className="error">{error}</div> }
      {isPending && <div className="loading">Loding.....</div> }
      {posts && <PostList posts={posts} title={"All Posts"} />}
    </div>
  );
};

export default Posts;
