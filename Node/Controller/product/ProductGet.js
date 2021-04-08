var _ = require( "lodash" );
const router = require( "express" ).Router();
module.exports = function ( arrg ) {
    var { Product } = arrg.models;
    router.get( arrg.config.apiUrlInitial + "/products", ( req, res, next ) => {
        var { userid } = req.data;
        arrg.utilities.findUser( userid, ( err, user ) => {
            if ( err ) return next( err );
            if ( user == null )
                return res.status( 422 ).send( { header: "Error", content: "err-msg.NoData" } );
            else {
                Product.findAll( { raw: true } ).then( products => {
                    formatProductData( products, ( err, products2 ) => {
                        if ( err )
                            return res.status( 422 );
                        return res.send( {
                            success: true,
                            msg: resp = {
                                products
                            }
                        } );
                    } );
                } ).catch( () => {
                    return res.status( 422 ).send( { header: "Error", content: "err-msg.NoData" } );
                } );
            }
        } );

    } );

    function formatProductData( products, callback ) {
        productIdList = [];
        products.forEach( ( p, i ) => {
            productIdList.push( p.product_code );//(push(p._id);)
            var product = {
                product_code: p.product_code,
                product_name: p.product_name,
                product_image: '/public/image/product_images/' + p.product_image,
                product_category: p.product_category,
                isActive: p.isActive,
            }
            products[ i ] = product;
        } );
        callback( null, products );
    }
    return router;
}