const {resolve} = require('path')
const {existsSync} = require('fs')

expect.extend({
	toExistIn(received, argument){
		const absolutePath = resolve(argument, received)
		const pass = existsSync(absolutePath)
		const message = () => `expected ${received}${pass ? ' not' : ''} to exist in ${argument}`
		return {pass, message}
	}
})
