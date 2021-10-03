import axios from 'axios';
import Modal from 'react-modal';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

function Upload() {
	const [modalIsOpen, setIsOpen] = useState(false);
	const closeModal = () => setIsOpen(false);
	const [video, setVideo] = useState(null);
	const openModal = () => setIsOpen(true);
	const { currentUser } = useAuth();
	const customStyles = {
  	content: {
   		top: '50%',
   		left: '50%',
   		right: 'auto',
   		bottom: 'auto',
    	marginRight: '-50%',
    	transform: 'translate(-50%, -50%)',
			backgroundColor: '#202020'
  	},
	};

	function fileChangeHandler(e) {
		setVideo(e.target.files[0])
	}

	function fileUpload() {
		// Get id token to add to form data
		currentUser && currentUser.getIdToken(true).then((idToken) => {
			let data = new FormData();
			data.append("video", video)
			data.append("token", idToken)
			axios({
				url: `${process.env.REACT_APP_BASE_URL}/Upload`,
				method: 'POST',
				data: data,
				body: data
			})
		}).catch((error) => {
			console.log(error)
		});
	}

	return (
		<div className="Upload">
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} overlayClassName="modalOverlay">
				<input type="file" onChange={fileChangeHandler} />
				<button className="uploadBtn" onClick={fileUpload}>Upload Video</button>
			</Modal>
			<div className="topBar">
				<h2>Profile content</h2>
				<Icon icon={faPlus} onClick={openModal}/>
			</div>
			<div className="files">
				<button>ssssssss</button>
			</div>
		</div>
	)
}

export default Upload;