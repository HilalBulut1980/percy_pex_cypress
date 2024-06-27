var data = require("../fixtures/product_galleries.json");
var product_pages = data.URLS;
var zubehoer_pages = data.URLS_zubehoer;


describe('Integration test with visual testing - image popups', function () {


    // it('percy snapshots of product picture galleries', function () {

    //     product_pages.forEach(function (link) {

    //         cy.visit(link)
    //         //load js files
    //         // cy.wait('@configurator-js-files')
    //         //check if main image is visible
    //         cy.get('#image').should('be.visible')
    //         //check if all gallery pictures are visible yet
    //         cy.get('.small_gallery > ul li')
    //             // .should('have.length', 12)
    //             .each(($li) => { // iterate through each 'li'
    //                 cy.wrap($li).children().each(($img) => { // iterate through each child of li --> img
    //                     cy.wrap($img).should('be.visible')
    //                 })
    //             })
    //         //check if FreshChat icon is visible
    //         cy.checkFreshChat()
    //         //take snapshot of first image
    //         cy.get('#image').click()
    //         cy.percySnapshot('1st popup image of ' + link)

    //         //take snapshot of second image
    //         cy.get('#img-popup-next').click()
    //         cy.percySnapshot('2nd popup image of ' + link)

    //         //take snapshot of third image
    //         cy.get('#img-popup-next').click()
    //         cy.percySnapshot('3rd popup image of ' + link)

    //         //take snapshot of fourth image
    //         cy.get('#img-popup-next').click()
    //         cy.percySnapshot('4th popup image of ' + link)

    //         //take snapshot of fifth image
    //         cy.get('#img-popup-next').click()
    //         cy.percySnapshot('5th popup image of ' + link)

    //     })
    // })

    it('percy snapshots of zubehoer picture galleries', function () {

        zubehoer_pages.forEach(function (link) {

            cy.visit(link)
            //load js files
            // cy.wait('@configurator-js-files')
            //check if main image is visible
            cy.get('#image').should('be.visible')
            //check if all gallery pictures are visible yet
            cy.get('.small_gallery > ul li')
                // .should('have.length', 12)
                .each(($li) => { // iterate through each 'li'
                    cy.wrap($li).children().each(($img) => { // iterate through each child of li --> img
                        cy.wrap($img).should('be.visible')
                    })
                })
            //check if FreshChat icon is visible
            cy.checkFreshChat()
            //take snapshot of first image
            cy.get('#image').click()
            cy.percySnapshot('1st popup image of ' + link)

            //take snapshot of second image
            cy.get('#img-popup-next').click()
            cy.percySnapshot('2nd popup image of ' + link)

            //take snapshot of third image
            cy.get('#img-popup-next').click()
            cy.percySnapshot('3rd popup image of ' + link)

            //take snapshot of fourth image
            cy.get('#img-popup-next').click()
            cy.percySnapshot('4th popup image of ' + link)

        })
    })
})