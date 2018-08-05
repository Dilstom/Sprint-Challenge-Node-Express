import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Link, Switch } from 'react-router-dom';


export default class ProjectDetail extends Component {
    constructor() {
        super();
        this.state = {
          project: null
        }
      }
      componentDidMount() {
          this.fetchProject(this.props.match.params.id)
      }

      fetchProject = id => {
          console.log('fetching field: ', this.props.match.params.id);
          console.log(id);
          axios.get(`http://localhost:8001/projects/${id}`)
          .then(res=>{
              console.log('what is res in here: ', res);
              this.setState({ project: res.data })
          })
      }
     render() {
         console.log( 'props: ', this.props)
         console.log( 'state: ', this.state.project)
         if (!this.state.project) { // to ensure it will render again to display our data( without it our state is null)
            return <div>Loading project information...</div>;
          }
        return (
   
            <div>
               
                  <p>{this.state.project.name}</p>
                  <p>{this.state.project.description}</p>
                  <div>{this.state.project.actions.map( (a, i) =>{
                      return <p key={i}>Actions: {a.project_id}, {a.description}, {a.notes}</p>
                  })}</div>
                
              
            </div>
        );
      }
    }
    
    