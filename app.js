'use strict'
console.clear()
global.log = console.log

/* ======================================================== 
    IMPORT MODULES & PACKAGES
========================================================= */
import express from 'express'
import { config } from 'dotenv'
import mongodb from 'mongodb'
import mongoose from 'mongoose'

const MongoClient = mongodb.MongoClient

/* ======================================================== 
    CUSTOM MODULES
========================================================= */
import homeRoute from './routes/homeRoute.js'
import configApp from './app.config.js'
import apiRoute from './routes/apiRoute.js'
import projectRoute from './routes/projectRoute.js'
import Project from './Project.js'

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

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    .then((client) => {
        log('Connected to database')

        homeRoute(app, Project)
        projectRoute(app, Project)
        apiRoute(app, Project)
    })
    .catch((err) => log(err))

/* ======================================================== 
    LISTENTING
========================================================= */
app.listen(PORT, log(`Server running on PORT ${PORT}\n`))
