import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { CategorySubMenu } from '../../components/menu/menu'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'



function setup(Func) {
    const store = configureMockStore([thunk])({
        user: {
          email: "sn@stuff.com"
        }
      })
    
    const props = {
      deleteCategory: jest.fn(() => Promise.resolve(true)),
      redirectRecipes: jest.fn(),
      id: 1,
      category: {
        "id": 1,
        "Recipe Category Name": 'Category one',
        "Recipe Category Detail": 'Category one',
        "Date Created": 'Category one',
        "Date Modified": 'Category one'
        }
    }
  
    const enzymeWrapper = mount(<Provider store={store}><Func {...props} /></Provider>)
  
    return {
      props,
      enzymeWrapper
    }
  }
describe('<CategorySubMenu />', () => {
    it('should render itself and subcomponents and change state', () => {
        const { enzymeWrapper } = setup(CategorySubMenu)
        const menu = enzymeWrapper.find('Dropdown')
        menu.find('DropdownItem').at(0).simulate('click')
        expect(enzymeWrapper.instance().show).toHaveBeenCalledTimes
        menu.find('DropdownItem').at(1).simulate('click')
        expect(enzymeWrapper.instance().deleteCategory).toHaveBeenCalled
        menu.find('DropdownItem').at(2).simulate('click')
        expect(enzymeWrapper.instance().redirectRecipes).toHaveBeenCalled
    });
})