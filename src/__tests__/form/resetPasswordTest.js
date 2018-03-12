import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { ResetPasswordForm } from '../../components/forms/ResetPasswordForm'


function setup(Func) {
    const submit = jest.fn(() => Promise.resolve('it works'));
    const props = {
      submit: submit
    }

    const enzymeWrapper = mount(<Func {...props} />) 

    return {
      props,
      enzymeWrapper
    }
  }
describe('<ResetPasswordForm />', () => {
    it('should render itself and subcomponents and change state', () => {
        const { enzymeWrapper } = setup(ResetPasswordForm)
        expect(enzymeWrapper.find('input').length).toEqual(3);
        const handleInputChangeSpy = jest.spyOn(enzymeWrapper.instance(), 'onChange')
        enzymeWrapper.find('input').at(1).simulate('change',  { target:{ name: "Secret word",  value:'sn@stuff.com'}});
        expect(enzymeWrapper.state().data["Secret word"]).toBe('sn@stuff.com')
    });
})

describe("<ResetPasswordForm/>", () => {
    it('should login a user', () => {
        const { enzymeWrapper } = setup(ResetPasswordForm)
        enzymeWrapper.setState({
            data: {
                email: 'sn@gmail.com',
                password: 'password1234',
                "Secret word": 'mypet'
            }
        });
        enzymeWrapper.find('Button').simulate('submit');
        expect(enzymeWrapper.instance().onSubmit).toHaveBeenCalled;
    })
})