const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = require("../secret.js").access_token_secret;
const userModel = require("../model/userModel.js");
const bcrypt = require("bcrypt");
