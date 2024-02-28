const { History, User, Product } = require("../models/index");

class ControllerHistory {
  static async getAllHistory(req, res) {
    try {
      const allHistory = await History.findAll({
        include: [
            {
              model: User,
              attributes: { exclude: ["password"] }
            }
        ] 
      });

      res.status(200).json(allHistory);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteHistory(req, res) {
    try {
      let id = req.params.id;
      await History.destroy({ where: { id } });
      res
        .status(200)
        .json({ message: `Successfully delete History with id ${id}` });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
module.exports = ControllerHistory;
