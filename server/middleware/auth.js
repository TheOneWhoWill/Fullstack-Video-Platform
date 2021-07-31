import admin from 'firebase-admin';

function verifyIDToken(req, res, next) {
	let idToken = req.body.token
	
	admin.auth().verifyIdToken(idToken)
		.then((decodedToken) => {
			const uid = decodedToken.uid;
			req.uid = uid
			next()
		})
		.catch(error => {
			res.send(error)
		})
}

export { verifyIDToken }