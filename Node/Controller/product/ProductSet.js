var _ = require( "lodash" );
const router = require( "express" ).Router();
module.exports = function ( arrg ) {

    var { Product } = arrg.models;
    var { Bin } = arrg.models;
    var i;
    router.post( arrg.config.apiUrlInitial + "/addBulkProduct", ( req, res, next ) => {
        for ( i = 1; i < req.body.length; i++ ) {
            var product_code = req.body[ i ][ 0 ];
            var product_name = req.body[ i ][ 1 ];
            Product.create( { product_name, product_code } ).then( products => {
                res.end();
            } ).catch( err => {
                return res.status( 422 ).send( { header: "Error", content: "err-msg.CreationFail" } );
            } );
        }
        return;
    } );


    router.post( arrg.config.apiUrlInitial + "/updateProduct", ( req, res, next ) => {
        var { role } = req.data;
        var isNew = ( req.query.isnew == "true" );
        var { product_name, product_code, isActive } = req.body;
        if ( role != arrg.config.validRoles.Admin ) {
            return res.status( 403 ).send( { header: "Error", content: "err-msg.InvalidPermissions" } );
        }

        Product.count( { where: { product_code: product_code } } ).then( productCode_Count => {
            Product.count( { where: { product_name: product_name } } ).then( productName_Count => {
                if ( isNew && productCode_Count <= 0 && productName_Count <= 0 ) {
                    product_image = "unknown.png";
                    Product.create( { product_image, product_name, product_code } ).then( products => {
                        return res.status( 200 ).send( { header: "Success", content: "success-msg.Created" } )
                    } ).catch( err => {
                        return res.status( 422 ).send( { header: "Error", content: "err-msg.CreationFail" } );
                    } );
                    return;
                }
                else if ( !isNew ) {
                    Product.count( { where: { product_name: product_name } } ).then( productName_Count => {
                        if ( productName_Count == 0 || productName_Count == 1 ) {
                            Product.update( { product_name, product_code, isActive }, { where: { product_code } } ).then( product => {
                                return res.status( 200 ).send( { header: "Success", content: "success-msg.Updated" } )
                            } );
                        }
                        else
                            return res.status( 422 ).send( { header: "Error", content: "err-msg.DuplicateCode" } );
                    } )
                }
                else
                    res.status( 409 ).send( { header: "Error", content: "err-msg.DuplicateCode" } );
            } );
        } );
    } )


    router.post( arrg.config.apiUrlInitial + "/deleteProduct", ( req, res, next ) => {
        var { id } = req.body;
        Bin.count( { where: { bin_product: id } } ).then( count => {
            if ( count <= 0 ) {
                Product.update( { isActive: '0' }, { where: { product_code: id } } ).then( counts => {
                    return res.status( 200 ).send( { header: "Success", content: "success-msg.Deleted" } )
                } );
            } else
                res.status( 422 ).send( { header: "Error", content: "err-msg.Associated" } );
        } ).catch( () => {
            return res.status( 422 ).send( { header: "Error", content: "err-msg.NoData" } );
        } );
    } );
    return router;
}