const projectRoute = (app, issues) => {
    app.route('/:project').get((req, res) => {
        const { project } = req.params

        issues.find().toArray((err, result) => {
            if (err) throw err
            // log(result)
            res.render('project', { name: project, data: result })
        })
    })
}

export default projectRoute
