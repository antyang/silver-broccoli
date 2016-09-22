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

	renderPosts() {
		return this.props.posts.map((post) => {
			return (
				<Link to={`posts/${post.id}`} key={post.id}>
					<li className="list-group-item" >
							<span className="pull-xs-right">{post.categories}</span>
							<strong>{post.title}</strong>
					</li>
				</Link>
			)
		})
	}

	render() {
		return (
			<div>
				<div className="text-xs-right">
					<Link className="btn btn-primary" to="/posts/new">Add a post</Link>
				</div>
				<h3>Posts</h3>
				<ul className="list-group">
    			{this.renderPosts()}
    		</ul>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { posts: state.posts.all };
}

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators({ fetchPosts }, dispatch);
// }

// -- refactor
// replace line 20-22 to line 30
// export default connect(null, {mapDispatchToProps})(PostsIndex);


// gives up access to this.props.fetchPosts
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
