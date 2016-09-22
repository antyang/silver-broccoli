import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

const YOUTUBE_API_KEY = 'AIzaSyBuCuL4dEA2gO96H-MY_YF6j-kf_AE5vTM';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null,
		};

		this.videoSearch('devinsupertramp');
	}

	videoSearch(term) {
		YTSearch({key: YOUTUBE_API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
			// in es6 this.setState({ videos: videos })
		});
	}

	render() {
		const videoSearchThrottled = _.debounce( (term) => { this.videoSearch(term); }, 300);

		return (
			<div>
				<SearchBar onSearchChange={videoSearchThrottled} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos}
					/>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));
