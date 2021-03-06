const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const qs = require("querystring");
const { getData } = require("../../utils/DataRetrieval");

const router = express.Router();

//Grab env variables
const snowDomain = process.env.INSTANCE_DOMAIN;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
// let accessToken = "bvkQDpxjq7RtLJV2AEXIab9_SRMsG3ImIa7Kk5ZZJasKR1h9XGJyCkFL0FOQLyjtALj0zTlIF80g0ktqMJi7Ag";

router.post("/auth", async (req, res) => {
  // console.log(req.body.authCode);

  const authURL = "https://ecolabqa.service-now.com/oauth_token.do";
  let AuthCode = req.body.authCode;

  const authRequest = qs.stringify({
    code: AuthCode,
    grant_type: "authorization_code",
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: "https://quiet-everglades-59480.herokuapp.com/callback",
  });

  const config = {
    method: "post",
    url: authURL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: authRequest,
  };

  const result = await axios(config).catch((err) => {
    console.log("Auth Request Error ", err.message);
  });
  console.log(result.data);

  const { access_token, refresh_token } = result.data;

  res.send({ access_token, refresh_token });
});

// Endpoint used to grab the refreshtoken and get a new access token for agent
router.post("/refresh", async (req, res) => {
  const authURL = "https://ecolabqa.service-now.com/oauth_token.do";

  const { refresh_token } = req.body;

  const authRequest = qs.stringify({
    refresh_token: refresh_token,
    grant_type: "refresh_token",
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: "https://quiet-everglades-59480.herokuapp.com/callback",
  });

  const config = {
    method: "post",
    url: authURL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: authRequest,
  };

  const result = await axios(config).catch((err) => {
    console.log("Auth Request Error ", err.message);
  });

  let { access_token } = result.data;
  let refreshToken = result.data.refresh_token;

  res.send({ access_token: access_token, refresh_token: refreshToken });
});

// create Incident Endpoint
router.post("/incident", (req, res) => {
  let reqURL = `${snowDomain}/api/now/v1/table/incident`;

  const { authorization } = req.headers;

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

  // LP SNOW TEST
  const config = {
    method: "post",
    url: reqURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: authorization,
    },
    data: incidentBody,
  };

  axios(config)
    .then((response) => {
      res.status(200).send({ responseData: response.data }).end();
    })
    .catch((error) => {
      console.log("Incident Creation Falure: ", error.message);
      res
        .status(401)
        .send({ errMessage: "Access Denied", resError: error.message });
    });
});

// Search Incidents Endpoint
router.post("/searchIncident", (req, res) => {
  let reqURL = `${snowDomain}/api/now/v1/table/incident`;
  let incidentNum = req.body.searchterm;

  const { authorization } = req.headers;

  let config = {
    method: "get",
    url: reqURL,
    params: {
      sysparm_query: `active=true^number=${incidentNum}`,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: authorization,
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
          const nam = await findUserByCallerId(
            res.caller_id.value,
            authorization
          );
          let userName = nam;
          grabName(userName);
        }
        return;
      });

      // The whole purpose of this function is to grab the user's name from the promise so that it can be sent over to the client side
      const grabName = (name) => {
        username = name;
        // send response data nd username over to the client side so that it can be displayed pon the page
        res.send({ ResponseData: response.data, user: username }).end();
      };
    })
    .catch((error) => {
      console.log("Error at Search Incident Endpoint: ", error.message);
      res
        .status(error.response.status)
        .send({ errMessage: "Access Denied", resError: error.message });
    });
});

// Function that gets used to make another api call to the SNOW user table with the caller id's sys id to grab the user's full name
const findUserByCallerId = async (value, authorization) => {
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
      Authorization: authorization,
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
  const { authorization } = req.headers;

  let searchQuery = req.body.searchterm;

  let config = {
    method: "get",
    url: reqURL,
    params: {
      q: searchQuery,
      num: "30",
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  };

  axios(config)
    .then(async (response) => {
      // console.log(response.data.result.results);

      let articles = response.data.result.results;

      const ids = articles.map((item) => {
        return item.id.split(":")[1];
      });

      const kbData = [];

      const promises = [];

      for (let idx = 0; idx < ids.length; idx++) {
        let id = ids[idx];

        promises.push(getKnowledge(id, authorization));
      }

      Promise.all(promises)
        .then((values) => {
          values.forEach((item) => {
            const { sys_id, number } = item.data.result;

            let kbItem = articles.find(
              (kbEntry) => kbEntry.id.split(":")[1] == sys_id
            );

            const kbReturned = {
              ResponseData: kbItem,
              ownershipGroup: number,
            };

            kbData.push(kbReturned);
          });

          res.send({ returnedData: kbData });
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).send({ resError: err.message });
        });
    })
    .catch((error) => {
      console.log(error.message);
      res
        .status(401)
        .send({ errMessage: "Access Denied", resError: error.message });
    });
});

