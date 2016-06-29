import React, { Component } from 'react';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { term: ''};
	}

	render() {
		return (
			<div>
				<input
					className="search-bar"
					value={this.state.term}
					placeholder="Search"
					onChange={event => this.onInputChange(event.target.value)}
					/>
			</div>
		);
	}

	onInputChange(term) {
		this.setState({term});
		this.props.onSearchChange(term);
	}

}
