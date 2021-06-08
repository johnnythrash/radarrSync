const axios = require('axios')
const fs = require('fs')
const express = require('express')
const movie = require('./utils/moviehelper')
const logger = require('./utils/logger')
const app = express()



try {
	fs.readFileSync('./config.json')
} catch (err) {
	throw new Error("error! did you remember to create a config.json file?")
}



let configRaw = fs.readFileSync('./config.json')
let config = JSON.parse(configRaw)

const PORT = config.PORT? config.PORT: 3010

let radarrKey = config.radarrKey
let radarrIp = config.radarrIp
let radarr4kKey = config.radarr4kKey
let radarr4kIp = config.radarr4kIp
let qualityProfile = config.qualityProfile


// listen for radarr webhook
app.use(express.json())

app.post('/hook', async (req,res) => {
	logger.info(`movie "${req.body.movie.title}" added to radarr, checking information...`)
	let id = req.body.movie.id
	let movieInfo = axios.get(`${radarrIp}/api/v3/movie/${id}?apiKey=${radarrKey}`)
	let movieObject = await axios.all([movieInfo]).then(axios.spread((res1) => {

		let shouldIgrab = res1.data.qualityProfileId === qualityProfile? true: false
			return [movie.makeObject(res1.data), shouldIgrab]
		}))

	if (movieObject[1]){
	try {
		logger.info(`quality profile ID matches wanted ID, adding movie ${movieObject[0].title} to 4k radarr`)	
		axios.post(`${radarr4kIp}/api/v3/movie?apiKey=${radarr4kKey}`, movieObject[0]).then(res => {
			if (res.status !== '401' || res.status !== '405'){
			let commandBody = {
					"name":"MissingMoviesSearch"
				}
				axios.post(`${radarr4kIp}/api/v3/command?apiKey=${radarr4kKey}`, commandBody)
			}
		}).catch(err => {
				let status  = err.response.status
				if (status === 400) {
					logger.error(`400 error. ${err.response.statusText}. does the movie already exist in radarr?`)
				} else {
					logger.error(status, err.response.statusText)
				}
				})
		res.status(200).end()
		} catch (error) {
				logger.error(error)
			}
		}
		else {
			logger.info("movie profile ID does not match wanted quality ID, not adding to radarr4k")
		}
		res.status(200).end()
	} 
)

app.listen(PORT, ()=> logger.info(`🚀 server running on port ${PORT}`))