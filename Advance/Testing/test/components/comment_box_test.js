import { renderComponent, expect } from '../test_helper';
import CommentBox from '../../src/components/CommentBox/index';

describe('CommentBox', () => {
	let component;

	beforeEach( () => {
		component = renderComponent(CommentBox);
	})

	it('has the correct class', () => {
			expect(component).to.have.class('comment-box');
	})

	it('has a text area', () => {
		expect(component.find('textarea')).to.exist;
	})

	it('has a button', () => {
		expect(component.find('button')).to.exist;
	})

	describe('Textarea', () => {
		beforeEach( () => {
			component.find('textarea').simulate('change', 'new comment');
		})
		
		it('shows text that is entered', () => {

		})

		it('when submitted, clears the text', () => {

		})
	})


})
