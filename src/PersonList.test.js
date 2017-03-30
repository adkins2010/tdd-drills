import React from 'react';
import {shallow} from 'enzyme';
import PersonList from './PersonList';

describe('PersonList', () => {
    it('should render people', () => {
        const expected = [
            {firstName: 'Alan', lastName: 'Turing'},
            {firstName: 'Alanzo', lastName: 'Church'}
        ];
        const div = document.createElement('div');
        const personList = shallow(<PersonList people={expected}/>, div);
        const actual = personList.find('li');
        expect(actual).toHaveLength(2);
        expect(personList.text()).toContain(expected[0].firstName);
        expect(personList.text()).toContain(expected[0].lastName);
        expect(personList.text()).toContain(expected[1].firstName);
        expect(personList.text()).toContain(expected[1].lastName)
    });

    it('has clickable people', () => {
        const expected = [
            {firstName: 'Alan', lastName: 'Turing'}
        ];
        const onEdit = jest.fn();
        const onDelete = jest.fn();

        const div = document.createElement('div');
        const personList = shallow(<PersonList people={expected} onEdit={onEdit} onDelete={onDelete} />, div);

        expect(personList.find('a')).toHaveLength(2);
        personList.find('a').forEach(a => a.simulate('click'));
        expect(onEdit).toHaveBeenCalledTimes(1)
        expect(onDelete).toHaveBeenCalledTimes(1)
    });

    it('has create person button', () => {
        const expected = [
            {firstName: 'Alan', lastName: 'Turing'}
        ];
        const onEdit = jest.fn();
        const onDelete = jest.fn();
        const onCreate = jest.fn();

        const div = document.createElement('div');
        const personList = shallow(<PersonList
            people={expected}
            onEdit={onEdit}
            onDelete={onDelete}
            onCreate={onCreate}
        />, div);
        personList.find('button').simulate('click');
        expect(onCreate).toHaveBeenCalledTimes(1);

    })
});