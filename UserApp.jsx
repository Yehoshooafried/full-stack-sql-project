import React from 'react'
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate 

} from "react-router-dom";
import Albums from './components/Albums';
import Home from './components/Home';
import Info from './components/Info';
import Login from './components/Login';
import Post from './components/Post';
import Posts from './components/Posts';
import Todos from './components/Todos';
import Comments from './components/Comments';
import Photos from './components/Photos';



function UserApp() {

// const navigate = useNavigate()
    // states
    const [dataOfUsers, setDataOfUsers] = useState("")



    function getData() {
        const url = 'http://localhost:5000'
        fetch(url)
            .then((res) => res.json())
            .then((json) => setDataOfUsers(json)
            )
    }

   
    return (
        <main>
            <Router>
                <Routes>
                    {/* <Route path={'/*login'} element={navigate('/login')}/> */}
                    <Route path={'/'} element={<Login getData={getData} dataOfUsers={dataOfUsers} />} />
                    <Route path={'home'} element={<Home dataOfUsers={dataOfUsers} />} >
                        <Route path={'albums'} element={<Albums />} />
                        <Route path={'posts'} element={<Posts />} >
                            <Route path=':postId' element={<Post />} >
                                <Route path=':comments' element={<Comments />} />
                            </Route>
                        </Route>
                        <Route path={'todos'} element={<Todos />} />
                        <Route path={'info'} element={<Info />} />
                        <Route path={'photos/:albumId/:albumTitle'} element={<Photos />} />

                    </Route>
                </Routes>
            </Router>

        </main>

    );
}

export default UserApp;