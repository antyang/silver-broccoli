import React from 'react';

const VideoDetail = ({video}) => {

	if (!video) {
		return <div>Loading...</div>
	}

	const videoId = video.id.videoId;
	const URL = `https://www.youtube.com/embed/${videoId}`;
	console.log('video', video);

	return (
		<div className='col-md-8'>
			<div className='embed-responsive embed-responsive-16by9'>
				<iframe className='embed-responsive-item' src={URL}></iframe>
			</div>

			<div className="video-details">
				<header>{video.snippet.title}</header>
				<details>
					<summary></summary>
					<p>{video.snippet.description}</p>
    		</details>
			</div>

		</div>
	)
};

export default VideoDetail;
