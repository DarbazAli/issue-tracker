import { ObjectID } from 'mongodb'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const projectSchema = new Schema({
    _id: ObjectID,
    name: String,
    created_on: String,
    issues: Array,
})

const Project = mongoose.model('Project', projectSchema)
export default Project
