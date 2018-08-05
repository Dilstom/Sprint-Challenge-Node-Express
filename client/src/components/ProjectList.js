import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProjectDetail from './ProjectDetail';


export default class ProjectList extends Component {
    constructor() {
        super();
        this.state = {
          projects: []
        }
      }
    
      componentDidMount() {
        axios.get("http://localhost:8001/projects")
        .then(res => {
            console.log(res.data)
          this.setState({ projects: res.data })
        })
        .catch(err => console.log(err))
      }
    
     render() {
        return (
            <div>
                {this.state.projects.map(p => (
                <Link to={`/projects/${p.id}`} key={p.id} params = {p}> 
                  <p>{p.name}</p>
                  <p>{p.description}</p>
                </Link>
              ))}  
            </div>
        );
      }
    }
    
    