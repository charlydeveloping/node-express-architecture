const MenuService = require("../../services/menu.services");
const asyncHandler = require("../middlewares/async");

/**
 * @description gets the list of the menus
 * @route GET /api/v1/menus/getallmenus
 * @author Carlos Ramirez <charlydeveloping@gmail.com>
 * @version 1.0.0
 * @param {Request} req - Request of the api.
 * @param {Response} res - Response of the api.
 */
const getAllMenus = asyncHandler(async (req, res) => {
  const menus = await MenuService.getAllMenus();
  return res.status(200).json({
    success: true,
    message: "Los menus han sido obtenidos exitosamente.",
    data: menus,
  });
});

module.exports = {
  getAllMenus,
};
