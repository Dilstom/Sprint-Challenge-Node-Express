const express = require('express');
const helmet = require('helmet');
const projects = require('./data/helpers/projectModel');
const actions = require('./data/helpers/actionModel');
const cors = require('cors');

const port = 8001;
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors({ origin: "http://localhost:3000" }))

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
server.post('/projects', (req, res) => {
    const { name, description } = req.body;
    if(!name || !description){
        res.status(400).json({ error: 'Please provide both a name and description for the project.' })
    }
    projects.insert({ name, description }).then(p => {
        res.status(201).json(p)
    })
    .catch(err => {
        res.status(500).json({ error: 'There was an error while saving the project to the database.' })
    })
})
server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    projects.remove(id).then(p => {
        if(!p) {
            res.status(404).json({ error: 'The project with the specified ID does not exist.' })
        }
        res.status(200).json(p);
    })
    .catch(err => {
        res.status(500).json({ error: 'The project could not be removed.' })
    })
})
server.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    projects.update( id, { name, description }).then(p => {
        if(!name || !description){
            res.status(400).json({ error: 'Please provide project name and description' })
        } else if (!p) {
            res.status(404).json({ error: 'The project with specified ID does not exist'})
        } else {
            res.status(200).json(p);
        }
    })
})
// ************ Actions *************

server.get('/actions', (req, res) => {
    actions.get().then(a => {
        res.status(200).json(a)
    })
    .catch(err => {
        res.status(500).json({ error: 'The actions information could not be retrieved' })
    })
})
server.get('/actions/:id', (req, res) => {
    const { id } = req.params;
    actions.get(id).then(a => {
        if(a.length === 0){ // <--- need to fix
            res.status(404).json({ error: 'The action with specified ID does not exist' })
        }
        res.status(200).json(a)
    })
    .catch(err => {
        res.status(500).json({ error: 'The actions information could not be retrieved' })
    })
})

server.post('/actions', (req, res) => {
    const { description, project_id,  notes, completed } = req.body;
    const info = { description, project_id,  notes, completed }
    if(!project_id || !description){
        res.status(400).json({ error: 'Please provide action project_id and description.' })
    }
    actions.insert(info)
        .then(action => {
        res.status(201).json(action);
    })
    .catch(err => {
        res.status(500).json({ error: 'There was an error while saving the action to the database.' })
    })
})
server.delete('/actions/:id', (req, res) => {
    const { id } = req.params;
    actions.remove(id).then(a => {
        if(!a) {
            res.status(404).json({ error: 'The action with the specified ID does not exist.' })
        }
        res.status(200).json(a);
    })
    .catch(err => {
        res.status(500).json({ error: 'The action could not be removed.' })
    })
})
server.put('/actions/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, description } = req.body;
    actions.update( id, { project_id, description }).then(a => {
        if(!project_id || !description){
            res.status(400).json({ error: 'Please provide action name and description' })
        } else if (!a) {
            res.status(404).json({ error: 'The action with specified ID does not exist'})
        } else {
            res.status(200).json(a);
        }
    })
})



// ****** solution ***********


// server.get('/projects', (req, res) => { 
//     projects.get().then(p => { res.status(200).json(p) })
//  })
// server.get('/projects/:id', (req, res) => { 
//     projects.get(req.params.id).then(p => { res.status(200).json(p) })
//  })
// server.post('/projects/', (req, res) => { 
    // const project = req.body;
    // if(projects.name && project.descritption) {
        //     projects
        //      .insert(project)
        //      .then(p =>  res.status(200).json(p))
        //      .catch(error => res.json(error))
    // } else {
    //     res.status(400).json({ message: 'Please provide both a name and description for the project' })
    // }
//  })
// server.delete('/projects/:id', (req, res) => { 
//     projects
//      .remove(req.params.id)
//      .then(p => res.json({ deleted: p }))
//      .catch(error => res.status(500).json(error))
//  })
//  server.put('/projects/:id', (req, res) => {
//     const { id } = req.params;
//     projects
//      .update( id, req.body)
//      .then(p => {
//         if(!name || !description){
//             res.status(400).json({ error: 'Please provide project name and description' })
//         } else if (!p) {
//             res.status(404).json({ error: 'The project with specified ID does not exist'})
//         } else {
//             res.status(200).json(p);
//         }
//     })
// })
// server.get('/projects/:id/actions', (req, res) => {
//     projects.getProjectActions(id).then(p => res.json(p));
// })

// // ******** actions **********

// server.get('/actions', (req, res) => { 
//     actions.get().then(p => { res.status(200).json(p) })
//  })
// server.get('/actions/:id', (req, res) => { 
//     actions.get(req.params.id).then(p => { res.status(200).json(p) })
//  })
//  server.get('/actions/:id/actions', (req, res) => {
//     actions.getProjectActions(id).then(p => res.json(p));
// })
// server.post('/actions/', (req, res) => { 
//     actions.insert(req.body).then(p =>  res.status(200).json(p));
//  })
// server.delete('/actions/:id', (req, res) => { 
//     actions
//      .remove(req.params.id)
//      .then(p => res.json({ deleted: p }))
//      .catch(error => res.status(500).json(error))
//  })
//  server.put('/actions/:id', (req, res) => {
//     const { id } = req.params;
//     actions
//      .update( id, req.body)
//      .then(p => {
//         if(p != null){
//             res.status(200).json(p)
//         } else {
//             res.status(404).json({ error: `There is no action with the id: $(id)` })
//         }
//     })
//     .catch(error => res.json(error));
// })
