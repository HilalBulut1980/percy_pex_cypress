var data = require("../fixtures/category_pages.json");
var categoryPages = data.URLS;
let scrollToBottom = require("scroll-to-bottomjs");


describe('Integration test with visual testing - category pages', function () {

    categoryPages.forEach(function (link) {

        it('load page: ' + link + ' & take percy snapshot', function () {
            cy.visit(link);

            cy.window().then(cyWindow => scrollToBottom({ frequency: 150, timing: 20, remoteWindow: cyWindow }));
            cy.scrollTo('top', { duration: 500, ensureScrollable: false })
            cy.checkFreshChat()
            cy.percySnapshot(link);
        });
    })
})