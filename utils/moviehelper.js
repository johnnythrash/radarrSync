

const makeObject = (data) => {

	const pathPrefix = '/movies/'
	const movieObject = {
		"id": 0,
		"title": data.title,
		"sortTitle": data.sortTitle,
		"sizeOnDisk": 0,
		"overview": data.overview,
		"inCinemas": data.inCinemas,
		"physicalRelease": data.physicalRelease,
		"images": data.images,
		"website": data.website,
		"hasFile": false,
		"year": data.year,
		"hasFile": false,
		"youTubeTrailerId": data.youTubeTrailerId,
		"studio": "data.studio",
		"path": `${pathPrefix}` + data.title + '(' + data.year + ')',
		"rootFolderPath": `${pathPrefix}` + data.title + '(' + data.year + ')',
		"monitored": true,
		"mininumAvailability": "announced",
		"runtime": data.runtime,
		"lastInfoSync": data.lastInfoSync,
		"cleanTitle": data.cleanTitle,
		"imdbId": data.imdbId,
		"tmdbId": data.tmdbId,
		"titleSlug": data.titleSlug,
		"genres": data.genres,
		"tags": data.tags,
		"added": new Date(),
		"ratings": data.ratings,
		"alternativeTitles": data.alternativeTitles,
		"qualityProfileId": 1,
		"collection": data.collection, 
		"status": data.status,
	}

	return movieObject

}



module.exports = {
	makeObject,
	
}