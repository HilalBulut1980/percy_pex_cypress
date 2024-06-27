var vertikaleFenster = require("../support/configure_senkrechteFenster.js");
var sonderformen = require("../support/configure_sonderFormen.js");
var dachfenster = require("../support/configure_dachFenster.js");
var zubehoer = require("../support/configure_zubehoer.js");
var muster = require("../support/configure_muster.js");
var serviceProdukte = require("../support/configure_serviceProdukte.js");
var checkOut = require("../support/checkout.js");



describe('Integration test with visual testing - order process incl. all product groups', function () {

    it('pdp2checkout: add all products to cart and test checkout', function () {

        vertikaleFenster.senkrechteFenster()
        dachfenster.dachFenster()
        sonderformen.sonderFormen()
        zubehoer.zubehoer()
        muster.muster()
        serviceProdukte.serviceProdukte()

        checkOut.checkout()
        checkOut.emptyCart()
    })
})