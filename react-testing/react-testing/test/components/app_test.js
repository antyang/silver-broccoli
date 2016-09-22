import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

// use 'describe' to group together similar tests
describe('App', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  })

  it('shows a comment box', () => {
    expect(component.find('.comment-box')).to.exist;
  })

})

/**
// use 'it' to test a single attribute of a target
it('shows the correct text', () => {

  // create an instance of 'App'
  const component = renderComponent(App);

  // use 'expect' to use 'assertion' about a target
  // expect(component).to.have.class('class');
  // expect(component)matcher(valueToExpect)
  expect(component).to.contain('Testing');

})
**/
