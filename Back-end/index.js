import express from 'express'
import mysql, { createConnection } from 'mysql'
import dotenv from 'dotenv'
import cors from "cors"

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())

const db = mysql.createConnection(
    {
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_NAME
    }
)

db.connect()



app.get('/',(req,res)=>{
    res.json("Back End Was Connected")
})

app.get('/task',(req,res)=>{
    const q = "Select * from task"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post('/task',(req,res)=>{
    const q = 'INSERT INTO task (`id`,`title`,`desc`) VALUES(?)'
    const values =[
        req.body.id,
        req.body.title,
        req.body.desc
    ]

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Task has been created successfull")
    })
})

app.patch('/task/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, desc } = req.body;
    const q = `UPDATE task SET title = '${title}', \`desc\` = '${desc}' WHERE id = ${taskId}`;
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json("Updated the task");
    });
});

app.delete('/task/:id',(req,res)=>{
    const taskId = req.params.id
    const q =`DELETE FROM task WHERE id = ${taskId}`
    db.query(q,(err,data)=>{
        if (err) return res.json(err);
        return res.json("Deleted the task");
    })
})

app.listen(8000,()=>{
    console.log("back end")
})