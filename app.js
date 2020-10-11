'use strict'
console.clear()
global.log = console.log

/* ======================================================== 
    IMPORT MODULES & PACKAGES
========================================================= */
import express from 'express'
import { config } from 'dotenv'
import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient

/* ======================================================== 
    CUSTOM MODULES
========================================================= */
import index from './routes/homeRoute.js'
import configApp from './app.config.js'
import apiRoute from './routes/apiRoute.js'

/* ======================================================== 
    INIT APP
========================================================= */
const app = express()
config() // dotenv

/* ======================================================== 
    ENV VARAIBLES
========================================================= */
const { PORT, MONGO_URI } = process.env

/* ======================================================== 
    SETUP TEMPLATE ENGINE
========================================================= */
app.set('views', './views')
app.set('view engine', 'pug')

/* ======================================================== 
    APP SETTINGS
========================================================= */
configApp(app)

/* ======================================================== 
    CONNECT TO DB
========================================================= */
MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err
    log('Connected to database')

    const db = client.db('issue-tracker')
    const issues = db.collection('issues')

    // USE ROUTES AFTER CONNECTION
    app.use('/', index)
    apiRoute(app, issues)
})

/* ======================================================== 
    LISTENTING
========================================================= */
app.listen(PORT, log(`Server running on PORT ${PORT}\n`))
