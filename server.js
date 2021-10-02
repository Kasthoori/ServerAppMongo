const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//Connect database
const db = require('./app/models');

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to the Database');
})
.catch(err => {
    console.log("Cannot connect to the Database", err);
    process.exit();
});

//simple route
app.get('/', (req, res) => {
    res.json({message: "Welcome to Express Server Application"});
});

//Set router 
require("./app/routes/book.routes")(app);

//Set port
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})