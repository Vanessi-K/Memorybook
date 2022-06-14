const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
const db = require("./services/database.js");

const fileUpload = require("express-fileupload");
app.use(fileUpload({createParentPath: true}));

app.use(express.static('public'));

//Enable cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Make it possible to handle JSON data
const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Setting the Cross-Origin-Resource Policy
const cors = require("cors");
app.use(cors());

//Setting up the routers
const indexRouter = require("./router/indexRouter.js");
app.use("/", indexRouter);

const userRouter = require("./router/userRouter.js");
app.use("/user", userRouter);

const memorybookRouter = require("./router/memorybookRouter.js");
app.use("/memorybook", memorybookRouter);

app.use(function(req, res) {
    res.status(404).json( {code: 404, message: "Can not find that endpoint"});
});

//Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
