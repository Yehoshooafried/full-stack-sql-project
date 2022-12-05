const mysql = require('mysql2');


const express = require('express');
const app = express();
const cors = require("cors");

// #### check in the end
// const { get } = require('http');
// const { send } = require('process');


const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
// app.use(express.urlencoded())
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json())



// connection to mysql server
const con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "1234Myjbh!",
        database: 'todos'
    }
);


app.get('/', (req, res) => {
    con.connect((err) => {
        if (err) return err;
        console.log("connected succes");
        const sql = "SELECT * FROM users";
        // const usersObj=[]
        con.query(sql, (err, result) => {

            //#### return a message to the user
            if (err) return err;
            console.log(result.affectedRows);
            res.send(result)
        })
    })

})


// authentication
app.get('/check/:username/:password', (req, res) => {  // readFiles,

    // check commands
    // console.log(req.params.username);
    // console.log(req.params.password);

    const name = req.params.username
    const password = req.params.password
    con.connect((err) => {
        if (err) return err;
        console.log("connected succes");
        const sql = `SELECT * FROM users WHERE username = '${name}' AND password = ${password} `;

        con.query(sql, (err, result) => {
            if (err) { console.log('bad authentication'); return res.send(JSON.stringify(err)); }
            const a = result[0] ? 'true' : 'false'
            console.log(a);
            res.send(JSON.stringify(a))
        })
    })
    console.log('check3');
})
app.get('/todos/:username', (req, res) => {  // readFiles,

    // check commands
    // console.log(req.params.username);
    // console.log(req.params.password);

    const name = req.params.username

    con.connect((err) => {
        if (err) return err;
        console.log("connected succes");
        const sql =
            `SELECT  t.userId, t.id, t.title, t.completed 
            FROM users 
              JOIN todos t 
              ON users.id = t.userId 
               AND username = '${name}' `;

        con.query(sql, (err, result) => {
            if (err) { console.log('bad authentication'); return res.send(JSON.stringify(err)); }
            // const a = result[0] ? 'true' : 'false'
            // console.log(a);
            res.send(JSON.stringify(result))
        })
    })
    console.log('check3');
})

//update completed
app.post('/todos/completed', (req, res) => {
const {todoId,status} = req.body
console.log(req.body);
    con.connect((err) => {
        if (err) return err;
        console.log("connected succes");
        const sql =
            `UPDATE  todos 
           SET completed = '${status}'
           WHERE id = '${todoId}'
               `;
     
        con.query(sql, (err, result) => {
            if (err) { console.log('bad authentication'); return res.send(JSON.stringify(err)); }
    console.log(result.affectedRows);
            res.send(JSON.stringify(result))
        })
    })
    console.log('check3');
})
const port = 5000
app.listen(port, () => console.log(`listening on port ${port}`))


