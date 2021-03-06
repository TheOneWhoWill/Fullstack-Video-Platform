import express from 'express';
import admin from 'firebase-admin';
import { verifyIDToken } from '../middleware/auth.js'

const router = express.Router()

async function createToken(uid) {
	return await admin.auth().createCustomToken(uid)
}

// Get Users
router.get('/get/user/:uid', (req, res) => {
	let uid = req.params.uid;

	admin.auth().getUser(uid)
		.then(userRecord => {
			let user = userRecord.toJSON()
			let response = {
				uid: user.uid,
				displayName: user.displayName,
				photoURL: user.photoURL,
				emailVerified: user.emailVerified,	
			}
			res.send(response)
		})
		.catch((error) => {
			res.send('Unable to fetch users: ' + error)
		})
})

// Create Custom Token
router.get('/create/token', verifyIDToken, (req, res) => {
	let uid = req.uid

	createToken(uid)
		.then(token => {
			res.send(token)
		})
		.catch(error => {
			res.send('Custom Token Creation Failed: ' + error)
		})
})

// Create Account
router.post('/create/account', (req, res) => {
	admin.auth().createUser({
		email: req.body.email,
		emailVerified: false,
		password: req.body.password,
		photoURL: "https://styles.redditmedia.com/t5_umidw/styles/profileIcon_snooedb95d3a-8922-40a2-b725-1a2ad7b47e1b-headshot.png?width=256&height=256&crop=256:256,smart&s=a570e2aac46bceab686caad5badca5115291e15a",
		displayName: req.body.displayName
	})
	.then(userRecord => {
		let uid = userRecord.uid

		createToken(uid)
			.then(token => {
				res.send(token)
			})
			.catch(error => {
				res.send(error)
			})
	})
	.catch((error) => {
		res.send('Account Creation Failed: ' + error)
	})
})

// Delete Account
router.post('/delete/account', (req, res) => {
	let uid = req.uid

	admin.auth().deleteUser(uid)
		.then(() => {
			res.send('Account ' + uid + ' deleted')
		})
		.catch((error) => {
			res.send('Account ' + uid + ' couldn\'t be deleted: ' + error)
		})
})

export default router