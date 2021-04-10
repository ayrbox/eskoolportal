import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { Subject } from '~/database/entities/Subject';
import { secureRoute } from '~/lib/secureRoute';

const handler = nextConnect();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const subjectId = req.query.subjectId as string;
    const data = req.body as Subject;
    await Subject.update(
      {
        id: subjectId,
      },
      data
    );
    res.status(200).send({ message: 'Subject updated successfully.' });
  } catch (err) {
    res.status(500).send({ message: 'Unable to update subject.' });
  }
});

export default secureRoute(handler);
