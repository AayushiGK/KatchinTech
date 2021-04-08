var router = require( "express" ).Router();
module.exports = function ( arrg ) {
    var { Device, Device_Type } = arrg.models;
    var { Device_Reading } = arrg.mongo_model;

    router.get( arrg.config.apiUrlInitial + "/device_types", ( req, res, next ) => {
        Device_Type.findAll( { raw: true } ).then( types => {
            return res.send( {
                success: true,
                msg: resp = {
                    types
                }
            } );
        } ).catch( err => {
            return res.status( 422 ).send( { header: "Error", content: "err-msg.NoData" } );
        } );
    } );

    router.get( arrg.config.apiUrlInitial + "/devices", ( req, res, next ) => {
        var { userid, role } = req.data;
        arrg.utilities.findUser( userid, ( err, user ) => {
            if ( err ) return next( err );
            if ( user == null )
                return res.status( 422 ).send( { header: "Error", content: "err-msg.NoData" } );
            else if ( role == arrg.config.validRoles.Admin ) {
                // all devices
                Device.findAll( { include: [ { model: Device_Type, as: 'device_type' } ] } ).then( devices => {
                    // un-used devices
                    Device.findAll( { where: { isUsed: '0', isActive: '1' } }, { include: [ { model: Device_Type, as: 'device_type' } ] } ).then( unassigned_devices => {
                        Device_Reading.find( {} ).exec( function ( err, device_readings ) {
                            return res.send( {
                                success: true,
                                msg: resp = {
                                    devices,
                                    unassigned_devices,
                                    device_readings
                                }
                            } );
                        } );
                        return;
                    } );
                } ).catch( err => {
                    return res.status( 422 ).send( { header: "Error", content: "err-msg.NoData" } );
                } );
            }
        } );
    } );
    return router;
};