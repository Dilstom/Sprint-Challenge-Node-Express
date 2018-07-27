import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Link, Switch } from 'react-router-dom';


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
          this.setState({ projetcs: res.data })
        })
        .catch(err => console.log(err))
      }
    
     render() {
        return (
            <div>
                {this.state.projects.map(p => (
                <div key={p.id}> 
                  <p>{p.name}</p>
                  <p>{p.description}</p>
                </div>
              ))}  
            </div>
        );
      }
    }
    
    