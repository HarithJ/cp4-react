import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { RecipeSubMenu } from '../../components/menu/recipeMenu';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


function setup(Func) {
  const store = configureMockStore([thunk])({
    user: {
      email: 'sn@stuff.com'
    }
  });

  const props = {
    deleteRecipe: jest.fn(() => Promise.resolve(true)),
    redirectRecipes: jest.fn(),
    logout: jest.fn(),
    id: 1,
    recipe: {
      id: 1,
      name: ' Recipe one',
      Recipe: 'Recipe one',
      'Date Created': 'Recipe one',
      'Date Modified': 'Recipe one'

    },
    recipeId: 1,
    categoryId: "1",

  };

  const enzymeWrapper = mount(<Provider store={store}><Func {...props} category_id="1" recipe_id={3} /></Provider>);

  return {
    props,
    enzymeWrapper
  };
}
describe('<RecipeSubMenu />', () => {
  it('should render itself and subcomponents and change state', () => {
    const { enzymeWrapper } = setup(RecipeSubMenu);
    const menu = enzymeWrapper.find('Dropdown');
    menu.find('DropdownItem').at(0).simulate('click');
    expect(enzymeWrapper.instance().show).toHaveBeenCalledTimes;
    menu.find('DropdownItem').at(1).simulate('click');
    expect(enzymeWrapper.instance().deleteRecipe).toHaveBeenCalled;
  });
});
