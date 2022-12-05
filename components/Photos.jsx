import React, { Component } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
// import { Fade } from 'react-slideshow-image';
// import { Slide } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css'
// import Button from 'react-bootstrap/Button';
function Photos() {
   const params = useParams()
   console.log(params); 
    const albumId = params.albumId
const albumTitle = params.albumTitle

const [photos, setPhotos] = useState()
const [num, setNum] = useState(0)

 useEffect(()=>{getData()},[])

    async function getData() {
        console.log(albumId);
        const url = `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
        const res = await fetch(url)
      const  json = await res.json();
        console.log(json);
        setPhotos(json)
        console.log(num);
console.log(photos[1].url);
    }
     


    return ( 
        <div style={{'text-align': 'center'}}>

<h2>{albumTitle}</h2>
<div>{photos && <img width={'400'} style={{ 'border': '5px solid #555',
  'border-radius': '10px'}} src={photos[num].url} />}</div>
     {<button className="btn btn-dark" onClick={()=>{if(num>0){setNum(num-1)}}}>back</button>}       
     <button className="btn btn-dark" onClick={()=> setNum(num+1)}>next</button>
        </div>
        
     );
}

export default Photos;


{/* <Fade>
        
        {/* {photos && <img src={photos[num].url} />}  */}
            // {photos && photos.map((photo, index) => (
            //   <div  key={index}>
            //     <div >
                   
            //       <img height={'200'} src={photo.url} />
            //     </div>
            //     {/*<h2>{photo.caption}</h2> */}
            //   </div>
            // ))}
   //        </Fade>   */}