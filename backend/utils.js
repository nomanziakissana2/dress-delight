import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // user,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};
// verify the token number of user before submiting order
export const isAuth2 = (req, res, next) => {
  const autherization = req.body.Autherization;

  if (autherization) {
    const token = autherization.slice(7, autherization.length); // Bearer xxxxxxx(token)
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'invalid Token' });
      } else {
        // console.log(decode);
        req.user = decode;
        // by calling next it go to orderRoutes and continue execution of code from expressAsyncHandler
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'no Token found' });
  }
};
export const isAuth = (req, res, next) => {
  console.log(req.body);
  const autherization = req.body.headers.autherization;

  if (autherization) {
    const token = autherization.slice(7, autherization.length); // Bearer xxxxxxx(token)

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'invalid Token' });
      } else {
        // console.log(decode);
        req.user = decode;
        // by calling next it go to orderRoutes and continue execution of code from expressAsyncHandler
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'no Token found' });
  }
};
