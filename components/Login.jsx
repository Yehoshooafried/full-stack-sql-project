import React, { Component, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Login(props) {


  //states
  const [errorMessege, setErrorMessege] = useState('')
  const [userNameInput, setUserNameInput] = useState('')
  const [paswordInput, setPaswordInput] = useState('')


  const navigate = useNavigate()

  //run the the fetch 
  useMemo(() => props.getData(), [])

 function handleSubmit(event) {
    event.preventDefault()

console.log('h');
    fetch(
      'http://localhost:5000/check/' +
      userNameInput +
      '/' +
      paswordInput
    )
    
    .then((res) =>res.json() ) 
    .then((json) => { console.log(json);
    if (json ===  'true') {

          // 1.store user in LS

          //****maybe make more clear  */
          const user = props.dataOfUsers.filter((obj) => obj.username == userNameInput)
          let userForLS = JSON.stringify(user)
          localStorage.setItem('userData', userForLS);

          // 2.nevigate
          navigate('/home')
          console.log('####')

        } else {
          console.log('not true')
          alert('invalid username/ password')
          navigate('/');
        }
   
       } )
     .catch(error => {
        console.log(error)
        alert('type your username and password')
      })
        // if (res) {

        //   // 1.store user in LS

        //   //****maybe make more clear  */

        //   const user = props.dataOfUsers.filter((obj) => obj.username == userNameInput)
        //   let userForLS = JSON.stringify(user)
        //   localStorage.setItem('userData', userForLS);

        //   // 2.nevigate
        //   navigate('/home')
        //   console.log('####')

        // } else {
        //   console.log('not true')
        //   alert('invalid username/ password')
        //   navigate('/');
        // }
  
     
  }



  //validation function
  function validation(e) {
    e.preventDefault()
    console.log(props.dataOfUsers);
    const user = props.dataOfUsers.filter((obj) => obj.username == userNameInput)
    console.log(userNameInput);
    console.log(props.dataOfUsers);
    console.log(user);

    // 1.check if user exists
    if (user.length > 0) {
      const password = user[0].password

      // 2.check Paswword
      if (password === paswordInput) {
        let userForLS = JSON.stringify(user)

        // 3.store user in LS
        localStorage.setItem('userData', userForLS);

        // 4.nevigate
        navigate('/home')
      } else {
        alert('invalid username/ password')
        navigate('/login');
      }
    } else {
      alert('invalid username/ password')
      navigate('/login');
    }
  }

  return (
    <div style={{ 'text-align': 'center' }}>
      <form action="">
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" >username</label>
          <div className="col-sm-2 col-form-label">
            <input className="form-control" type="text" onChange={(e) => setUserNameInput(e.target.value)} value={userNameInput} /> <br /><br />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" >password</label>
          <div className="col-sm-2 col-form-label">
            <input className="form-control" type="text" onChange={(e) => setPaswordInput(e.target.value)} value={paswordInput} /> <br />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>login</button>
        <h1>{errorMessege}</h1>
      </form>
    </div>);
}
export default Login;