const request = require("request");

exports.geocode = (address, callback) => {
    const mapBoxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoic2hlcmRnIiwiYSI6ImNrdDhpdGc5djEyaTMydmxhd3Rrc25lZTkifQ.0xZeR1uZ_nr92LQe0NMKvw";
    request({ url: mapBoxUrl, json: true }, (err, res) => {
        if (err) {
            callback("Service unavaileble!", undefined);
        }
        else if (res.body.features.length === 0) {
            callback("Unable find location", undefined);
        }
        else {
            callback(undefined, {
                "latitude": res.body.features[0].center[0],
                "longitude": res.body.features[0].center[1],
                "location": res.body.features[0].place_name
            });
        }
    })
};

exports.forecast = (latitide,longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=a9b8ae4ee14142ebd730995730def7eb&unit=m&query="+longitude+","+latitide+'"';
    request({ url: url, json: true }, (error, res) => {
        // console.log(JSON.parse(res.body).current);
        if (error) {
            callback("Service unavaileble", undefined);
        }
        else if (res.body.error) {
            callback("Unable find location", undefined);
        }
        else {
            callback(undefined, res.body.current.weather_descriptions[0]+". It is currently "+res.body.current.temperature+"C. Feels like "+ res.body.current.feelslike+"C.");
        }
    });

};

