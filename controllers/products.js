const { Product, History, sequelize } = require("../models/index");

class ControllerProduct {
  static async getAllProduct(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getDetailProduct(req, res) {
    try {
    } catch (error) {}
  }

  static async createProduct(req, res) {
    try {
      const { name, description, price, quantity } = req.body;
      const { id, username } = req.user;

      const newProduct = await Product.create({
        name,
        description,
        price,
        quantity,
        userId: id,
      });

      await History.create({
        userId: id,
        productId: newProduct.id,
        action: `${username} Add New Product : ${newProduct.name}`,
        timestamp: newProduct.createdAt,
      });
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  static async editProduct(req, res) {
    try {
      const { name, description, price, quantity } = req.body;
      let id = req.params.id;
      const { username } = req.user;

      const product = await Product.findByPk(id);
      if (!product) {
        throw { name: "Product Not Found" };
      }

      await Product.update({
        name,
        description,
        price,
        quantity,
        userId: id,
      });

      await History.create({
        userId: id,
        productId: product.id,
        action: `${username} Edited Product : ${product.name}`,
        timestamp: new Date(),
      });
      res.status(200).json("success_update");
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async deleteProduct(req, res) {
    try {
      let id = req.params.id;
      const { id: user_id } = req.user;

      await Product.destroy({ where: { id } });

      await History.create({
        userId: user_id,
        productId: id,
        action: "delete",
        timestamp: new Date(),
      });
      res
        .status(200)
        .json({ message: `Successfully delete product with id ${id}` });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
module.exports = ControllerProduct;
