var data = require("../fixtures/cms_prio2.json");
var cmsPrio2_pages = data.URLS;
let scrollToBottom = require("scroll-to-bottomjs");


describe('Integration test with visual testing - cms prio2 pages', function () {

    cmsPrio2_pages.forEach(function (link) {

        it('load page: ' + link + ' & take percy snapshot', function () {
            cy.visit(link);

            cy.window().then(cyWindow => scrollToBottom({ frequency: 100, timing: 20, remoteWindow: cyWindow }));
            cy.scrollTo('top', { duration: 500, ensureScrollable: false })
            cy.percySnapshot(link);
        });
    })
})