# radarrSync

yet another radarr sync app - used for syncing a 4k instance of radarr with your normally running radarr. 

## getting started
### basic steps:
-	git clone
- npm install
- set up [quality profiles](#quality-profiles) in both radarrs (will update this soon with more info)
- get quality profile number `node getProfiles.js http://radarr.ip:port radarrApiKey`
- set up a [webhook notification](#webhook-notification-setup) in your regular radarr
- make sure you know the following:
  - regular radarr ip address:port
  - regular radarr api key 
  - 4k radarr ip address:port
  - 4k radarr api key 
- `node setup.js`
- `npm run start`



### quality profiles:
- set up quality profiles:
	 - in regular radarr create a quality profile called something like ultra-HD, select your normal movie qualities but don't select any 2160p options.
	 - in your 4k radarr set your 'any' profile to only download 2160p.
- run `node getProfiles.js http://regular-radarr-ip:port radarrApiKey`.
- note the id number for your 'ultra-HD' profile.

### webhook notification setup:
this app works by listening for a webhook from your regular radarr instance whenever a movie is added and checking the quality profile to see if it should be added to your 4k radarr instance as well. you will need to set up a webhook notification in your regular radarr instance in order for this to work

in your regular radarr instance navigate to: 
settings --> connect --> add webhook 

the options should be as follows:   
**name:** any name will work here  
**notification triggers:**   
[x] On Grab  
[x] On Import



**URL:** `http://<local ip of the computer running this app>:<3010>/hook` (if you're running this node app on the same computer as radarr you can just use locahost as the ip. the app port default is 3010 but you can change that if needed)  
**Tags:** you can leave this blank  
**Method:** POST  
**Username:** you can leave this blank  
**Password:** you can leave this blank


### running as a systemd service: 
included in this directory is `radarrsync.service` for running this app as a systemd service.

### configuration file
running `setup.js` will create a `config.json` file in the root of this project to be used by the app. 
``` 
{
	"radarrKey": "regular radarr api key",
	"radarrIp": "regular radarr url:port (default: http://localhost:7878)", 
	"radarr4kKey": "4k radarr api key",
	"radarr4kIp": "4k radarr url:port (default: http://localhost:7879",
	"qualityProfile": id number of ultra-hd quality profile from getProfiles.js
}`