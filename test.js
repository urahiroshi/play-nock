
const axios = require('axios');
const nockBack = require('nock').back;

// nockBack.setMode('record');
nockBack.fixtures = __dirname + '/nockFixtures';

const nockBackOptions = {
  before: function (scope) {
    scope.filteringRequestBody = function (body, aRecordedBody) {
      const fixedBody = JSON.parse(body);
      if (aRecordedBody.timestamp && fixedBody.timestamp) {
        fixedBody.timestamp = aRecordedBody.timestamp;
        return JSON.stringify(fixedBody);
      }
      return body;
    }
  },
};

const test = async () => {
  const { nockDone, context } = await nockBack('httpbin.json', nockBackOptions);
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
