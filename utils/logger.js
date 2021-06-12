const fs = require('fs');


const date = () => {
	const dateOptions = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	};
	const timeOptions = {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false,
	};
	let date = new Intl.DateTimeFormat('en-US', dateOptions).format(new Date());
	let time = new Intl.DateTimeFormat('default', timeOptions).format(new Date());
	let fullDate = `[${date} ${time}]`

	return fullDate
}

const info = (message) => {
	let currentTime = date()
	let displayMessage = `\n ${currentTime} - INFO - ${message}`
	console.log(message)
	fs.appendFileSync('./logs/radarrsync.log', displayMessage)
	
}


const error = (message) => {
	let currentTime = date()
	let displayMessage = `\n ${currentTime} - ERROR - ${message}`
	console.log(message)
	fs.appendFileSync('./logs/radarrsync.log', displayMessage)
	
}

const path = './logs/radarrsync.log'
try {
	if(!fs.existsSync(path)){
		fs.writeFileSync(path,'') 
		error("logfile doesn't exist, creating now")
	}
		
	 }catch (err) {
		if (error.message = "ENOENT: no such file or directory, open './logs/radarrsync.log'"){
			fs.mkdir('./logs', e=>e)
			error("logs directory doesn't exist, creating now...")
		} else 
		 {error(err.message)}
}



module.exports = {
	info,
	error
}
