const axios = require("axios");

const getData = async (link,authorization) => {
  let reqURL = link;

  let config = {
    method: "get",
    url: reqURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: authorization,
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
