import React, { Component, useState, useMemo } from 'react'
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom'

import { useParams } from 'react-router-dom';
function Post(props) {
    // const [a, setA]= useState('')
    const params = useParams()
    const [post, setPost] = useState('');
const postId = params.postId
    console.log(postId);

    async function getData() {
        const url = `https://jsonplaceholder.typicode.com/posts/${postId}`
        const res = await fetch(url)
        const json = await res.json();
        setPost(json)
        console.log(json);
    }

    useEffect(() => {
        getData()
    }, [postId]
    )
    console.log(post.body);
    return (<div>
        <br />
        <div>{post.title}</div><br /><br />
        <div>{post.body}</div>
      <Link className="btn btn-info" to={`${post.id}`}>comments</Link> 

        <Outlet />
    </div>);
}

export default Post;