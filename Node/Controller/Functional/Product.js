var _ = require("lodash");
const router = require("express").Router();
module.exports = function (arrg) {
    var { Product } = arrg.models;

    router.get("/products", (req, res, next) => {
        Product.findAll({}).then(products => {
            return res.send({ success: true, msg: resp = { products } });
        }).catch(err => {
            return res.status(422).send({ header: "Error", content: "No Data Found" });
        });
    });
    return router;
}