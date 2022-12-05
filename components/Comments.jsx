import React, { Component, useState, useEffect } from 'react';
import { Link ,useParams} from 'react-router-dom'
function Comments() {
    const  [comments, setComments] = useState([])
const params = useParams()
console.log(params);
const postId = params.postId
    async function getData() {
        const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        const res = await fetch(url)
      const  json = await res.json();
        console.log(json);
        setComments(json)
    }
     useEffect(()=> {getData()},[]);

    return ( <>
        {comments.map((comment, key) =><div >
                <p> comment{key+1} <br />
           <span style={{color:'blue', fontWeight:'bold'}} >name:</span>  {comment.name} <br /> 
          <span style={{color:'blue', fontWeight:'bold'}}>comment:</span>   {comment.body} 
                </p>
                </div>
            )}

        </> );
}

export default Comments;