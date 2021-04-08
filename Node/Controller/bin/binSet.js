var _ = require("lodash");
var router = require("express").Router();

module.exports = function (arrg) {
    var { Bin, Device } = arrg.models;

    //Soft deleting the Bin
    router.post(arrg.config.apiUrlInitial + "/deleteBin", (req, res, next) => {
        var { status, id } = req.body;
        Bin.update({ isActive: status }, { where: { bin_code: id } }).then(counts => {
            if (counts != null) {
                Bin.findOne({ where: { bin_code } }).then(old_bin => {
                    old_bin_device_id = old_bin.bin_device;
                    //setting old device used in bin as Un-used
                    Device.update({ isUsed: '0' }, { where: { device_code: old_bin_device_id } }).then(device_set_unsed => {
                        if (device_set_unsed == null)
                            return res.status(422).send({ header: "Error", content: "err-msg.UpdationFail" });
                        else
                            return res.status(200).send({ header: "Success", content: "success-msg.Deleted" })
                    })
                })
            }
        }).catch(err => {
            return res.status(422).send({ header: "Error", content: "err-msg.DeletionFail" });;
        });
    });

    //adding updating the bin details.aa
    router.post(arrg.config.apiUrlInitial + "/saveBin", (req, res, next) => {
        var isNew = (req.query.isnew == "true");
        var { bin_code, bin_device, threshold, bin_warehouse, bin_product, bin_location, isActive } = req.body;

        Bin.count({ where: { bin_code } }).then(count => {

            //adding the new bin
            if (isNew && count <= 0) {
                Bin.create({ bin_code, bin_device, bin_stock: threshold, bin_warehouse, bin_product, bin_location }).then(binNew => {
                    if (binNew) {
                        //setting the device as used when adding new bin.
                        Device.update({ isUsed: '1' }, { where: { device_code: bin_device } }).then(used_Devices => {
                            return res.status(200).send({ header: "Success", content: "success-msg.Updated" });
                        }).catch(err => {
                            return res.status(422).send({ header: "Error", content: "err-msg.UpdationFail" });;
                        });
                        res.status(200).send({ header: "Success", content: "success-msg.Created" });
                    }
                }).catch(err => {
                    return res.status(422).send({ header: "Error", content: "err-msg.CreationFail" });;
                });
            }

            //updating bin details
            else if (!isNew) {
                Bin.findOne({ where: { bin_code } }).then(old_bin => {
                    old_bin_device_id = old_bin.bin_device;
                    //setting old device used in bin as Un-used
                    Device.update({ isUsed: '0' }, { where: { device_code: old_bin_device_id } }).then(device_set_unsed => {
                        if (device_set_unsed == null)
                            return res.status(422).send({ header: "Error", content: "err-msg.UpdationFail" });
                    })
                })
                //Updating the device with new details edited
                Bin.update({ bin_device, bin_product, bin_location, bin_warehouse, isActive, bin_stock: threshold }, { where: { bin_code } }).then(binNew => {
                    //setting the device as used.
                    Device.update({ isUsed: '1' }, { where: { device_code: bin_device, isActive: '1' } }).then(used_Devices => {
                    }).catch(err => {
                        return res.status(422).send({ header: "Error", content: "err-msg.UpdationFail" });
                    });
                    res.status(200).send({ header: "Success", content: "success-msg.Updated" })
                }).catch(() => {
                    return res.status(422).send({ header: "Error", content: "err-msg.UpdationFail" });
                });
            }
            else
                res.status(409).send({ header: "Error", content: "err-msg.DuplicateCode" });
        })
    });
    return router;
}