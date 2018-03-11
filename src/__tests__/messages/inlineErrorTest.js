import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });
import InlineError from '../../components/messages/InlineError'

describe('<InlineError />', () => {
    const props = {
        text: 'this is a message'
    }
    it('should render itself without crashing', () => {
        const { enzymeWrapper } = shallow(<InlineError {...props}/>)
    }); 
})