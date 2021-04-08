var _ = require( "lodash" );
var router = require( "express" ).Router();

module.exports = function ( arrg ) {
    var { Bin, Device } = arrg.models;
    var { Device_Reading } = arrg.mongo_model;

    router.post( arrg.config.apiUrlInitial + "/saveDevice", ( req, res, next ) => {
        var isNew = ( req.query.isnew == "true" );
        var { device_name, device_code, device_type, isActive } = req.body;
        device_category = device_type;
        var device_reading = new Device_Reading( { deviceCode: device_code } );
        Device.count( { where: { device_code } } ).then( count => {
            if ( isNew && count <= 0 ) {
                Device.create( { device_name, device_code, device_category } ).then( device2 => {
                    return res.status( 200 ).send( { header: "Success", content: "success-msg.Created" } )
                } ).catch( err => {
                    return res.status( 422 ).send( { header: "Error", content: "err-msg.CreationFail" } );
                } );

            }
            if ( isNew && count <= 0 && device_category === 'Sensor' ) {
                Device_Reading.findOne( { deviceCode: device_code } ).count().exec( function ( ifDevice ) {
                    if ( ifDevice <= 0 ) {
                        device_reading.save().then( ( device_reading ) => {
                            return res.status( 200 ).send( { header: "Success", content: "success-msg.Created" } );
                        } ).catch( err => {
                            return res.status( 422 ).send( { header: "Error", content: "err-msg.CreationFail" } );
                        } );
                    }
                } )
            }
            else if ( !isNew ) {
                Device.update( { device_name, device_category, isActive }, { where: { device_code } } ).then( device2 => {
                    return res.status( 200 ).send( { header: "Success", content: "success-msg.Updated" } )
                } ).catch( err => {
                    return res.status( 422 ).send( { header: "Error", content: "err-msg.UpdationFail" } );
                } );
            }
            else if ( isNew && count > 0 )
                return res.status( 409 ).send( { header: "Error", content: "err-msg.DuplicateCode" } );
        } ).catch( err => {
            return res.status( 422 ).send( { header: "Error", content: "err-msg.NoData" } );
        } );
    } );


    //delete device
    router.post( arrg.config.apiUrlInitial + "/deleteDevice", ( req, res, next ) => {
        var { id } = req.body;
        Bin.findOne( { where: { 'bin_device': id } } ).then( bin => {
            if ( bin <= 0 ) {
                Device.update( { isActive: '0' }, { where: { device_code: id, isUsed: '0' } } ).then( counts => {
                    res.status( 200 ).send( { header: "Success", content: "success-msg.Deleted" } )
                } ).catch( err => {
                    return res.status( 422 ).send( { header: "Error", content: "err-msg.NoData" } );
                } );
            }
            else {
                res.status( 422 ).send( { error: "err-msg.Associated", header: 'Error' } );
            }
        } )
    } );
    return router;
}