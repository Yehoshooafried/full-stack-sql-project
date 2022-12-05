import React, { Component, useState, useMemo } from 'react';
import { useEffect } from 'react';
function Todos() {
    const usertInfo = JSON.parse(localStorage.getItem('userData'))
    const userId = usertInfo[0].id
    const userName = usertInfo[0].username
   

    const [todos, setTodos] = useState([]);
    const [checked, setChecked] = useState(true)

    useMemo(() => { getData() }, [])


    //need to understand!!!
    //     function getData() { 
    //   const usertInfo = JSON.parse(localStorage.getItem('userData')) 
    //     const userId = usertInfo[0].id
    //         const url = 'https://jsonplaceholder.typicode.com/users/{}'
    //         fetch(url)
    //         .then((res)=>res.json())
    //         .then((json)=>setTodos(json))
    //         .then(()=> toDolist() )    
    //     }

//fetch function
    async function getData() {
        const usertInfo = JSON.parse(localStorage.getItem('userData'))
        const userId = usertInfo[0].id
        const userName = usertInfo[0].username
        const url = `http://localhost:5000/todos/${userName}`
        const res = await fetch(url)
        const json = await res.json();
        console.log(json);
        setTodos(json)
    }
    function setCompleted(id) {
        console.log(id);
        // console.log(e);
        setChecked(!checked)     
            const  myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");            
            const  raw = JSON.stringify({
              "todoId": id,
              "status": "1",
              "Content-Type": "application/json"
            });            
            const  requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };            
            fetch(`http://localhost:5000/todos/completed`, requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));
    }

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

    //sort random
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }




//sort todos
    function handleSelct(element) {
        const selected = element.target.value;
        let newTodos = [...todos]
        switch (selected) {
            case 'serial':
                console.log('1');
                newTodos.sort((x, y) => {
                    return (x.id > y.id) ? 0 : x.id < y.id ? -1 : 1;
                });
                break;

            case 'completed':
                console.log('2');
                newTodos.sort((x, y) => {
                    return (x.completed === y.completed) ? 0 : x.completed ? -1 : 1;
                });
                console.log(newTodos);
                break;

            case 'Alphabetical':
                newTodos.sort(compareAB)
                break;

            case 'random':
                shuffleArray(newTodos)
                break;

        }
        setTodos(newTodos)
    }


    return (
        <>
{/* <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" href="#">Action</a>
    <a className="dropdown-item" href="#">Another action</a>
    <a className="dropdown-item" href="#">Something else here</a>
  </div>
</div> */}


<div>
            <select  onClick={handleSelct} name="" id="">              
                <option  value={'serial'} >serial</option>
                <option  value={'completed'} >completed</option>
                <option  value={'Alphabetical'}>Alphabetical</option>
                <option   value={'random'}>random</option>
            </select> 
            </div>

            { todos.map((todo) =>
                <div key={todo.id}> <br />
                    <input
                        type="checkbox"
                        defaultChecked={todo.completed == '1' ? !checked :'0'}
                        onChange={() => setCompleted(todo.id)}
                    /> {todo.title}
                </div>
            )}


        
        </>);
}

export default Todos;