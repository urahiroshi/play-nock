const axios = require('axios');
const nockBack = require('nock').back;

// nockBack.setMode('record');
nockBack.fixtures = __dirname + '/nockFixtures';

const test = async () => {
  const { nockDone } = await nockBack('httpbin.json');
  const res = await axios.post('http://httpbin.org/post', { timestamp: (new Date()).toString() });
  console.log(res.data);
  nockDone();
};

test().then(() => {
  process.exit(0);
}).catch((e) => {
  console.log(e.message);
  process.exit(1);
});
