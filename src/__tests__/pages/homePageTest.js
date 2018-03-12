import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { HomePage } from '../../components/pages/HomePage';

describe('<HomePage />', () => {
  const store = configureMockStore([thunk])({
    user: {
      'Access Token': '12345trewdfgw23456wedfvcdsq234543wddsqw345',
      email: 'sn@stuff.com'
    }
  });

  const props = {
    isAuthenticated: true,
    token: '12345trewdfgw23456wedfvcdsq234543wddsqw345',
    logout: jest.fn()

  };
  it('should render itself without crashing', () => {
    const { enzymeWrapper } = render(<Provider store={store}><HomePage {...props} /></Provider>);
  });
});
