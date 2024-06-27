module.exports = {

    zubehoer: function zubehoer() {

        // ----------------------- ADD KLEMMTRAEGER TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/klemmtraeger-slim')

        // input quantity and add to cart
        cy.get('#qty').clear().type('1')
        cy.get('.add-to-cart span').contains('In den Warenkorb').click()


        // ----------------------- ADD SPANNSCHUH TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/spannschuh')

        // input quantity and add to cart
        cy.get('#qty').clear().type('1')
        cy.get('.add-to-cart span').contains('In den Warenkorb').click()

        // ----------------------- ADD BEDIENGRIFF DESIGN TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/bediengriff-design')

        // input quantity and add to cart
        cy.get('#qty').clear().type('1')
        cy.get('.add-to-cart span').contains('In den Warenkorb').click()

        // ----------------------- ADD WANDWINKEL TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/wandwinkel')

        // input quantity and add to cart
        cy.get('#qty').clear().type('1')
        cy.get('.add-to-cart span').contains('In den Warenkorb').click()

    }
}