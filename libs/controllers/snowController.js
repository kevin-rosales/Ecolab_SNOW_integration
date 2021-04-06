const express = require("express");
const axios = require("axios");
const qs = require("querystring");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

//Grab env variables
const snowDomain = process.env.INSTANCE_DOMAIN;


// create Incident Endpoint
router.post("/incident", (req, res) => {
  let reqURL = `${snowDomain}/api/now/v1/table/incident`;

  const incidentBody = JSON.stringify({
    caller_id: "Kevin Rosales",
    short_description: "Testing Create Incident for SNOW Integration",
    category: "Software",
    subcategory: "Email",
    priority: "",
    description: "",
  });

  const config = {
    method: "post",
    url: reqURL,
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer JGMiu94RiCJwKqW8Jx2NBAgAjEM_lapo2_YxwbmbDnBt386PeHG07jn7CFwX0vKyzM2hTk6dY0VC1SWrkuIbSA",
      "Content-Type": "application/json",
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

  let incidentNum = "INC0000015";

  let config = {
    method: "get",
    url: reqURL,
    params: {
      sysparm_query: `active=true^number=${incidentNum}`,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer JGMiu94RiCJwKqW8Jx2NBAgAjEM_lapo2_YxwbmbDnBt386PeHG07jn7CFwX0vKyzM2hTk6dY0VC1SWrkuIbSA",
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

//Search Knowledge Endpoint
router.post("/searchKnowledge", (req, res) => {
  let reqURL = `${snowDomain}/api/now/cxs/search`;

  let searchQuery = "Where can I obtain updates and new releases?";

  let config = {
    method: "get",
    url: reqURL,
    params: {
      q: searchQuery,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer JGMiu94RiCJwKqW8Jx2NBAgAjEM_lapo2_YxwbmbDnBt386PeHG07jn7CFwX0vKyzM2hTk6dY0VC1SWrkuIbSA",
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

//Search User Endpoint
router.post("/searchUser", (req, res) => {
  let reqURL = `${snowDomain}/api/now/table/sys_user`;
  let number = "(555) 555-0004";

  let config = {
    method: "get",
    url: reqURL,
    params: {
      sysparm_query: `mobile_phone=${number}`,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer JGMiu94RiCJwKqW8Jx2NBAgAjEM_lapo2_YxwbmbDnBt386PeHG07jn7CFwX0vKyzM2hTk6dY0VC1SWrkuIbSA",
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
