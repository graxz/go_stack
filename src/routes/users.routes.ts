import { Router } from 'express';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  try {
    
    return res.send();
  } catch (err) {
    return res.json({ error: err.message });
  }
})

export default userRouter;
