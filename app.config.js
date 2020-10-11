import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import methodOverride from 'method-override'

const configApp = (app) => {
    app.use(express.static(process.cwd() + '/public')) // serve statics
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(helmet.noSniff())
    app.use(helmet.xssFilter())
    app.use(methodOverride('_method'))
}

export default configApp
