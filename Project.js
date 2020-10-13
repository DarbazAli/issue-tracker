import mongoose from 'mongoose'
const { Schema } = mongoose

const projectSchema = new Schema({
    name: String,
    created_on: { type: Date, default: Date.now },
    issues: [],
})

const Project = mongoose.model('Project', projectSchema)
export default Project
