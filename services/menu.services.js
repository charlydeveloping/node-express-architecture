const Menu = require("../models").menu;
const ListToTree = require("../helpers/list-to-tree");
class MenuService {
  /**
   * @description gets the list of the menus
   * @author Carlos Ramirez <cramirez@miteleferico.bo>
   * @version 1.0.0
   */
  static async getAllMenus() {
    const menus = await Menu.findAll({
      attributes: [
        "id",
        "uuid",
        ["fk_menu", "parent_id"],
        "name",
        "icon",
        "to",
      ],
      raw: true,
    });
    console.log({ menus });
    return ListToTree(menus);
  }
}

module.exports = MenuService;
