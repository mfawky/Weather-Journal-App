
projectData = {};  // an empty object to act as the ENDPOINT for the ROUTES
const portNum = 4200;  // setting up the port number 

const express = require('express');   //  Requires the express dependency that was installed by the npm
const cors = require('cors');  //  Requires the cors dependency that was installed by the npm
const bodyParser = require('body-parser');  //  Requires the body-parser dependency that was installed by the npm

const app = express();  // creating an instance of app. 

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());  // Using the cors Dependency

// Initialize the main project folder
app.use(express.static('website'));

app.listen(portNum, () =>{ // callback function that returns a message to ensure that the server is runnig and tells its port number
    console.log('Server port is ',portNum);
});

// now we are going to set up the GET and POST Routes



// 1-->> POST Request here :
// used to store the data
app.post('/saveEntry' , (req, res) => {
    // should store the specified data in the object [projectData] to be shown using the GET route
    projectData = req.body; // this the use of the bodyParser
    console.log(projectData);
    res.send();
});

// 2-->> GET Request here :
// used to show the data
app.get('/getEntry' , (req, res) => {
    // should show the data that stored dynamically using the POST route in the object [projectData]
    res.send(projectData); 
});

// Some ZIPCODES -->> ARGENTINA = [20260]  ----  USA = [94040]
