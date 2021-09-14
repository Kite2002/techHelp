import { Link } from "react-router-dom";
import {formatDistance, parseISO } from 'date-fns'
import { useState } from "react";
const PostList = ({posts,title}) => {
  const [term , setterm] = useState("")
  // const posts = props.posts
  // const title = props.title
  return ( 
    <div className="posts">
      <div className="searchbar">
        <label>Search  </label>
        <input placeholder = "Title/Year" onChange = {(e)=>{
          setterm(e.target.value)
        }} type="text" />
      </div>
      <h3>{title}</h3>
    {posts.filter((post)=>{
      if(term == ""){
        return post
      }else if(post.title.toLowerCase().includes(term.toLowerCase()) || post.created.includes(term)){
        return post
      }
    }).reverse().map((post)=>(
      <Link to= {`/posts/${post.id}`} key = {post.id} >
      <div className="postPreview" >
        <h2> {post.title} </h2>
        <p>{post.author}</p>
        <p><small>{formatDistance(parseISO(post.created), new Date(), { addSuffix: true })}</small></p>
        <h3>{post.type}</h3>
      </div>
      </Link>
    ))}
  </div>
   );
}
 
export default PostList;
