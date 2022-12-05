const mysql = require('mysql2');


const express = require('express');
const app = express();
const cors = require("cors");

// #### check in the end
// const { get } = require('http');
// const { send } = require('process');


//-allow-credentials
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
        password: "4165Mysql!",
        database: 'todos'
    }
);

// get first data
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

// get todo/ posts table
app.get('/:table/:userId', (req, res) => {  // readFiles,

    const { userId, table } = req.params
    if (table = 'todos') {
        const colunmName = 'userid'
    }
    if (table = 'posts') {
        const colunmName = 'posts'
    }

    con.connect((err) => {
        if (err) return err;
        console.log("connected succes");
        const sql =
            `SELECT *
            FROM ${table} 
             WHERE ${colunmName} = '${userId}' `;

        con.query(sql, (err, result) => {
            if (err) { console.log('bad authentication'); return res.send(JSON.stringify(err)); }
            // const a = result[0] ? 'true' : 'false'
            // console.log(a);
            res.send(JSON.stringify(result))
        })
    })
    console.log('check3');
})

// get comments
app.get('/comments/:postid', (req, res) => {  // readFiles,
    const postId = req.params.postid

    con.connect((err) => {
        if (err) return err;
        console.log("connected succes");
        const sql =
            `SELECT *
            FROM comments 
             WHERE postId = '${postId}' `;

        con.query(sql, (err, result) => {
            if (err) { console.log('bad authentication'); return res.send(JSON.stringify(err)); }
            // const a = result[0] ? 'true' : 'false'
            // console.log(a);
            res.send(JSON.stringify(result))
        })
    })
    console.log('check3');
})

//post new comment
app.post('/comments/:postid', (req, res) => {
    const  postId  = req.params
    const {bodyComment, name} = req.body
    console.log(req.body);
    con.connect((err) => {
        if (err) return err;

        console.log("connected succes");

        const sql =
        `INSERT INTO comments(postId, name, body ) 
        VALUES (${postId},${name}, ${bodyComment});`;

        con.query(sql, (err, result) => {
            if (err) { console.log('bad authentication'); return res.send(JSON.stringify(err)); }
            console.log(result.affectedRows);
            res.send(JSON.stringify(result))
        })
    })

})

//delete comment
app.delete('/delete_comment/:commentId', (req, res) => {
    const  commentId  = req.params
    const {bodyComment, name} = req.body
    console.log(req.body);
    con.connect((err) => {
        if (err) return err;
        console.log("connected succes");

        const sql =
        `DELETE FROM comments WHERE id = ${commentId};`;
        con.query(sql, (err, result) => {
            if (err) { console.log('bad authentication'); return res.send(JSON.stringify(err)); }
            console.log(result.affectedRows);
            res.send(JSON.stringify(result))
        })
    })

})


//update un/completed

//#### dont forget to change from post to put in the react ###

app.put('/todos/completed', (req, res) => {
    const { todoId, status } = req.body
    console.log(req.body);
    con.connect((err) => {
        if (err) return err;
        console.log("connected succes");
        
        const sql =
        `UPDATE  todos 
        SET completed = '${status}'
        WHERE id = '${todoId}'`;

        con.query(sql, (err, result) => {
            if (err) { console.log('bad authentication'); return res.send(JSON.stringify(err)); }
            console.log(result.affectedRows);
            res.send(JSON.stringify(result))
        })
    })

})

const port = 5000
app.listen(port, () => console.log(`listening on port ${port}`))


