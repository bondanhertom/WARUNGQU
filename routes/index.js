const express = require("express");
const router = express.Router();
const ControllerUser = require("../controllers/users");
const ControllerHistory = require("../controllers/hostories");
const ControllerProduct = require("../controllers/products");
const { authentication } = require("../middlewares/authentication");

router.get("/", (req, res) => {
  res.status(200).json({ massage: "TES UPDATES" });
});

//user login
router.get("/user", ControllerUser.getAllUser);
router.post("/register", ControllerUser.register);
router.post("/login", ControllerUser.login);

//product
router.get("/product", ControllerProduct.getAllProduct);
router.get("/product/:id", authentication, ControllerProduct.getDetailProduct);
router.post("/product", authentication, ControllerProduct.createProduct);
router.put("/product/:id", authentication, ControllerProduct.editProduct);
router.delete("/product/:id", authentication, ControllerProduct.deleteProduct);

//history
router.get("/history", authentication, ControllerHistory.getAllHistory);
router.delete("/history/:id", authentication, ControllerHistory.deleteHistory);




module.exports = router;
