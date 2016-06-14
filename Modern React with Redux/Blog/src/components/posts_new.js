import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
	static contextTypes = {
		router: PropTypes.object,
	}

	onSubmit(props) {
		this.props.createPost(props)
		// createPost: action creator that creates a promise as a payload
		.then( () => {
			// blog pos ahs been created, navigate user to index
			// by calling this.context.router.push with the new path
			this.context.router.push('/');
		})
	}

	render() {
		const { fields: { title, categories, content }, handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create a new post</h3>

					<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
						<label>Title</label>
						<input type="text" className="form-control" {...title} />
						<div className="text-help">
      				{title.touched ? title.error : ''}
      			</div>
					</div>

					<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
						<label>Categories</label>
						<input type="text" className="form-control" {...categories} />
						<div className="text-help">
      				{categories.touched ? categories.error : ''}
      			</div>
					</div>

					<div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
						<label>Content</label>
						<textarea type="text" className="form-control" {...content} />
						<div className="text-help">
      				{content.touched ? content.error : ''}
      			</div>
					</div>

					<button type="submit" className="btn btn-primary">Submit</button>
					<Link to='/' className="btn btn-danger">Cancel</Link>
			</form>
		)
	}
}

// Set validations
function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'Enter a username';
	}
	if (!values.categories) {
		errors.categories = 'Enter one or more categories';
	}
	if (!values.content) {
		errors.content = 'Enter content';
	}

	return errors;
}

// reduxForm has the same behavior as connect
// connect: 1st arg is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToprops, 3rd is mapDispatchToProps

export default reduxForm({
	// name your form
	form: "PostsNew",
	fields: ['title', 'categories', 'content'],
	validate,
}, null, { createPost })(PostsNew);
