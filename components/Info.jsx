import React, { Component } from 'react';

function Info (props) {
    const  userData =  JSON.parse(localStorage.getItem('userData'))
    console.log(userData);
    return (<>

 <h2> name: {userData[0].name}<br/></h2> 
   email: {userData[0].email}<br/>
   phone: {userData[0].phone}<br/>
   website: {userData[0].website}<br/>   
    </>
    );
}
   

export default Info;
    