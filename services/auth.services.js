const jwt = require("jsonwebtoken");

class AuthService {

	static async getUserWithPassword(email) {
		const user = await User.scope("withPassword").findOne({
			where: { email },
		});
		if (!user) {
			return null
		}
		return user
	}

  static async login(email, password) {
    try {
     const user = this.getUserWithPassword(email)

      // Si el usuario está activo
      if (!user.is_active) {
        // throw new ErrorResponse(1201)
      }

      // Verificar la contraseña
      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword) {
        // throw new ErrorResponse(1201)
      }

      //obtener perfil
      const profile = await Profile.findOne({
        where: { id: user.fk_profile },
      });

      // Generar el JWT
      const token = await generarJWT(user.id);
    } catch (error) {}
  }

  static async generateJWT(user) {
    try {
      const token = await jwt.sign(user, process.env.SECRETORPRIVATEKEY, {
        expiresIn: "4h",
      });
      return token;
    } catch (error) {
      console.log(error);
      return "No se pudo generar el token";
    }
  }
}

module.exports = AuthService;
