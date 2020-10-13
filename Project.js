import mongoose from 'mongoose'
const { Schema } = mongoose

const issueSchema = new Schema({
    id: String,
    issue_title: String,
    issue_text: String,
    created_by: String,
    assigned_to: String,
    status: Boolean,
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date },
})
const projectSchema = new Schema({
    name: String,
    created_on: { type: Date, default: Date.now },
    issues: [issueSchema],
})

const Project = mongoose.model('Project', projectSchema)
export default Project
