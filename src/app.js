// START
//nodemon src/app.js -e js,hbs

//HEROKU
// git add --> commitn --> push
// git push heroku appMain:main



const express = require("express");
const path = require("path");
const hbs = require("hbs");
const utils = require("./utils/utils");

// console.log(path.join(__dirname, "../public"));
const app = express();
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const port = process.env.PORT || 3000

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDir));

app.get('/', (req, res,) => {
    // res.send("Hello express!");
    res.render('index', {
        title: 'Weather app!',
        name: 'SherDG',
        text: 'Use this page(with english language) to get your weather forecast.'
    });
});


app.get("/help", (req, res,) => {
    // res.send("Help page!");
    res.render('help', {
        title: 'Help page',
        name: 'SherDG',
        text: 'Help page text.'
    })
});

app.get("/weather", (req, res,) => {
    if (!req.query.adress) {
        res.send({
            errror: "You should provide adress in query parameter!"
        })
    }
    else {
        utils.geocode(req.query.adress, (err, { latitude, longitude, location } = {}) => {
            if (err) {
                return res.send({ err });
            }

            utils.forecast(latitude, longitude, (err, data) => {
                if (err) {
                    return res.send({ err });
                }
                console.log(location);
                console.log(data);
                res.send({
                    forecast: data, 
                    location,
                    address: req.query.adress,
                });
            })
        });
    }
    // 
    // const address = process.argv[2];

    // if (!address) {
    //     console.log("Provide your location, e.g. - node app.js Dnipro");
    // }
    // else {

    // };


});

app.get("/about", (req, res,) => {
    // res.send("<h5>About page!</h5>");
    res.render('about', {
        title: 'About page',
        name: 'Dima'
    })
});

app.get('*', (req, res,) => {
    // res.send("Page not found");
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found!'
    });
});

app.listen(port, () => {
    console.log("Server started on port "+port)
});