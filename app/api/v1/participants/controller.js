const {
  signupParticipant,
  activateParticipant,
  signinParticipants,
  getAllEvents,
  getDetailEvent,
  getAllOrder,
  checkoutOrder,
  OrderTransaksi,
  getAllPaymentByOrganizer,
} = require("../../../services/mongoose/participants");

const { StatusCodes } = require("http-status-codes");

const signup = async (req, res, next) => {
  try {
    const result = await signupParticipant(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const activeParticipant = async (req, res, next) => {
  try {
    const result = await activateParticipant(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const result = await signinParticipants(req);
    res.status(StatusCodes.OK).json({
      data: { token: result },
    });
  } catch (error) {
    next(error);
  }
};

const getAllEventsLandingPage = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getDetailsEventsLandingPage = async (req, res, next) => {
  try {
    const result = await getDetailEvent(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllDashboard = async (req, res, next) => {
  try {
    const result = await getAllOrder(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const Checkout = async (req, res, next) => {
  try {
    const result = await checkoutOrder(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllPayment = async (req, res, next) => {
  try {
    const result = await getAllPaymentByOrganizer(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  signup,
  activeParticipant,
  signin,
  getAllEventsLandingPage,
  getDetailsEventsLandingPage,
  getAllDashboard,
  Checkout,
  getAllPayment,
};
