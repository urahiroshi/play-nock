const axios = require('axios');

module.exports = () => {
  return axios.get('http://httpbin.org/get').then((res) => {
    // console.log('ok');
    console.log(res.data);
    return res.data;
  });  
};
