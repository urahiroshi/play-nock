const axios = require('axios');
const nockBack = require('nock').back;

// nockBack.setMode('record');
nockBack.fixtures = __dirname + '/nockFixtures';

const test = async () => {
  const { nockDone } = await nockBack('httpbin.json');
  const res = await axios.get('http://httpbin.org/get');
  console.log(res.data);
  nockDone();
};

test().then(() => {
  process.exit(0);
}).catch(() => {
  process.exit(1);
});
