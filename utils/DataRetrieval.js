const axios = require("axios");

const getData = async (link) => {
  let reqURL = link;

  let config = {
    method: "get",
    url: reqURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: process.env.BASIC_AUTH,
    },
  };

  const getdata = await axios(config);
  const returnedData = getdata.data;

  if (returnedData == undefined || returnedData == null) {
    return null;
  }
  return returnedData;
};
module.exports = {
  getData,
};
