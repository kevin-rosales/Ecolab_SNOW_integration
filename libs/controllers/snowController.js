const express = require("express");
const axios = require("axios");
const qs = require("querystring");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

//Grab env variables
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const snowDomain = process.env.INSTANCE_DOMAIN;

router.post("/auth", async (req, res) => {

  const { username, password } = req.body;
  const authURL = `${snowDomain}/oauth_token.do`;

  const authRequest = qs.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "password",
    scope: "useraccount",
    username: username,
    password: password,
  });

  const config = {
    method: "post",
    url: authURL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: authRequest,
  };

  // Checks to see if the axios call can be done
  const tokenRes = await axios(config).catch((err) => {
    console.error("SNOW AUTH ENDPOINT ERROR:", err.message);
  });

  // checks to see if there's any data present within the axios request call to SNOW auth endpoint
  if (tokenRes == undefined) {
    console.log("Access Denied");
    res.status(401).send({ errMessage: "Access Denied" });
  } else {
    //if successful send access token back
    const { access_token } = tokenRes.data;
    res.send({ access_token: access_token });
  }
});

router.get("/incident", (req, res) => {});
router.get("/searchIncident", (req, res) => {});
router.get("/searchKnowledge", (req, res) => {});
router.get("/searchUser", (req, res) => {});

module.exports = router;
