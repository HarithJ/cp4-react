import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { SignupForm } from '../../components/forms/SignupForm';


function setup(Func) {
  const submit = jest.fn(() => Promise.resolve('it is working'));
  const props = {
    submit
  };

  const enzymeWrapper = mount(<Func {...props} />);

  return {
    props,
    enzymeWrapper
  };
}
describe('<SignupForm />', () => {
  it('should render itself and subcomponents and change state', () => {
    const { enzymeWrapper } = setup(SignupForm);
    expect(enzymeWrapper.find('input').length).toEqual(5);
    const handleInputChangeSpy = jest.spyOn(enzymeWrapper.instance(), 'onChange');
    enzymeWrapper.find('input').at(3).simulate('change', { target: { name: 'email', value: 'sn@stuff.com' } });
    expect(enzymeWrapper.state().data.email).toBe('sn@stuff.com');
  });
});

describe('<SignupForm/>', () => {
  it('should sign in a user', () => {
    const { enzymeWrapper } = setup(SignupForm);
    enzymeWrapper.setState({
      data: {
        email: 'sn@gmail.com',
        password: 'password1234',
        'First Name': 'Kali',
        'Last Name': 'Linux',
        'Secret word': 'mypet',
      }
    });
    enzymeWrapper.find('Button').simulate('submit');
    // enzymeWrapper.find('input').at(1).simulate('change',  { target:{ name: "First Name",  value:'Kali'}});
    expect(enzymeWrapper.instance().onSubmit).toHaveBeenCalled;
  });
});
