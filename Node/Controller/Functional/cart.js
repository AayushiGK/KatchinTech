var router = require("express").Router();
module.exports = function (arrg) {
    var { Cart } = arrg.models;

    router.post('addProductToCart', (req, res, next) => {
        console.log(req.body);
        Cart.create({}).then(() => {
            return res.status(200).send({ header: "Success", content: "Successfully created" })
        }).catch(err => {
            return res.status(422).send({ header: "Error", content: "Unable to Add product to cart" });
        });
    })

    router.get("/cart", (req, res, next) => {
        Cart.findAll({}).then(cart => {
            return res.send({
                success: true,
                msg: resp = { cart }
            });
        }).catch(err => {
            return res.status(422).send({ header: "Error", content: "No Data Found" });
        });
    })

    router.post()
    return router;
}