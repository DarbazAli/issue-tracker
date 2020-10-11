const projectRoute = (app, projects) => {
    app.route('/:project').get((req, res) => {
        const { project } = req.params

        projects.find().toArray((err, result) => {
            if (err) throw err
            // log(result)
            res.render('project', { name: project, data: result })
        })
    })
}

export default projectRoute
