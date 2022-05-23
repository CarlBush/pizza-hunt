const router = require("express").router();
const pizzaRoutes = require("./pizza-routes");

router.use("/pizzas", pizzaRoutes);

module.exports = router;