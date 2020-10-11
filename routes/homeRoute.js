import mongodb from 'mongodb'
const ObjectID = mongodb.ObjectID

const homeRoute = (app, projects) => {
    app.route('/')
        .get((req, res) => {
            projects.find().toArray((err, result) => {
                if (err) throw err
                // log(result)
                res.render('index', { projects: result })
            })
        })

        .post((req, res) => {
            const { project_name } = req.body
            // new project
            const newProject = {
                _id: new ObjectID(),
                name: project_name,
                created_on: new Date().toUTCString(),
                issues: [],
            }

            projects.insertOne(newProject, (err, data) => {
                if (err) throw err
                res.redirect('/')
            })
        })
}

export default homeRoute
