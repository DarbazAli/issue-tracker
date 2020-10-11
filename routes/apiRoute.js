import mongodb from 'mongodb'
const ObjectID = mongodb.ObjectID

const apiRoute = (app, projects) => {
    app.route('/api/issues/:project')

        /*================================= 
            POST ISSUES
        ====================================*/
        .post((req, res) => {
            let { project } = req.params
            project = project.replace(':', '')

            const { title, text, creator, assignee, status } = req.body

            const newIssue = {
                _id: new ObjectID(),
                issue_title: title,
                issue_text: text,
                created_by: creator,
                assigned_to: assignee || null,
                status_text: status == 'Open' ? true : false || null,
                created_on: new Date().toUTCString(),
                updated_on: new Date().toUTCString(),
            }

            projects.findOneAndUpdate(
                { name: project },
                { $push: { issues: newIssue } },
                (err, doc) => {
                    if (err) throw err
                    // res.res.redirect(``)
                    // log(doc)
                    res.json(doc.value)
                }
            )
        })

        /*================================= 
            GET ISSUES
        ====================================*/
        .get((req, res) => {
            const { project } = req.params
            projects.find().toArray((err, result) => {
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
        .delete((req, res) => {
            let { project } = req.params
            project = project.replace(':', '')
            const id = new ObjectID(req.params.id)

            projects
                .updateOne(
                    { name: project },
                    { $pull: { issues: { _id: id } } },
                    { new: true }
                )

                .then((data) => res.redirect(`/:${project}`))
                .catch((err) => log(err))
        })
}

export default apiRoute
