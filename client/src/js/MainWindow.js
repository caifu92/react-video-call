import React, {Component, PropTypes} from "react";

var friendID;

class MainWindow extends Component {
	render() {
		return (
			<div className="container main-window">
				<div>
					<h3>
						Hi, your ID is <span className="txt-clientId">
							{this.props.clientId}
						</span>
					</h3>
					<h4>Get started by calling a friend below</h4>
				</div>
				<div>
					<input type="text" className="txt-clientId"
						spellCheck={false} placeholder="Your friend ID"
						onChange={(event) => friendID = event.target.value}/>
					<div>
						<i className="btn-action fa fa-video-camera"
							onClick={this.callWithVideo(true) }></i>
						<i className="btn-action fa fa-phone"
							onClick={this.callWithVideo(false) }></i>
					</div>
				</div>
			</div>
		);
	}
	/**
	 * Start the call with or without video
	 * @param {Boolean} video
	 */
	callWithVideo(video) {
		var config = { audio: true };
		config.video = video;
		return () => this.props.startCall(true, friendID, config);
	}
}

MainWindow.propTypes = {
	clientId: PropTypes.string.isRequired,
	startCall: PropTypes.func.isRequired
};

export default MainWindow;