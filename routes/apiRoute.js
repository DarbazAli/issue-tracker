const apiRoute = (app, issues) => {
    app.route('/api/issues/:project')

        /*================================= 
            POST ISSUES
        ====================================*/
        .post((req, res) => {})

        /*================================= 
            GET ISSUES
        ====================================*/
        .get((req, res) => {
            const { project } = req.params
            issues.find().toArray((err, result) => {
                if (err) throw err
                // log(result)
                res.json(result)
            })
        })

        /*================================= 
            PUT ISSUES
        ====================================*/
        .put((req, res) => {})

        /*================================= 
            DELETE ISSUES
        ====================================*/
        .delete((req, res) => {})
}

export default apiRoute
