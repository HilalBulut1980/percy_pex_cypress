var data = require("../fixtures/cms_prio1.json");
var cmsPrio1_pages = data.URLS;
let scrollToBottom = require("scroll-to-bottomjs");


describe('Integration test with visual testing - cms prio1 pages', function () {

    cmsPrio1_pages.forEach(function (link) {

        it('load page: ' + link + ' & take percy snapshot', function () {
            cy.visit(link);

            cy.window().then(cyWindow => scrollToBottom({ frequency: 150, timing: 20, remoteWindow: cyWindow }));
            cy.scrollTo('top', { duration: 500, ensureScrollable: false })
            cy.percySnapshot(link);
        });
    })
})