import express from 'express'
import { createTable } from './config/sql.js'

const app = express()

async function init(){
 try {
    await createTable()
    serverStart()
 } catch (error) {
    console.log(error);
 }

 function serverStart(){
    app.listen(3000)
 } 

}


init()