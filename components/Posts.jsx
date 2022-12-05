import React, { Component, useState, useMemo } from 'react';
import { Outlet, Link, } from "react-router-dom";


function Posts() {
   const [posts, setPosts] = useState([]);

   const usertInfo = JSON.parse(localStorage.getItem('userData'))
   const userId = usertInfo[0].id
   useMemo(() => { getData() }, [userId])
   // useMemo(() => { getComments() }, [])

   //fetch function
   //    async function getComments() {
   //       const usertInfo = JSON.parse(localStorage.getItem('userData'))
   //       const userId = usertInfo[0].id
   //       const url = `https://jsonplaceholder.typicode.com/users/${userId}/comments`
   //       const res = await fetch(url)
   //       const json = await res.json();
   //       console.log(json);
   //       setComments(json)
   //   }

   async function getData() {

      const url = `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      const res = await fetch(url)
      const json = await res.json();
      console.log(json);
      setPosts(json)
      console.log(posts);
   }


   return (
      <div>
         <ul className="list-group" >
         {posts.map((post, key) =>
            <li className="list-group-item list-group-item-primary" key={key}> <br />
               <Link to={`${post.id}`}>{post.title}</Link>
            </li>
         )}

         <div ><Outlet /></div>
         {/* style={{float:'left', width:'40%'}} */}
      </ul>
      </div>);
}

export default Posts;