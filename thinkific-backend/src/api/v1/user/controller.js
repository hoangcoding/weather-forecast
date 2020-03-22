const httpStatus = require('http-status');
const dayjs = require('dayjs');
const uuidv4 = require('uuid/v4');
const User = require('./model');
const { Error } = require('../../../utils/api-response');
const {
  jwtExpirationInterval,
} = require('../../../config');

async function generateTokenResponse(user) {
  const updateUser = user;
  const refreshToken = uuidv4() + user._id;
  updateUser.sessions = [
    ...updateUser.sessions,
    {
      access_token: updateUser.token(),
      createdAt: dayjs().valueOf(),
      is_active: true,
      refresh_token: refreshToken,
    },
  ];
  updateUser.save();

  const expiresIn = dayjs()
    .add(jwtExpirationInterval, 'minute')
    .valueOf();

  return {
    accessToken: user.token(),
    expiresIn,
    refreshToken,
  };
}


/**
 * Logout
 * @public
 */
exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const user = await User.findOne({
      sessions: {
        $elemMatch: {
          is_active: true,
          refresh_token: refreshToken,
        },
      },
    });

    if (!user) {
      throw new Error({
        message: 'Refresh token did not match',
        status: httpStatus.CONFLICT,
        isPublic: true,
      });
    }

    await User.findOneAndUpdate(
      {
        _id: user._id,
        'sessions.refresh_token': refreshToken,
      },
      { $pull: { sessions: { refresh_token: refreshToken } } },
    );

    return res.status(httpStatus.NO_CONTENT).json();
  } catch (error) {
    return next(error);
  }
};


/**
 * Refresh token function to get new access token
 * @public
 */
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const user = await User.findOne({
      sessions: {
        $elemMatch: {
          is_active: true,
          refresh_token: refreshToken,
        },
      },
    });

    if (!user) {
      throw new Error({
        message: 'Refresh token did not match',
        status: httpStatus.CONFLICT,
        isPublic: true,
      });
    }
    const refreshTokenKey = uuidv4() + user._id;

    await User.updateOne(
      {
        _id: user._id,
        'sessions.refresh_token': refreshToken,
      },
      {
        'sessions.$.refresh_token': refreshTokenKey,
        'sessions.$.updatedAt': dayjs().valueOf(),
      },
    );

    const expiresIn = dayjs()
      .add(jwtExpirationInterval, 'minute')
      .valueOf();

    res.set('authorization', user.token());
    res.set('x-refresh-token', refreshTokenKey);
    res.set('x-token-expiry-time', expiresIn);

    return res.status(httpStatus.NO_CONTENT).json();
  } catch (error) {
    return next(error);
  }
};

/**
 * Login with an existing user
 * @public
 */
exports.login = async (req, res, next) => {
  try {
    const {
      email, password,
    } = req.body;
    const user = await User.findOne(
      { email },
      {
        _id: 1,
        email: 1,
        firstName: 1,
        lastName: 1,
        sessions: 1,
        password: 1,
      },
    );

    if (!user) {
      throw new Error({
        message: 'Account not found',
        status: httpStatus.NOT_FOUND,
        isPublic: true,
      });
    }
    const passwordMatches = await user.passwordMatches(password);

    if (!passwordMatches) {
      throw new Error({
        message: 'Credentials did not match',
        status: httpStatus.CONFLICT,
        isPublic: true,
      });
    }

    const token = await generateTokenResponse(user);

    res.set('authorization', token.accessToken);
    res.set('x-refresh-token', token.refreshToken);
    res.set('x-token-expiry-time', token.expiresIn);
    res.status(httpStatus.OK);

    return res.json(Object.assign(user.transform(), { token }));
  } catch (error) {
    return next(error);
  }
};


/**
 * Creates a new user if valid details
 * @public
 */

exports.register = async (req, res, next) => {
  try {
    const {
      firstName, lastName, email, password,
    } = req.body;

    const isEmailExists = await User.findOne({ email });

    if (isEmailExists) {
      throw new Error({
        message: 'Email address is already exists.',
        status: httpStatus.CONFLICT,
        isPublic: true,
      });
    }

    const user = await new User({
      email,
      firstName,
      lastName,
      password,
    }).save();
    const token = await generateTokenResponse(user);
    res.set('authorization', token.accessToken);
    res.set('x-refresh-token', token.refreshToken);
    res.set('x-token-expiry-time', token.expiresIn);
    res.status(httpStatus.CREATED);
    return res.json(Object.assign(user.transform(), { token }));
  } catch (error) {
    return next(error);
  }
};
