let scrollToBottom = require("scroll-to-bottomjs");

describe('Integration test with visual testing - configurator Sonderformen - Fünfecke', function () {

    it('load configurator Sonderformen - Fünfecke with Pearl-Light-4555', function () {

        //load PDP page
        cy.visit('/pearl-light-4555');
        //load js files
        cy.wait('@configurator-js-files')
        //scroll to bottom with npm package to be sure that alls ressources are loaded
        cy.window().then(cyWindow => scrollToBottom({ remoteWindow: cyWindow }));
        //check if main image is visible
        cy.get('#image').should('be.visible')
        //check if all gallery pictures are visible yet
        cy.get('.small_gallery > ul li')
            .should('have.length', 12)
            .each(($li) => { // iterate through each 'li'
                cy.wrap($li).children().each(($img) => { // iterate through each child of li --> img
                    cy.wrap($img).should('be.visible')
                })
            })

        // check if FreshChat icon is loaded
        cy.checkFreshChat()

        //Auswahl Tab Sonderformen
        cy.contains('Sonderformen').click()
        cy.percySnapshot('Startseite: Sonderformen Pearl-Light-4555')


        //*********************************************************************************
        //*********************************************************************************
        //************ capture all 'Eigenschaften' of the loaded plissee-cloth ************

        //Stoffeinegnschaften
        var attributes = [
            "\"Blickdicht & Lichtdurchlässig\"",
            "\"Weiße Perlexbeschichtung\"",
            "\"Geeignet für Bildschirmarbeitsplätze\"",
            "\"Öko-Tex Standard 100 zertifiziert (schadstoffgeprüft)\"",
            "\"Geeignet für Feuchträume\"",
            "\"1-2 Tage Maßanfertigung\"",
            "\"Hergestellt in Deutschland\""
        ]

        for (var i = 0; i < attributes.length; i++) {
            cy.get('img[title=' + attributes[i] + ']').trigger('mouseover')
            cy.percySnapshot('Eigenschaft Pearl-Light-4555: ' + attributes[i]);
        }

        //*********************************************************************************
        //*********************************************************************************
        //----------------check form FÜNFECK with all available products----------------\\

        cy.get('#pentagon').click({ force: true })
        cy.percySnapshot('Fensterform: Fünfecke')

        // select VS5
        cy.get('#vs5').click({ force: true }).wait(500)  //interception '@prices' or workaround cy.clearPopup() do not work
        cy.percySnapshot('Sonderformen Fünfecke - Auswahl und Infobox: VS5')

        // select VSSD
        cy.get('#vs5sd').click({ force: true }).wait(500)  //interception '@prices' or workaround cy.clearPopup() do not work
        cy.percySnapshot('Sonderformen Fünfecke - Auswahl und Infobox: VS5 SD')


        // *********************************** BEFESTIGUNGEN - AUSWAHL & INFOBOXES ***********************************

        cy.get('h3').contains('Befestigungstyp').click()  //the only way to make the last vs5sd-popup disappear

        //Befestigungen
        var befestigungen = [
            "#direkt_vor_der_scheibe",
            "#klemmtraeger",
            "#am_fensterfluegel"
        ]

        //select available befestigungen and make snapshots
        for (var i = 0; i < befestigungen.length; i++) {

            // cy.get(befestigungen[i]).click({ force: true }).wait(500)  //interception '@prices' or workaround cy.clearPopup() do not work
            // cy.percySnapshot('Sonderformen Dreiecke - Auswahl und Infobox: ' + befestigungen[i])

            cy.get('input' + befestigungen[i]).check({ force: true })
            cy.percySnapshot('Sonderformen Fünfecke Befestigung: ' + befestigungen[i])
            //capture info popup
            cy.get(befestigungen[i]).siblings('.tooltip_icon').realHover()
            cy.percySnapshot('Sonderformen Fünfecke Befestigung- Infobox: ' + befestigungen[i])

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
            cy.percySnapshot('Sonderformen Fünfecke: Schienenfarbe ' + schienenfarben[i])
            //capture info popup
            cy.get(schienenfarben[i]).siblings('.tooltip_icon').realHover()
            cy.percySnapshot('Sonderformen Fünfecke - Infobox: Schienenfarbe ' + schienenfarben[i])

            cy.clearPopup()
        }

        // *********************************** BEDIENGRIFFE - AUSWAHL & INFOBOXES ***********************************

        //Standard preselected
        cy.percySnapshot('Sonderformen Fünfecke: Bediengriff Standard')
        //capture info popup
        cy.get('#standard').siblings('.tooltip_icon').realHover()
        cy.percySnapshot('Sonderformen Fünfecke - Infobox: Bediengriffe Standard')

        cy.clearPopup()

        //select Design
        cy.get('#design').check({ force: true })
        cy.percySnapshot('Sonderformen Fünfecke: Bediengriff Design')
        //capture info popup
        cy.get('#design').siblings('.tooltip_icon').realHover()
        cy.percySnapshot('Sonderformen Fünfecke - Infobox: Bediengriffe Design')

        // workaorund in order to close the last tooltip
        cy.contains('Mehr erfahren').realHover().wait(500)

        // *********************************** BEDIENSTAB-SELECT-FELD & INFOBOX ***********************************

        cy.get('#bedienstab_select').openSelect() //custom command in commands.js
        cy.percySnapshot('Sonderformen Fünfecke: Bedienstäbe')
        cy.get('#bedienstab_select').closeSelect();   //custom command in commands.js
        //capture info popup
        cy.contains('Optionaler Bedienstab für besonders hohe Fenster').siblings('.tooltip_icon').realHover()
        cy.percySnapshot('Sonderformen Fünfecke - Infobox: Bedienstab')

    })
})