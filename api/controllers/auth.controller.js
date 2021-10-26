const AuthService = require("../../services/auth.services")

const signIn = (req, res) => {
  const { email, password } = req.body

  const user = AuthService.signIn(email, password)
  res.send(200).json({
    user
  })
}

/**
 * genera un nuevo token jwt para el login.
 * @route GET /api/v1/auth/login
 * @author Carlos Ramirez <charlydeveloping@gmail.com>
 * @version 1.0.0
 * @param {Request} req - Request of the api.
 * @param {Response} res - Response of the api.
 */
 const login = async(req, res, next) => {

  const { email, password } = req.body

  try {
      // Verificar si el email existe
      const user = await User.scope('withPassword').findOne({ where: { email } })
      if ( !user ) {
          // throw new ErrorResponse(1201)
      }
              
      // Si el usuario está activo
      if ( !user.is_active ) {
          // throw new ErrorResponse(1201)
      }

      // Verificar la contraseña
      const validPassword = bcryptjs.compareSync( password, user.password )
      if ( !validPassword ) {
          // throw new ErrorResponse(1201)
      }

      //obtener perfil
      const profile = await Profile.findOne({
          where: { id: user.fk_profile}
      })

      // Generar el JWT
      const token = await generarJWT( user.id )

      res.status(200).json({
          success: true,
          message: "Usuario logueado exitosamente",
          data: {
              user: {
                  id: user.id,
                  name: user.full_name,
                  email: user.email,
                  id_staff: user.fk_staff,
                  id_profile: user.fk_profile,
                  dni: staff.dni,
                  management: staff.management,
                  acronym: staff.acronym_management,
                  position: staff.position,
                  profile: profile.name
              },
              token
          }
      })

  } catch (e) {
      next(e)
  }   

}

module.exports = {
  signIn
}