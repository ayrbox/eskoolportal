import nextConnect from "next-connect";

const handler = nextConnect();

handler.post((req, res) => {
  res.json({ user: "test" });
});

export default handler;
