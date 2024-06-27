module.exports = {

    serviceProdukte: function serviceProdukte() {

        // ----------------------- ADD BREITE KÜRZEN TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        //load service page
        cy.visit('/aenderungsauftrag-breite')

        cy.get('label').contains('Bestellnummer').next().type('10001000')
        cy.get('label').contains('Produkt').next().type('Syrakus-2079')
        cy.get('label').contains('Breite lt. Lieferschein').next().type('1000')
        cy.get('label').contains('Höhe lt. Lieferschein').next().type('1000')
        cy.get('label').contains('gewünschte Breite in mm').next().type('900')

        cy.get('#qty').clear().type('1')
        // cy.get('#qty + a[title="In den Warenkorb"]').click()
        cy.contains('In den Warenkorb').click()

        // ----------------------- ADD SCHNUR ERSETZEN TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        //load service page
        cy.visit('/reparaturauftrag-schnur-ersetzen')

        cy.get('label').contains('Bestellnummer').next().type('10002000')
        cy.get('label').contains('Produkt').next().type('Syrakus-2079')
        cy.get('label').contains('Breite lt. Lieferschein').next().type('1000')
        cy.get('label').contains('Höhe lt. Lieferschein').next().type('1000')
        cy.get('label').contains('gewünschte Höhe in mm').next().type('1200')

        cy.get('#qty').clear().type('1')
        // cy.get('#qty + a[title="In den Warenkorb"]').click()
        cy.contains('In den Warenkorb').click()

        // ----------------------- ADD SCHNURLÄNGE ÄNDERN TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        //load service page
        cy.visit('/aenderungsauftrag-schnurlaenge')

        cy.get('label').contains('Bestellnummer').next().type('10003000')
        cy.get('label').contains('Produkt').next().type('Bologna-2028')
        cy.get('label').contains('Breite lt. Lieferschein').next().type('1000')
        cy.get('label').contains('Höhe lt. Lieferschein').next().type('1000')
        cy.get('label').contains('gewünschte Höhe in mm').next().type('1500')

        cy.get('#qty').clear().type('1')
        // cy.get('#qty + a[title="In den Warenkorb"]').click()
        cy.contains('In den Warenkorb').click()


        // ----------------------- ADD ZUSATZAUFTRAG LÄNGERE SCHNÜRE TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        //load service page
        cy.visit('/zusatzauftrag-laengere-fuehrungsschnuere')

        cy.get('label').contains('Produktname').next().type('Peschiera-5027')
        cy.get('label').contains('Schienenfarbe').next().type('silber')
        cy.get('label').contains('Breite (in mm)').next().type('1000')
        cy.get('label').contains('Höhe (in mm)').next().type('1500')
        cy.get('label').contains('Gewünschte Länge der Schnüre (in mm)').next().type('2000')
        cy.get('label').contains('Gewünschte Seite').next().select('links')
        cy.contains('Sonstige Anmerkungen').next().type('Testdaten für das visuelle Testen')

        cy.get('#qty').clear().type('1')
        // cy.get('#qty + a[title="In den Warenkorb"]').click()
        cy.contains('In den Warenkorb').click()
    }
}