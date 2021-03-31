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

// router.post("/callback", (req, res) => {
//   console.log(req.body);
//   res.sendStatus(200).send();
// });

// // Handle Auth call to Api endpoint within ServiceNow application registry
// router.get("/auth", (req, res) => {

//   const authURL = `https://login.microsoftonline.com/c1eb5112-7946-4c9d-bc57-40040cfe3a91/oauth2/v2.0/authorize`;

//   const authRequest = {
//     scope: "user_impersonation",
//     client_id: "6b68ef85-288b-4ef5-8019-b494be7a206e",
//     redirect_uri:
//       "https://quiet-everglades-59480.herokuapp.com/callback" /* Tell Josh to update the azure app */,
//     response_mode: "query",
//     response_type: "token",
//   };

//   const config = {
//     method: "get",
//     url: authURL,
//     headers: {
//       "Content-Type": "text/html; charset=utf-8",
//     },
//     params: authRequest,
//   };

//   console.log(config);
//   console.log("authRequest",JSON.stringify(authRequest));



//   axios(config)
//     .then((response) => {
//       // console.log(JSON.stringify(response.data));
//       // res.set("Content-Type", "text/html");

//       res.send(response.data);
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });

// });

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
