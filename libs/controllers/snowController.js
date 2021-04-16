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
      Authorization: "Basic cm9zYWxrZTozI3VCY3ZvJA==",
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

// const findUserByCallerId = async (value) => {
//   let reqURL = `${snowDomain}/api/now/table/sys_user`;
//   let sysId = value;
//   let name;

//   let config = {
//     method: "get",
//     url: reqURL,
//     params: {
//       sysparm_query: `sys_id=${sysId}`,
//     },
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: "Basic cm9zYWxrZTozI3VCY3ZvJA==",
//     },
//   };

//   const getUser = await axios(config);
//   const userData = getUser.data.result;
//   for (i = 0; i < userData.length; i++) {
//     name = userData[i].name;
//   }
//   return name;
// };

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
      Authorization: "Basic cm9zYWxrZTozI3VCY3ZvJA==",
    },
  };

  axios(config)
    .then((response) => {
      //  const callerMap =  response.data.result.map(async (res) => {
      //     let userName;
      //     if (typeof res.caller_id == "object") {
      //       console.log("soo", res.caller_id);
      //       const name = await findUserByCallerId(res.caller_id.value);
      //       userName = name;
      //     }
      //     return userName;
      //   });

      // console.log("NAME", callerMap);

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
      Authorization: "Basic cm9zYWxrZTozI3VCY3ZvJA==",
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
      Authorization: "Basic cm9zYWxrZTozI3VCY3ZvJA==",
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
