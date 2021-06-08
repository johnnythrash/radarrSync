const fs = require('fs')
const prompt = require('prompt')
const colors = require('colors/safe')
const logger = require('./utils/logger')
const { get } = require('prompt')
const e = require('express')

const getInfo = () => {
	
	console.log('please enter the following information in order to build a config file:')
	prompt.message = ""
	prompt.start();
	prompt.get([{
			name: 'radarrKey',
			required: true,
			description: colors.white('radarr 1 api key')
		}, {
			name: 'radarrIp',
			description: colors.white('radarr 1 URL'),
			default: "http://localhost:7878"
		},
		{
			name: 'radarr4kKey',
			required:true,
			description: colors.white('radarr 4k api key'),
		},
		{
			name: 'radarr4kIp',
			description: colors.white('radarr 4k ip'),
			default: "http://localhost:7879"
		}, {
			name:'qualityProfile',
			required: true,
			type: 'number',
			description: colors.white('quality profile id')
		}, {
			name: 'PORT',
			required: true,
			type: 'number',
			description: colors.white('port (default 3010)'),
			default: 3010
		}], (err,res) => {
			
			let configObj = res
			
			console.log('you have entered the following information:',res)
			console.log('is it correct?')
			prompt.message =colors.white('?')
			prompt.start()
			prompt.get(['response'], (err,res) => {
				
				if (res.response.toLowerCase()=== 'yes' || res.response.toLowerCase()=== 'y' || res.response.toLowerCase()=== 'ye' || res.response.toLowerCase()=== 'ok'){
					logger.info('successfully created config file')
					let data = JSON.stringify(configObj)
					fs.writeFileSync('./config.json', data)
					process.exit(1)
				} else if (res.response.toLowerCase() === 'no' || res.response.toLowerCase() === 'n' ){
						getInfo()
					} else {
					process.exit(1)
				}

			})
		})

}



logger.info('starting radarrSync config creator')
console.log('radarrSync configuration creator:')

if (fs.existsSync('./config.json')) {
	console.log('config.json already exists! do you wish to continue? (this will overwrite it)')
	prompt.message=""
	prompt.start()
	prompt.get([{ name: 'answer', description: colors.white('(y/n)')}], (err,res) => {
		console.log(res.answer)
		if (res.answer.toLowerCase() === 'yes' || res.answer.toLowerCase() === 'y'){
			getInfo()
		} else if (res.answer.toLowerCase() === 'no' || res.answer.toLowerCase() === 'n') {
			console.log('quitting...')
			process.exit(1)
		} else {
			getInfo()
		}
	})
} else {
	getInfo()
}






