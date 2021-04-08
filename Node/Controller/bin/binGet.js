var router = require( "express" ).Router();
module.exports = function ( arrg ) {
    var { Bin, Device, Location, Product, Warehouse } = arrg.models;
    router.get( arrg.config.apiUrlInitial + "/bins", ( req, res, next ) => {
        var { userid } = req.data;

        arrg.utilities.findUser( userid, ( err, user ) => {
            if ( err ) return next( err )
            if ( user == null )
                return res.status( 422 ).send( { header: "Error", content: "err-msg.NoData" } );
            Bin.findAll(
                {
                    include: [ { model: Warehouse, as: 'warehouse' }, { model: Location, as: 'location' },
                    { model: Product, as: 'product' }, { model: Device, as: 'device' } ]
                }
            ).then( bins => {
                return res.send( {
                    success: true,
                    msg: resp = {
                        bins
                    }
                } );
            } ).catch( err => {
                return res.status( 422 ).send( { header: "Error", content: "err-msg.NoData" } );
            } );
        } )
    } );
    return router;
}