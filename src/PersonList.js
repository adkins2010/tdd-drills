import React, {Component} from 'react';

export default class PersonList extends Component {

    get people() {
        return this.props.people.map((person, i) => (
            <li key={i}>
                {person.firstName} {person.lastName}
                &nbsp; <a href="#" onClick={() => this.props.onEdit(person)}>edit</a>
                &nbsp; <a href="#" onClick={() => this.props.onDelete(person)}>delete</a>
            </li>
        ))
    }

    render() {
        return (
            <div>
                <ul>
                    {this.people}
                </ul>
                <button onClick={this.props.onCreate}>Create Person</button>
            </div>
        );
    }
}