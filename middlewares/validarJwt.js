const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const validarJwt = async (req = request, res = response, next) => {
  const token = req.header("Access-Token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay Token",
    });
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({
      msg: e,
    });
  }
};

module.exports = {validarJwt}