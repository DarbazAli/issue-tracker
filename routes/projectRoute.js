const projectRoute = (app, Project) => {
    app.route('/:project').get((req, res) => {
        const { project } = req.params

        Project.findOne({ name: project })
            .then((data) => {
                const issues = data.issues
                log(issues)
                res.render('project', { name: project, issues: issues })
            })
            .catch((err) => res.status(401).send(err))
    })
}

export default projectRoute
