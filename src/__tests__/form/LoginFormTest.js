import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { LoginForm } from '../../components/forms/LoginForm'


function setup(Func) {
    const submit = jest.fn(() => Promise.reject('some error'));
    const props = {
      submit: submit
    }

    const enzymeWrapper = mount(<Func {...props} />) 

    return {
      props,
      enzymeWrapper
    }
  }
describe('<LoginForm />', () => {
    it('should render itself and subcomponents and change state', () => {
        const { enzymeWrapper } = setup(LoginForm)
        expect(enzymeWrapper.find('input').length).toEqual(2);
        const handleInputChangeSpy = jest.spyOn(enzymeWrapper.instance(), 'onChange')
        enzymeWrapper.find('input').at(1).simulate('change',  { target:{ name: "email",  value:'sn@stuff.com'}});
        expect(enzymeWrapper.state().data.email).toBe('sn@stuff.com')
    });
})

describe("<LoginForm/>", () => {
    it('should login a user', () => {
        const { enzymeWrapper } = setup(LoginForm)
        enzymeWrapper.setState({
            data: {
                email: 'sn@gmail.com',
                password: 'password1234',
            }
        });
        enzymeWrapper.find('Button').simulate('submit');
        expect(enzymeWrapper.instance().onSubmit).toHaveBeenCalled;
    })
})