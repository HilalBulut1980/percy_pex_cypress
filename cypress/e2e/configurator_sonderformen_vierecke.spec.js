let scrollToBottom = require("scroll-to-bottomjs");

describe('Integration test with visual testing - configurator Sonderformen - Vierecke', function () {

    it('load configurator Sonderformen - Vierecke with Cremona-1093', function () {

        //load PDP page
        cy.visit('/cremona-1093');
        //load js files
        cy.wait('@configurator-js-files')
        //scroll to bottom with npm package to be sure that alls ressources are loaded
        cy.window().then(cyWindow => scrollToBottom({ remoteWindow: cyWindow }));
        //check if main image is visible
        cy.get('#image').should('be.visible')
        //check if all gallery pictures are visible yet
        cy.get('.small_gallery > ul li')
            .should('have.length', 8)
            .each(($li) => { // iterate through each 'li'
                cy.wrap($li).children().each(($img) => { // iterate through each child of li --> img
                    cy.wrap($img).should('be.visible')
                })
            })

        // check if FreshChat icon is loaded
        cy.checkFreshChat()

        //Auswahl Tab Sonderformen
        cy.contains('Sonderformen').click()
        cy.percySnapshot('Startseite: Sonderformen - mit Cremona 1093')


        //*********************************************************************************
        //*********************************************************************************
        //************ capture all 'Eigenschaften' of the loaded plissee-cloth ************

        //Stoffeinegnschaften
        var attributes = [
            "\"Abdunkelnd\"",
            "\"Geeignet für Bildschirmarbeitsplätze\"",
            "\"Schutz vor elektromagnetischer Strahlung\"",
            "\"Plissee mit weißer Rückseite\"",
            "\"Öko-Tex Standard 100 zertifiziert (schadstoffgeprüft)\"",
            "\"1-2 Tage Maßanfertigung\"",
            "\"Hergestellt in Deutschland\""
        ]

        for (var i = 0; i < attributes.length; i++) {
            cy.get('img[title=' + attributes[i] + ']').trigger('mouseover')
            cy.percySnapshot('Eigenschaft Cremona-1093: ' + attributes[i]);
        }


        //*********************************************************************************
        //*********************************************************************************
        //-----------------check form VIERECK with all available products-----------------\\

        cy.get('#rectangle').click({ force: true })
        cy.percySnapshot('Fensterform: Vierecke')

        //Plisseetypen
        var types = [
            "#f1",
            "#f3",
            "#f5",
            "#fk",
            "#fs1",
            "#fs2",
            "#vs2sc",
            "#vs3",
            "#vssd",
            "#vs4s1",
            "#vs4s2",
            "#vs7",
            "#vs8"
        ]

        //select plissee types and make snapshot
        for (var i = 0; i < types.length; i++) {
            cy.get(types[i]).click({ force: true }).wait(500)  //interception '@prices' or workaround cy.clearPopup() do not work
            cy.percySnapshot('Sonderformen Vierecke - Auswahl und Infobox: ' + types[i])
        }


        // *********************************** BEFESTIGUNGEN - AUSWAHL & INFOBOXES ***********************************

        // select f1 to make all befestigungen visible
        cy.get('#f1').click({ force: true }).wait(500)

        cy.get('h3').contains('Befestigungstyp').click()  //the only way to make the last f1-popup disappear

        //Befestigungen
        var befestigungen = [
            "#direkt_vor_der_scheibe",
            "#klemmtraeger",
            "#am_fensterfluegel",
            "#am_mauerwerk"
        ]

        //select available befestigungen and make snapshots
        for (var i = 0; i < befestigungen.length; i++) {

            cy.get('input' + befestigungen[i]).check({ force: true })
            cy.percySnapshot('Sonderformen Vierecke Befestigung: ' + befestigungen[i])
            //capture info popup
            cy.get(befestigungen[i]).siblings('.tooltip_icon').realHover()
            cy.percySnapshot('Sonderformen Vierecke Befestigung- Infobox: ' + befestigungen[i])

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
            cy.percySnapshot('Sonderformen Vierecke: Schienenfarbe ' + schienenfarben[i])
            //capture info popup
            cy.get(schienenfarben[i]).siblings('.tooltip_icon').realHover()
            cy.percySnapshot('Sonderformen Vierecke - Infobox: Schienenfarbe ' + schienenfarben[i])

            cy.clearPopup()
        }


        //*********************************** BEDIENSEITE UND PENDELSICHERUNG ***********************************

        //select Bedienseite rechts
        cy.get('#rechts').check({ force: true }).wait(500)
        cy.percySnapshot('Sonderformen Vierecke: Bedienseite rechts')

        //select Bedienseite links
        cy.get('#links').check({ force: true })
        cy.percySnapshot('Sonderformen Vierecke: Bedienseite links')

        //capture info popup Bedienseite
        cy.contains(new RegExp("^" + 'Bedienseite' + "\\s*$")).next('.tooltip_icon').realHover()
        cy.percySnapshot('Sonderformen Vierecke - Infobox: Bedienseite')

        cy.clearPopup()

        //capture info popup Pendelsicherung
        cy.contains(new RegExp("^" + 'Pendelsicherung' + "\\s*$")).next('.tooltip_icon').realHover()
        cy.percySnapshot('Sonderformen Vierecke - Infobox: Pendelsicherung')

        cy.clearPopup()
    })
})