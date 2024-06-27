module.exports = {

    senkrechteFenster: function senkrechteFenster() {

        //load configurator
        cy.visit('/liviano-4313')

        //input height and weight
        cy.get('input#hoehe').type('1500')
        cy.get('input#breite').type('1500')

        // input quantity and add to cart
        cy.get('#qty').clear().type('1')
        cy.get('.add_to_cart_button').click()
    }
}