const mysql =  require('mysql2');

const con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "1234Myjbh!",
        database: 'todos'
    }
);

const tables = ['photos','comments','posts','albums','todos','users']
tables.map(table => {
    fetch(`https://jsonplaceholder.typicode.com/${table}`)
        .then((response) => response.json())
        .then((data) => {
            const columns = Object.keys(data[0]).map(d => `${d} VARCHAR(1000)`)
            const cell = data.map(item => Object.values(item))
            con.query(`CREATE TABLE ${table} (${[columns]})`, function (err, result) {
                if (err) throw err;
                console.log(`create ${table}`);
            })
            con.query(`INSERT INTO ${table} VALUES ?`, [cell], function (err, result) {
                if (err) throw err;
            });
        });
})


