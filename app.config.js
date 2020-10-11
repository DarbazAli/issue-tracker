import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

const configApp = (app) => {
    app.use(express.static(process.cwd() + '/public')) // serve statics
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(helmet.noSniff())
    app.use(helmet.xssFilter())
}

export default configApp
