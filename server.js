const express = require('express');
const helmet = require('helmet');
const projects = require('./data/helpers/projectModel');
const actions = require('./data/helpers/actionModel');

const port = 8001;
const server = express();

server.use(helmet());
server.use(express.json());

server.listen(port, () => console.log(`Server is listening port ${port}`));

server.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>');
})

server.get('/projects', (req, res) => {
    projects.get().then(p => {
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(500).json({ error: 'The projects information could not be retrieved' })
    })
})
server.get('/projects/:id', (req, res) => {
    const { id } = req.params;
    projects.get(id).then(p => {
        if(p.length === 0){ // <--- need to fix
            res.status(404).json({ error: 'The project with specified ID does not exist' })
        }
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(500).json({ error: 'The projects information could not be retrieved' })
    })
})
server.get('/projects/:id/actions', (req, res) => {
    const { id } = req.params;
    projects.getProjectActions(id).then(p => {
        if(p.length === 0){ // <--- need to fix
            res.status(404).json({ error: 'The project with specified ID does not exist' })
        }
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(500).json({ error: 'The projects information could not be retrieved' })
    })
})