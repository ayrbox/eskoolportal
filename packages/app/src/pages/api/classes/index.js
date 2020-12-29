import { Class } from '@eskoolportal/api/src/models';
import withAuthentication from '@lib/authenticate';

export default withAuthentication(async function handler(req, res) {
  const classes = await Class.findAll();

  res.status(200).json(classes);
});
