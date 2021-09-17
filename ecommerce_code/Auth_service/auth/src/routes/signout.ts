import express from 'express';
const router = express.Router();

router.post('/api/users/signout', (req, res, next) => {
  res.cookie('access_token',null); 
  res.status(201).json({Message: "Sign Out Success"});
});

export { router as signoutRouter };