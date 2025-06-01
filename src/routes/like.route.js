import { Router } from "express";
const likeRouter = Router();

likeRouter.get('/like', (req, res) => {
  res.status(200).json({ message: "Like route works!" });
});

export { likeRouter };