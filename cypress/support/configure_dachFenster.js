module.exports = {

    dachFenster: function dachFenster() {


        // ----------------------- ADD genormt DF TO CART -------------------------------------
        // ------------------------------------------------------------------------------------

        //load configurator
        cy.visit('/turin-1051')

        cy.contains('Dachfenster').click()

        // Fensterform wählen
        cy.get('input#df20c').check({ force: true })

        //select hersteller, produkt and typ
        cy.get('#df_hersteller_select').select('Roto', { force: true })
        cy.get('#df_product_select').select('520', { force: true })
        cy.get('#df_product_type_select').select('13 / 14 (Holz)', { force: true })

        // select Schienenfarbe
        cy.get('#grau').click({ force: true })

        // input quantity and add to cart
        cy.get('#qty').clear().type('1')
        cy.get('.add_to_cart_button').click()

        // ----------------------- ADD ungenormt DF TO CART -------------------------------------
        // --------------------------------------------------------------------------------------

        // load configurator
        cy.visit('/meran-1176')

        cy.contains('Dachfenster').click()

        /// Fensterform wählen
        cy.get('input#df20').check({ force: true })

        // select ungenormte Fenster
        cy.contains('Ungenormte Fenster').click()

        // set maße
        cy.get('#glasbreite').type('1000')
        cy.get('#glashoehe').type('1400')
        cy.get('#glasleistentiefe').type('50')
        cy.get('#fluegelinnenmass').type('1100')
        cy.get('#fluegelhoehe').type('1500')

        // set falz
        cy.get('#falz_mit_schattenfuge').check({ force: true })

        // select Schienenfarbe
        cy.get('#weiss').check({ force: true })

        // input quantity and add to cart
        cy.get('#qty').clear().type('1')
        cy.get('.add_to_cart_button').click()
    }
}