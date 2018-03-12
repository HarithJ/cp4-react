import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { ResetPassword } from '../../components/pages/ResetPassword';

describe('<ResetPassword />', () => {
  const store = configureMockStore([thunk])({
    user: {}
  });

  const props = {
    reset: jest.fn(),
    message: { message: 'You have successfully reset your password' },
    history: {},
    history: { push: jest.fn()},
  };
  it('should render itself without crashing', () => {
    const { enzymeWrapper } = render(<Provider store={store}><ResetPassword {...props} /></Provider>);
  });
});
