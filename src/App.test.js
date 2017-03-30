import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import PersonList from './PersonList';
import PersonEdit from './PersonEdit';

describe('App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const app = shallow(<App />, div);
        const personList = app.find(PersonList.name);
        expect(personList).toHaveLength(1);
    });

    it('has state', () => {
        const div = document.createElement('div');
        const app = shallow(<App />, div);
        expect(app.state().people).toHaveLength(3);
    });

    it('passes people state', () => {
        const div = document.createElement('div');
        const app = shallow(<App />, div);
        const personList = app.find(PersonList.name);
        expect(personList.props().people).toHaveLength(3);
    });

    it('can switch to edit mode', () => {
        const div = document.createElement('div');
        const app = shallow(<App />, div);
        app.node._self.onEdit(app.state().people[0]);
        const personEdit = app.find(PersonEdit.name);

        expect(app.state().editing).toBe(app.state().people[0]);
        expect(personEdit.props().person).toBe(app.state().people[0]);
    });

    it('can switch to list mode', () => {
        const div = document.createElement('div');
        const app = shallow(<App />, div);
        app.node._self.onEdit(app.state().people[0]);

        app.node._self.onDone(app.state().people[0]);
        const personList = app.find(PersonList.name);

        expect(app.state().editing).toBe(null);
        expect(personList.props().people).toBe(app.state().people);
    });

    it('delete a person', () => {
        const div = document.createElement('div');
        const app = shallow(<App />, div);
        app.node._self.onDelete(app.state().people[0]);
        const personList = app.find(PersonList.name);
        expect(personList.props().people).toHaveLength(2);
    });

    it('create a person', () => {
        const div = document.createElement('div');
        const app = shallow(<App />, div);
        app.node._self.onCreate();
        const personEdit = app.find(PersonEdit.name);
        expect(app.state.people).toHaveLength(4);
        expect(personEdit.props().person.firstName).toEqual('');
        expect(app.state().editing).toBe(app.state().people[3]);
    });
});