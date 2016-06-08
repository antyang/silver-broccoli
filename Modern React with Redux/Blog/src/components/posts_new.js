import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class PostsNew extends Component {
	render() {

		const { fields: { title, categories, content }, handleSubmit } = this.props;
		console.log(title);

		return (
			<form onSubmit={handleSubmit}>
				<h3>Create a new post</h3>
					<div className="form-group">
						<label>Title</label>
						<input type="text" className="form-control" {...title} />
					</div>
					<div className="form-group">
						<label>Categories</label>
						<input type="text" className="form-control" {...categories} />
					</div>
					<div className="form-group">
						<label>Content</label>
						<textarea type="text" className="form-control" {...content} />
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		)
	}
}

export default reduxForm({
	// name your form
	form: "PostsNew",
	fields: ['title', 'categories', 'content']
})(PostsNew);
