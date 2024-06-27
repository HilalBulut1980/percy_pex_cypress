var data = require("../fixtures/product_pages.json");
var product_pages = data.URLS;
let scrollToBottom = require("scroll-to-bottomjs");


describe('Integration test with visual testing - product pages', function () {

    product_pages.forEach(function (link) {

        it('load page: ' + link + ' & take percy snapshot', function () {
            cy.visit(link);

            cy.window().then(cyWindow => scrollToBottom({ frequency: 150, timing: 20, remoteWindow: cyWindow }));
            cy.scrollTo('top', { duration: 500, ensureScrollable: false })
            // check if FreshChat icon is loaded
            cy.checkFreshChat()
            cy.percySnapshot(link);
        });
    })
})