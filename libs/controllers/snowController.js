const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

//Grab env variables
const snowDomain = process.env.INSTANCE_DOMAIN;

// create Incident Endpoint
router.post("/incident", (req, res) => {
  let reqURL = `${snowDomain}/api/now/v1/table/incident`;

  const incidentBody = {
    caller_id: req.body.caller_id,
    category: req.body.category,
    subcategory: req.body.subcategory,
    priority: req.body.priority,
    short_description: req.body.short_description,
    assigned_to: req.body.assigned_to,
    assignment_group: req.body.assignment_group,
    description: req.body.description,
  };
  // Kevin Rosales (20340701)
  // Software
  // Email
  // 4
  // Testing Create Incident for SNOW Integration
  // BTS Application Support
  // LP SNOW TEST
  const config = {
    method: "post",
    url: reqURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: process.env.BASIC_AUTH,
    },
    data: incidentBody,
  };

  axios(config)
    .then((response) => {
      console.log(response.data);
      res.sendStatus(200).end();
    })
    .catch((error) => {
      console.log(error.message);
      res
        .status(401)
        .send({ errMessage: "Access Denied", resError: error.message });
    });
});

// Search Incidents Endpoint
router.post("/searchIncident", (req, res) => {
  let reqURL = `${snowDomain}/api/now/v1/table/incident`;
  let incidentNum = req.body.searchterm;

  let config = {
    method: "get",
    url: reqURL,
    params: {
      sysparm_query: `active=true^number=${incidentNum}`,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: process.env.BASIC_AUTH,
    },
  };

  axios(config)
    .then((response) => {
      let username;

      /*
      Map the results that gets sent back axios call and try locating the caller_id if the field is an object 

      use function findUserByCallerId to grab the user's name from another api call so that it can be used to display the caller_id name instead of the sys id
      
      */
      response.data.result.map(async (res) => {
        if (typeof res.caller_id == "object") {
          // console.log("caller_id", res.caller_id);
          const n = await findUserByCallerId(res.caller_id.value);
          let userName = n;
          grabName(userName);
        }
      });

      // The whole purpose of this function is to grab the user's name from the promise so that it can be sent over to the client side
      const grabName = (name) => {
        username = name;
        // send response data nd username over to the client side so that it can be displayed pon the page
        res.send({ ResponseData: response.data, user: username }).end();
      };
    })
    .catch((error) => {
      console.log(error.message);
      res
        .status(401)
        .send({ errMessage: "Access Denied", resError: error.message });
    });
});

// Function that gets used to make another api call to the SNOW user table with the caller id's sys id to grab the user's full name
const findUserByCallerId = async (value) => {
  let reqURL = `${snowDomain}/api/now/table/sys_user`;
  let sysId = value;
  let name;

  let config = {
    method: "get",
    url: reqURL,
    params: {
      sysparm_query: `sys_id=${sysId}`,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: process.env.BASIC_AUTH,
    },
  };

  const getUser = await axios(config);
  const userData = getUser.data.result;
  for (i = 0; i < userData.length; i++) {
    name = userData[i].name;
  }
  return name;
};

//Search Knowledge Endpoint
router.post("/searchKnowledge", (req, res) => {
  let reqURL = `${snowDomain}/api/now/cxs/search`;

  let searchQuery = req.body.searchterm;

  let config = {
    method: "get",
    url: reqURL,
    params: {
      q: searchQuery,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: process.env.BASIC_AUTH,
    },
  };

  axios(config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error.message);
      res
        .status(401)
        .send({ errMessage: "Access Denied", resError: error.message });
    });
});

//Search User Endpoint
router.post("/searchUser", (req, res) => {
  let reqURL = `${snowDomain}/api/now/table/sys_user`;
  let searchValue = req.body.searchterm;

  let config = {
    method: "get",
    url: reqURL,
    params: {
      sysparm_query: `email=${searchValue}`,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: process.env.BASIC_AUTH,
    },
  };

  axios(config)
    .then((response) => {
      res.send(response.data).end();
    })
    .catch((error) => {
      console.log(error.message);
      res
        .status(401)
        .send({ errMessage: "Access Denied", resError: error.message });
    });
});

module.exports = router;
