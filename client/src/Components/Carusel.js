import axios from 'axios';
import Title from './Title'
import firebase from 'firebase'
import ScrollContainer from 'react-indiana-drag-scroll'
import React, { useState, useEffect } from 'react'
//rfce

function Carusel(props) {
	const [titles, setTitles] = useState();
	let baseURL = process.env.REACT_APP_BASE_URL;
	let currentUser = firebase.auth().currentUser;

	useEffect(() => {
		// API Call
		function request(token) {
			axios.get(`${baseURL}${props.query}?token=${token}`)
				.then(res => {
					setTitles(res.data)
				})
				.catch(err => {
					console.log(err)
				})
		}
		// Fettching the JWT
		currentUser && currentUser.getIdToken(true)
			.then(token => {
				request(token)
			})
			.catch(err => {
				console.log(err)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props, baseURL])

	return (
		<div className="CaruselContainer">
			<h2 className="CaruselTitle">{titles && props.name}</h2>
			<ScrollContainer hideScrollbars={false} className="Carusel">
				{titles && titles.map(title => {
					return (
						<Title key={title.id} title={title.name ? title.name : title.title && title.title} img={title.poster_path}/>
					)
				})}
			</ScrollContainer>
		</div>
	)
}

export default Carusel