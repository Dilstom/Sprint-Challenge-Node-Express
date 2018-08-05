import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Link, Switch } from 'react-router-dom';


export default class ActionList extends Component {
    constructor() {
        super();
        this.state = {
          actions: []
        }
      }
    
      componentDidMount() {
        axios.get("http://localhost:8001/actions")
        .then(res => {
            console.log(res.data)
          this.setState({ actions: res.data })
        })
        .catch(err => console.log(err))
      }
    
     render() {
         console.log('this state actions: ', this.state.actions)
        return (
            <div>
                hi
                {this.state.actions.map(p => (
                <div key={p.id}> 
                  <p>Description: {p.description}</p>
                  <p>Notes: {p.notes}</p>
                </div>
              ))}  
            </div>
        );
      }
    }
    