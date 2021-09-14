import { useState } from "react";
import { useHistory } from "react-router";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { format} from 'date-fns'

const Create = () => {
  const [title , setTitle] = useState('');
  const [body , setBody] = useState('');
  const [author , setAuthor] = useState('');
  const [type , setType] = useState('C')
  const his = useHistory();

  const handleSubmit = (e)=>{
    e.preventDefault();
    const created = format(new Date(),'yyyy-MM-dd')
    const post = {title ,type , body , author,created};
    fetch("http://localhost:8000/posts" , {
      method : "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(post)
    }).then(()=>{
      his.push("/")
    })
  }


  return ( 
    <div className="create">
      <h2>Add a Post</h2>
      <form onSubmit = {handleSubmit}>
      <label >Language/Technology:</label>
        <select
        value = {type}
        onChange={(e)=>setType(e.target.value)}
        >
          <option value="C">C</option>
          <option value="C++">C++</option>
          <option value="Js">JavaScript</option>
          <option value="Py">Python</option>
        </select>
        <label >Username:</label>
        <input 
          type="text"
          value={author}
          onChange = {(e)=> setAuthor(e.target.value)}
          required 
        />
        <label >Post Title:</label>
        <input 
          type="text"
          value={title}
          onChange = {(e)=> setTitle(e.target.value)}
          required 
        />
        <label>Post Body:</label>
        {/* <textarea
          value={body}
          onChange = {(e)=> setBody(e.target.value)}
          required
        ></textarea> */}
                <CKEditor
                    editor={ ClassicEditor }
                    data= {body}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setBody(data);
                    } }
                />
                <br />
                <br />
        <button>Add Post</button>
      </form>
    </div>
   );
}
 
export default Create;