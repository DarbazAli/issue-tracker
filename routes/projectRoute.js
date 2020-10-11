const projectRoute = (app, projects) => {
    app.route('/:project').get((req, res) => {
        const { project } = req.params

        projects.findOne({ name: project }, (err, data) => {
            if (err) log(err)
            const issues = data != null ? data.issues : []
            // log(issues)
            res.render('project', { name: project, issues: issues })
        })
    })
}

export default projectRoute
