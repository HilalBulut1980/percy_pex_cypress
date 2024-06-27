let scrollToBottom = require("scroll-to-bottomjs");

describe('Integration test with visual testing - configurator Sonderformen - Dreiecke', function () {

    it('load configurator Sonderformen - Dreiecke with Blackout 4018', function () {

        //load PDP page
        cy.visit('/blackout-4018');
        //load js files
        cy.wait('@configurator-js-files')
        //scroll to bottom with npm package to make sure that alls ressources are loaded
        cy.window().then(cyWindow => scrollToBottom({ remoteWindow: cyWindow }));
        //check if main image is visible
        cy.get('#image').should('be.visible')
        //check if all gallery pictures are visible yet
        cy.get('.small_gallery > ul li')
            .should('have.length', 7)
            .each(($li) => { // iterate through each 'li'
                cy.wrap($li).children().each(($img) => { // iterate through each child of li --> img
                    cy.wrap($img).should('be.visible')
                })
            })

        // check if FreshChat icon is loaded
        cy.checkFreshChat()

        //Auswahl Tab Sonderformen
        cy.contains('Sonderformen').click()
        cy.percySnapshot('Startseite: Sonderformen - mit Blackout 4018')


        //*********************************************************************************
        //*********************************************************************************
        //************ capture all 'Eigenschaften' of the loaded plissee-cloth ************

        //Stoffeinegnschaften
        var attributes = [
            "\"Abdunkelnd\"",
            "\"Geeignet für Bildschirmarbeitsplätze\"",
            "\"Plissee mit weißer Rückseite\"",
            "\"Öko-Tex Standard 100 zertifiziert (schadstoffgeprüft)\"",
            "\"1-2 Tage Maßanfertigung\"",
            "\"Hergestellt in Deutschland\""
        ]

        for (var i = 0; i < attributes.length; i++) {
            cy.get('img[title=' + attributes[i] + ']').trigger('mouseover')
            cy.percySnapshot('Eigenschaft Blackout-4018: ' + attributes[i]);
        }

        //*********************************************************************************
        //*********************************************************************************
        //-----------------check form DREIECK with all available products-----------------\\

        //select Dreiecke
        cy.get('#triangle').click({ force: true })
        cy.percySnapshot('Fensterform: Dreiecke')

        //Plisseetypen
        var types = [
            "#fds3",
            "#fds4",
            "#vs9",
            "#vs10",
            "#sd2",
            "#sd3",
        ]

        //select plissee types and make snapshot
        for (var i = 0; i < types.length; i++) {
            cy.get(types[i]).click({ force: true }).wait(500)  //interception '@prices' or workaround cy.clearPopup() do not work
            cy.percySnapshot('Sonderformen Dreiecke - Auswahl und Infobox: ' + types[i])
        }

        cy.clearPopup()


        // *********************************** BEFESTIGUNGEN - AUSWAHL & INFOBOXES ***********************************

        // select fds to make all befestigungen visible
        cy.get('#fds3').click({ force: true }).wait(500)

        cy.get('h3').contains('Befestigungstyp').click({ force: true })  //the only way to make the last f1-popup disappear

        //Befestigungen
        var befestigungen = [
            "#direkt_vor_der_scheibe",
            "#am_fensterfluegel",
            "#am_mauerwerk"
        ]

        //select available befestigungen and make snapshots
        for (var i = 0; i < befestigungen.length; i++) {

            // cy.get(befestigungen[i]).click({ force: true }).wait(500)  //interception '@prices' or workaround cy.clearPopup() do not work
            // cy.percySnapshot('Sonderformen Dreiecke - Auswahl und Infobox: ' + befestigungen[i])

            cy.get('input' + befestigungen[i]).check({ force: true })
            cy.percySnapshot('Sonderformen Dreiecke Befestigung: ' + befestigungen[i])
            //capture info popup
            cy.get(befestigungen[i]).siblings('.tooltip_icon').realHover()
            cy.percySnapshot('Sonderformen Dreiecke Befestigung- Infobox: ' + befestigungen[i])

            cy.clearPopup()
        }


        //*********************************** SCHIENENFARBEN - AUSWAHL & INFOBOXES ***********************************

        //Schienenfarben
        var schienenfarben = [
            "#weiss",
            "#schwarzbraun",
            "#silber",
            "#bronze",
            "#anthrazit"
        ]

        // select available schienenfarben and make snapshots
        for (var i = 0; i < schienenfarben.length; i++) {
            cy.get(schienenfarben[i]).click({ force: true }).wait(500)  //without this wait(500) does not disappear the last popup of SD3
            cy.percySnapshot('Sonderformen Dreiecke: Schienenfarbe ' + schienenfarben[i])
            //capture info popup
            cy.get(schienenfarben[i]).siblings('.tooltip_icon').realHover()
            cy.percySnapshot('Sonderformen Dreiecke - Infobox: Schienenfarbe ' + schienenfarben[i])

            cy.clearPopup()
        }
    })
})