// Function used to grab more data from specific knowledge articles
const getKnowledge = (id, authorization) => {
  let reqURL = `${snowDomain}/api/now/table/kb_knowledge/${id}`;

  let config = {
    method: "get",
    url: reqURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  };

  return new Promise((resolve, reject) => {
    const getKnowledge = axios(config);

    resolve(getKnowledge);
  });
};

//Search User Endpoint
router.post("/searchUser", (req, res) => {
  const reqURL = `${snowDomain}/api/now/table/sys_user`;
  const searchValue = req.body.searchterm;
  const { authorization } = req.headers;
  console.log(authorization);

  const config = {
    method: "get",
    url: reqURL,
    params: {
      sysparm_query: `email=${searchValue}`,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  };

  axios(config)
    .then((response) => {
      response.data.result.map(async (res) => {
        if (
          typeof res.u_division == "object" &&
          typeof res.location == "object" &&
          typeof res.manager == "object"
        ) {
          // console.log("YEAH!!", res);
          const division = await grabDivision(
            res.u_division.link,
            authorization
          );

          const locale = await grabLocation(res.location.link, authorization);

          const manager = await grabManager(res.manager.link, authorization);

          grabData(division, locale, manager);
        } else {
          let division;
          let locale;
          let manager;

          // Validation to check to see if the data from api call has division  present or not, if not present return null
          res.u_division === null ||
          res.u_division === undefined ||
          res.u_division === ""
            ? (division = null)
            : (division = await grabDivision(
                res.u_division.link,
                authorization
              ));

          // Validation to check to see if the data from api call has location  present or not, if not present return null
          res.location === null ||
          res.location === undefined ||
          res.location === ""
            ? (locale = null)
            : (locale = await grabLocation(res.location.link, authorization));

          // Validation to check to see if the data from api call has manager  present or not, if not present return null
          res.manager === null ||
          res.manager === undefined ||
          res.manager === ""
            ? (manager = null)
            : (manager = await grabManager(res.manager.link, authorization));

          grabData(division, locale, manager);
        }
      });

      // This function simply just grabs the data from the mapping of the results array that gets returned from the axios api call
      const grabData = (division, location, manager) => {
        res
          .send({
            ResponseData: response.data,
            division: division,
            location: location,
            manager: manager,
          })
          .end();
      };
    })
    .catch((error) => {
      console.log(error.message);
      res
        .status(401)
        .send({ errMessage: "Access Denied", resError: error.message });
    });
});

// Function used to grab the Division of Users
const grabDivision = async (divLink, authorization) => {
  // external function (getData) from the utils folder to grab data from endpoints so that it can be manipulated
  const returnedData = await getData(divLink, authorization);

  const divisionData = returnedData.result;
  const division = divisionData.u_name;

  if (division == undefined || division == null) {
    return null;
  }
  return division;
};

// Function used to grab the Location of Users
const grabLocation = async (locaLink, authorization) => {
  // external function (getData) from the utils folder to grab data from endpoints so that it can be manipulated
  const returnedData = await getData(locaLink, authorization);

  const locationData = returnedData.result;
  const location = locationData.full_name;

  if (location == undefined || location == null) {
    return null;
  }
  return location;
};

// Function used to grab the Manager of Users
const grabManager = async (manLink, authorization) => {
  // external function (getData) from the utils folder to grab data from endpoints so that it can be manipulated
  const returnedData = await getData(manLink, authorization);

  const managerData = returnedData.result;
  const manager = managerData.name;

  if (manager == undefined || manager == null) {
    return null;
  }
  return manager;
};

module.exports = router;
