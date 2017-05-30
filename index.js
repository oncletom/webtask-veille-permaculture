const request = require('superagent@1.2.0');

const cleanTitle = text => text.replace(/^.*Veille permaculture : /, '');
const cleanBody = text => text.replace(/[\\s\\t\\n]*Pour ne plus être destinataire de cette veille[\s\S.]+$/i, '');

module.exports = function(ctx, cb) {
  const ENDPOINT = ctx.secrets.IFTTT_MAKER_ENDPOINT;
  const title = ctx.body['Subject'];
  const body = ctx.body['body-html'];
  
  const data = {
    value1: cleanTitle(title),
    value2: cleanBody(body)
  };
  
  request.post(ENDPOINT).send(data).end(cb);
};
