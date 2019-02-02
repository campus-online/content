import { createHash } from 'crypto'
import fetch from 'node-fetch'

// prettier-ignore
const sha256 = string => createHash('sha256').update(string).digest('hex')
const fetchJSON = async (...args) => await (await fetch(...args)).json()
const isAllowed = async _email => {
	if (typeof _email !== 'string') throw new Error('email is not a string')
	const email = _email.toLowerCase()
	const hash = sha256(email).toLowerCase()
	const url = `https://campus-unb.firebaseio.com/invite/${hash}/email.json`
	const value = await fetchJSON(`${url}?shallow=true`)
	console.log({ email, value, hash })
	return email === value
}

export const handler = async ({ body = 'null' } = {}) => {
	try {
		const { email } = JSON.parse(body).user
		if (await isAllowed(email)) return { statusCode: 204, body: '' }
		throw new Error(`email '${email}' is not allowed`)
	} catch ({ message }) {
		console.log(message)
	}
	return { statusCode: 403, body: '' }
}
