const { signin } = require("../../../services/mongoose/auth");
const { StatusCodes } = require("http-status-codes");
const { token } = require("morgan");

const signinCMS = async (req, res, next) => {
  try {
    const result = await signin(req);

    res.status(StatusCodes.CREATED).json({
      // hasilnya akan token dan rolenya, rolenya didalam dari payload didalam tokennya
      data: {
        token: result.token,
        role: result.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signinCMS };
