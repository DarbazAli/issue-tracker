import mongodb from 'mongodb'
const ObjectID = mongodb.ObjectID

const homeRoute = (app, Project) => {
    app.route('/')
        .get((req, res) => {
            Project.find()
                .then((result) => {
                    res.render('index', { projects: result })
                })
                .catch((err) => log(err))
        })

        .post((req, res) => {
            const { project_name } = req.body
            // new project
            const newProject = new Project({
                _id: new ObjectID(),
                name: project_name,
                created_on: new Date().toUTCString(),
                issues: [],
            })

            newProject
                .save()
                .then(res.redirect('/'))
                .catch((err) => log(err))
        })
}

export default homeRoute
