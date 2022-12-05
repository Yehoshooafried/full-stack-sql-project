import React, { Component, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';


function Albums() {
//states  
   const [albums, setAlbums] = useState([])

   //fetch data
   useMemo(() => { getData() }, [])


  //sort functions
  function compareAB(a, b) {
    if (a.title < b.title) {
        return -1
    }
    if (a.title > b.title) {
        return 1
    }
    return 0
}

   async function getData() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const userId = userData[0].id
      const url = `https://jsonplaceholder.typicode.com/users/${userId}/albums`
      const res = await fetch(url)
      const json = await res.json();

//sort the array alphabetic      
const newArr = [...json]
newArr.sort(compareAB)
      setAlbums(newArr)      
   };

   return (
      <ul className='list-group' >
          {albums.map((album, key) =>
                <li className="list-group-item list-group-item-info" key={key}> 
                <Link to={`/home/photos/${album.id}/${album.title}`}>{album.title}</Link>
                </li>
            )}
    </ul> );
     
   
}
export default Albums;