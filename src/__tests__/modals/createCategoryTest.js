import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { CategoryModal } from '../../components/modals/createCategory'


function setup(Func) {
    const store = configureMockStore([thunk])({
        user: {
          "Access Token": '12345trewdfgw23456wedfvcdsq234543wddsqw345',
          email: "sn@stuff.com"
        }
      })
    const props = {
      postCategory: jest.fn(() => Promise.resolve('it works')),
      logout: jest.fn()
    }

    const enzymeWrapper = mount(<Provider store={store}><Func {...props} /></Provider>) 

    return {
      props,
      enzymeWrapper
    }
  }
describe('<CategoryModal />', () => {
    it('should render itself and subcomponents and change state', () => {
        const { enzymeWrapper } = setup(CategoryModal)
        expect(enzymeWrapper.find('Modal').length).toEqual(1);

     });
})

describe("<CategoryModal/>", () => {
     it('should submit data', () => {
         const { enzymeWrapper } = setup(CategoryModal)
         enzymeWrapper.setState({
             data: {
                 name: 'stuff',
                 detail: 'password one two three',
            }
         });
         enzymeWrapper.find('Button').simulate('submit');
         expect(enzymeWrapper.instance().onSubmit).toHaveBeenCalled
     })
})
