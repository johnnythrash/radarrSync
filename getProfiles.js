const axios = require('axios')
const logger = require('./utils/logger')

if (process.argv.length !== 4) {
	logger.error('error, please enter the correct number of arguments ex "node getProfiles.js http://<radarr ip>:<port> <radarr api key>"')
}


let baseurl = process.argv[2]
let key = process.argv[3]
let url = `${baseurl}/api/v3/qualityProfile?apiKey=${key}`


axios.get(url).then(res => {
	let profiles = res.data
	console.log('quality profiles:')
	profiles.map(a=>{
	console.log(`${a.id}) ${a.name} `)
	}) 
}).catch(err => logger.error(err))




