const request = require("request");
module.exports = {
  getApi: (search, callBack) => {
    try {
      url = "https://jsonplaceholder.typicode.com/";
      url += search;
      request({ url, json: true }, (err, { body }) => {
        if (err) callBack(err, false);
        else callBack(false, body);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
