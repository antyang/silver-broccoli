import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
// import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

class PostsIndex extends Component {

	componentWillMount() {
		this.props.fetchPosts();
		// console.log('good time to call an action creator to fetch post here');
	}

	render() {
		return (
			<div>
				<div className="text-xs-right">
					<Link className="btn btn-primary" to="/posts/new">Add a post</Link>
				</div>
				Lists of blog post
			</div>
		)
	}
}

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators({ fetchPosts }, dispatch);
// }

// -- refactor
// replace line 20-22 to line 30
// export default connect(null, {mapDispatchToProps})(PostsIndex);


// gives up access to this.props.fetchPosts
export default connect(null, { fetchPosts })(PostsIndex);
