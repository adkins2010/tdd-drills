import React, { Component } from 'react';
import PersonList from './PersonList';
import PersonEdit from './PersonEdit'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [
                { firstName: 'Alan', lastName: 'Turing' },
                { firstName: 'Alanzo', lastName: 'Church' },
                { firstName: 'Grace', lastName: 'Hopper' }
            ],
            editing: null

        }
        this.onDone = this.onDone.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete =  this.onDelete.bind(this)
        this.onCreate =  this.onCreate.bind(this)
    }

    onDone() {
        let state = this.state;
        state.editing = null;
        this.setState(state);
    }

    onEdit(person) {
        let state = this.state
        state.editing = person;
        this.setState(state);
    }

    onDelete(person)
    {
        let state = this.state;
        let newPeople = state.people.filter(p => (p.firstName !== person.firstName) && (person.lastName !== p.lastName));
        state.people = newPeople;
        this.setState(state);
    }

    onCreate()
    {
        let state = this.state;
        let size =state.people.push({firstName:'', lastName: ''});
        state.editing = state.people[size-1];
        this.setState(state);
    }

    get childComponent() {
        return this.state.editing
            ? <PersonEdit person={this.state.editing} onDone={this.onDone}  />
            : <PersonList people={this.state.people} onEdit={this.onEdit} onDelete={this.onDelete} onCreate={this.onCreate}/>
    }

    render() {
        return (
            <div className="App">
                {this.childComponent}
            </div>
        );
    }
}