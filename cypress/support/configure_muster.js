module.exports = {

    muster: function muster() {

        // ----------------------- ADD /rovereto-1137 TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/rovereto-1137')

        // add sample to cart
        cy.contains('Gratis Stoffmuster bestellen').click()

        // ----------------------- ADD /nuvola-4609 TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/nuvola-4609')

        // add sample to cart
        cy.contains('Gratis Stoffmuster bestellen').click()

        // ----------------------- ADD /amparo-4531 TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/amparo-4531')
         //load js files
        // cy.wait('@configurator-js-files')

        // add sample to cart
        cy.contains('Gratis Stoffmuster bestellen').click()

        // ----------------------- ADD /radiance-4876 TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/radiance-4876')
         //load js files
        // cy.wait('@configurator-js-files')

        // add sample to cart
        cy.contains('Gratis Stoffmuster bestellen').click()
    }
}