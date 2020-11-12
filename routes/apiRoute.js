import mongodb from 'mongodb'
const ObjectID = mongodb.ObjectID
import Project from '../Project.js'

const apiRoute = (app, Project) => {
    app.route('/api/issues/:project')

        /*================================= 
            GET ISSUES
        ====================================*/
        .get(function (req, res) {
            var project = req.params.project
            project = project.replace(':', '')

            // db.users.find({awards: {$elemMatch: {award:'National Medal', year:1975}}})

            const filter = Object.assign(req.query)

            if (filter.open === 'true') {
                filter.open = true
            } else if (filter.open === 'false') {
                filter.open = false
            }

            if (filter.open) {
                // log(filter)

                Project.find(
                    { name: project },
                    {
                        issues: {
                            $elemMatch: {
                                status: true,
                            },
                        },
                    },
                    (err, docs) => {
                        if (err) res.json(err)
                        res.json(docs)
                    }
                )
            } else if (filter.open === false) {
                log(filter)

                Project.find(
                    { name: project },
                    {
                        issues: {
                            $elemMatch: {
                                status: false,
                            },
                        },
                    },
                    (err, docs) => {
                        if (err) res.json(err)
                        res.json(docs)
                    }
                )
            } else {
                Project.find({ name: project }, (err, docs) => {
                    if (err) throw err
                    res.json(docs)
                })
            }
        })

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
                status: status == 'Open' ? true : false,
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
                status: status == 'Open' ? true : false || null,
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
                { $pull: { issues: { id: id } } },
                { new: true }
            )

                .then((data) => res.redirect(`/${project}`))
                .catch((err) => log(err))
        })
}

export default apiRoute
