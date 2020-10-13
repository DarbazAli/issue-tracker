import mongodb from 'mongodb'
const ObjectID = mongodb.ObjectID
import Project from '../Project.js'

const apiRoute = (app, Project) => {
    app.route('/api/issues/:project')

        /*================================= 
            POST ISSUES
        ====================================*/
        .post((req, res) => {
            let { project } = req.params
            project = project.replace(':', '')

            const { title, text, creator, assignee, status } = req.body

            const newIssue = {
                id: new ObjectID(),
                issue_title: title,
                issue_text: text,
                created_by: creator || null,
                assigned_to: assignee || null,
                status_text: status == 'Open' ? true : false || null,
                created_on: new Date().toUTCString(),
                updated_on: new Date().toUTCString(),
            }

            Project.updateOne(
                { name: project },
                { $push: { issues: newIssue } }
            )
                .then((doc) => {
                    res.redirect(`/${project}`)
                    // res.json(doc)
                })
                .catch((err) => res.json(err))
        })

        /*================================= 
            GET ISSUES
        ====================================*/
        .get((req, res) => {
            const { project } = req.params
            const { status } = req.query
            // if (status == 'open') {
            //     Project.findOne({ name: project })
            //         .where('issues')
            //         .in([true])
            //         .exec()
            //         .then((result) => res.json(result))
            // }
            Project.findOne({ name: project })
                .then((result) => {
                    res.json(result)
                })
                .catch((err) => res.send(err))
        })

        /*================================= 
            PUT/UPDATE ISSUES
        ====================================*/
        .put((req, res) => {
            let { project } = req.params
            project = project.replace(':', '')
            const id = new ObjectID(req.body.issue_id)
            // log(id)
            const { title, text, creator, assignee, status } = req.body

            const updateIssue = {
                id: id,
                issue_title: title,
                issue_text: text,
                created_by: creator,
                assigned_to: assignee || null,
                status_text: status == 'Open' ? true : false || null,
                updated_on: new Date().toUTCString(),
            }

            Project.updateOne(
                { name: project, 'issues.id': id },
                { $set: { 'issues.$': updateIssue } },
                // { new: true },
                (err, docs) => {
                    if (err) res.json(err)
                    res.json(`${id} is successfully updated`)
                }
            )
        })

        /*================================= 
            DELETE ISSUES
        ====================================*/
        .delete((req, res) => {
            let { project } = req.params
            project = project.replace(':', '')
            const id = new ObjectID(req.body.id)
            // log(id)

            Project.updateOne(
                { name: project },
                { $pull: { issues: { _id: id } } },
                { new: true }
            )

                .then((data) => res.redirect(`/${project}`))
                .catch((err) => log(err))
        })
}

export default apiRoute
