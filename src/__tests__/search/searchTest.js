import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { SearchCategoryForm } from '../../components/search/searchStandard';
import { SearchRecipeForm } from '../../components/search/searchRecipes';


function setup(Func) {
  const props = {
    logout: jest.fn(),
    retrieveSearchCategory: jest.fn(),
    retrieveSearchRecipe: jest.fn(),
    categoryId: 1,

  };

  const enzymeWrapper = mount(<Func {...props} />);

  return {
    props,
    enzymeWrapper
  };
}
describe('<SearchCategory />', () => {
  it('should render itself and subcomponents and change state', () => {
    const { enzymeWrapper } = setup(SearchCategoryForm);
    expect(enzymeWrapper.find('input').length).toEqual(1);
    const handleInputChangeSpy = jest.spyOn(enzymeWrapper.instance(), 'onSearchChange');
    enzymeWrapper.find('input').simulate('change', { target: { value: 'some value' } });
    expect(enzymeWrapper.state().query).toBe('some value');
  });
});

describe('<SearchRecipes />', () => {
  it('should render itself and subcomponents and change state', () => {
    const { enzymeWrapper } = setup(SearchRecipeForm);
    expect(enzymeWrapper.find('input').length).toEqual(1);
    const handleInputChangeSpy = jest.spyOn(enzymeWrapper.instance(), 'onSearchChange');
    enzymeWrapper.find('input').simulate('change', { target: { value: 'some value' } });
    expect(enzymeWrapper.state().query).toBe('some value');
  });
});
