const express = require('express');
const helmet = require('helmet');
const projects = require('./projects/projectModel');
const projectConrtoller = require('./projects/projectConrtoller');
const actions = require('./data/helpers/actionModel');
const cors = require('cors');

const port = 8001;
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors({ origin: "http://localhost:3002" }))

server.use('/projects', projectConrtoller);

server.listen(port, () => console.log(`Server is listening port ${port}`));

server.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>');
})

// ****** solution ***********


server.get('/projects', (req, res) => { 
    projects.get().then(p => { res.status(200).json(p) })
 })
server.get('/projects/:id', (req, res) => { 
    projects.get(req.params.id).then(p => { res.status(200).json(p) })
 })
server.post('/projects/', (req, res) => { 
    const project = req.body;
    if(projects.name && project.descritption) {
            projects
             .insert(project)
             .then(p =>  res.status(200).json(p))
             .catch(error => res.json(error))
    } else {
        res.status(400).json({ message: 'Please provide both a name and description for the project' })
    }
 })
server.delete('/projects/:id', (req, res) => { 
    projects
     .remove(req.params.id)
     .then(p => res.json({ deleted: p }))
     .catch(error => res.status(500).json(error))
 })
 server.put('/projects/:id', (req, res) => {
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
server.get('/projects/:id/actions', (req, res) => {
    projects.getProjectActions(id).then(p => res.json(p));
})

// ******** actions **********

server.get('/actions', (req, res) => { 
    actions.get().then(p => { res.status(200).json(p) })
 })
server.get('/actions/:id', (req, res) => { 
    actions.get(req.params.id).then(p => { res.status(200).json(p) })
 })
server.post('/actions/', (req, res) => { 
    actions.insert(req.body).then(p =>  res.status(200).json(p));
 })
server.delete('/actions/:id', (req, res) => { 
    actions
     .remove(req.params.id)
     .then(p => res.json({ deleted: p }))
     .catch(error => res.status(500).json(error))
 })
 server.put('/actions/:id', (req, res) => {
    const { id } = req.params;
    actions
     .update( id, req.body)
     .then(p => {
        if(p != null){
            res.status(200).json(p)
        } else {
            res.status(404).json({ error: `There is no action with the id: $(id)` })
        }
    })
    .catch(error => res.json(error));
})
