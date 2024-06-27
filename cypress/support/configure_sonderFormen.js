module.exports = {

    sonderFormen: function sonderFormen() {

        // ----------------------- ADD DREIECK TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/crush-topar-4614')

        //Auswahl Tab Sonderformen
        cy.contains('Sonderformen').click()

        // Fensterform wählen
        cy.get('#triangle').click({ force: true })

        // Plisseetyp wählen
        cy.get('#vs9').click({ force: true })

        //input height and weight
        cy.get('input#hoehe').type('1500')
        cy.get('input#breite').type('1100')

        // select Schienenfarbe
        cy.get('#schwarzbraun').check({ force: true })

        // input quantity and add to cart
        cy.get('#qty').clear().type('1')
        cy.get('.add_to_cart_button').click()


        // ----------------------- ADD VIERECK TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/accento-1543')

        //Auswahl Tab Sonderformen
        cy.contains('Sonderformen').click()

        // Fensterform wählen
        cy.get('#rectangle').click({ force: true })

        // Plisseetyp wählen
        cy.get('#vs3').click({ force: true })

        //input height and weight
        cy.get('input#hoehe').type('1400')
        cy.get('input#breite').type('1000')

        // select second cloth
        cy.get('#unterer_stoff_gruppe_select').select('Allessandria')
        cy.get('#unterer_stoff_nummer_select').select('1232')

        // select Schienenfarbe
        cy.get('#anthrazit').check({ force: true })

        // input quantity and add to cart
        cy.get('#qty').clear().type('1')
        cy.get('.add_to_cart_button').click()

        // ----------------------- ADD FÜNFECK TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/lecce-4912')

        //Auswahl Tab Sonderformen
        cy.contains('Sonderformen').click()

        // Fensterform wählen
        cy.get('#pentagon').click({ force: true })

        // Plisseetyp wählen
        cy.get('#vs5').click({ force: true })

        // input height and weight
        cy.get('#breite_oben').type('500')
        cy.get('#breite_unten').type('1000')
        cy.get('#hoehe_links').type('1500')
        cy.get('#hoehe_rechts').type('1000')

        // select Schienenfarbe
        cy.get('#bronze').check({ force: true })

        // input quantity and add to cart
        cy.get('#qty').clear().type('1')
        cy.get('.add_to_cart_button').click()


        // ----------------------- ADD hexagon TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/crush-topar-4255')

        //Auswahl Tab Sonderformen
        cy.contains('Sonderformen').click()

        // Fensterform wählen
        cy.get('#hexagon').click({ force: true })

        // Plisseetyp wählen
        cy.get('#vs6').click({ force: true })

        // input height and weight
        cy.get('#breite_oben').type('500')
        cy.get('#breite_unten').type('1000')
        cy.get('#gesamthoehe').type('1500')
        cy.get('#teilhoehe').type('1000')

        // select Schienenfarbe
        cy.get('#silber').check({ force: true })

        // input quantity and add to cart
        cy.get('#qty').clear().type('1')
        cy.get('.add_to_cart_button').click()

        // ----------------------- ADD PLAFOND TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        cy.visit('/radiance-4876')

        //Auswahl Tab Sonderformen
        cy.contains('Sonderformen').click()

        // Fensterform wählen
        cy.get('#plafond').click({ force: true })

        // Plisseetyp wählen
        cy.get('#plk13').click({ force: true })

        //input height and weight
        cy.get('input#hoehe').type('2000')
        cy.get('input#breite').type('1200')

        // select Schienenfarbe
        cy.get('#weiss').check({ force: true })

        // input quantity and add to cart
        cy.get('#qty').clear().type('1')
        cy.get('.add_to_cart_button').click()
    }
}