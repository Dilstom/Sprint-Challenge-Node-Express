const router = require('express').Router();
const projects = require('./projectModel')

router.get('/', (req, res) => { 
    projects.get().then(p => { res.status(200).json(p) })
 })
router.get('/:id', (req, res) => { 
    projects.get(req.params.id).then(p => { res.status(200).json(p) })
 })
router.post('/', (req, res) => { 
    const project = req.body;

    // try { const project = await projects.insert(project)} catch (err) { }


    if(projects.name && project.descritption) {
            projects
             .insert(project)
             .then(p =>  res.status(200).json(p))
             .catch(error => res.json(error))
    } else {
        res.status(400).json({ message: 'Please provide both a name and description for the project' })
    }
 })
router.delete('/:id', (req, res) => { 
    projects
     .remove(req.params.id)
     .then(p => res.json({ deleted: p }))
     .catch(error => res.status(500).json(error))
 })
 router.put('/:id', (req, res) => {
    const { id } = req.params;
    projects
     .update( id, req.body)
     .then(p => {
        if(!name || !description){
            res.status(400).json({ error: 'Please provide project name and description' })
        } else if (!p) {
            res.status(404).json({ error: 'The project with specified ID does not exist'})
        } else {
            res.status(200).json(p);
        }
    })
})
router.get('/:id/actions', (req, res) => {
    projects.getProjectActions(id).then(p => res.json(p));
})

module.exports