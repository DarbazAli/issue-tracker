const homeRoute = (app, projects) => {
    app.route('/').get((req, res) => {
        projects.find().toArray((err, result) => {
            if (err) throw err
            log(result)
            res.render('index', { projects: result })
        })
    })
}

export default homeRoute
