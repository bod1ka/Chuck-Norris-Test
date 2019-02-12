import React from 'react';
import {mount} from 'enzyme';
import { LoginForm } from './login';

describe('Login Form', () => {


    it('should shallow',() => {

        const spy = jest.fn();

        const wrapper = mount(<LoginForm onSubmit={spy}/>);


        const state = {
            password: 'aaabbabc',
            login:'test'
        };

        wrapper.setState(state);

        const form = wrapper.find('form');

        form.simulate('submit');

        expect(spy).toHaveBeenCalledWith(state);
    });

});
