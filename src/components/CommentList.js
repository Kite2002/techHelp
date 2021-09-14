import { formatDistance, parseISO } from 'date-fns'

const CommentList = ({comments , postid}) => {
  var postcomments = comments.filter(comment => comment.postid === postid)



  return ( 
    
    <div className="commentlist">
      {postcomments.map((comment)=>(
      <div className="commentPreview" key = {comment.id} >
        <h2> {comment.author} </h2>
        <p><small>{formatDistance(parseISO(comment.created), new Date(), { addSuffix: true })}</small></p>
        <p>{comment.body}</p>
      </div>
    ))}
    </div>
   );
}
 
export default CommentList;