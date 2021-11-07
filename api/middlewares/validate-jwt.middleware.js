const User = require("../../models").user
const jwt = require("jsonwebtoken")

const validateJwt = async (req, res, next) => {
  const auth_header = req.headers.authorization;

  if (!auth_header) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  if (!auth_header.startsWith("Bearer ")) {
    throw res.status(401).json({
      msg: "Unauthorized",
    });
  }

  try {
    const bearer_token = (TokenArray = auth_header.substring(
      7,
      auth_header.length
    ))

    const { user: uuid } = await jwt.verify(
      bearer_token,
      process.env.SECRETORPRIVATEKEY
    );

    const user = await User.findOne({ where: { uuid } });
    if (!user) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe en db",
      })
    }
    req.user = user;
    
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validateJwt,
};
