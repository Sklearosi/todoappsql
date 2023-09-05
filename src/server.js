import express, { response } from 'express'
import pool, { createTable } from './config/sql.js'
import bodyParser from 'body-parser'
import cors from "cors"

const app = express()

async function init(){

 try {
    await createTable()
    serverStart()
 } catch (error) {
    console.log(error);
 }

 function serverStart(){
    app.use(bodyParser.json())
    app.use(cors())
    app.get("/api/tasks", async(req,res) => {
        try {
            const resultQuery = await pool.query("SELECT * FROM todoapp")
            const rows = resultQuery.rows
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(401).json(error)
        }

        
    })

    app.post("/api/tasks", async(req,res) => {
        try {
            const { task, active} = req.body
            const resultQuery = await pool.query("INSERT INTO todoapp(task, active) VALUES($1, $2)", [task, active])
            const row = resultQuery.row[0]
            return res.status(200).json(row)
        } catch (error) {
            return res.status(401).json(error)
        }
    })

    app.delete("/api/tasks/:id", async(req,res) => {
        const id = +req.params.id

        try {
        const resultQuery = await pool.query("DELETE FROM todoapp WHERE id = $1", [id])
        return res.status(201).json({message: "task deleted!"})
        } catch (error) {
            return res.status(401).json(error)
        }
    })

    app.put("/api/tasks/:id", async (req, res) => {
        const id = +req.params.id;
        const { active } = req.body;
      
        try {
          const resultQuery = await pool.query(
            "UPDATE todoapp SET active = $1 WHERE id = $2",
            [active, id]
          );
          return res.status(200).json({ message: "Task updated!" });
        } catch (error) {
          return res.status(400).json(error);
        }
      });

    app.listen(3000) 
 } 

}


init()