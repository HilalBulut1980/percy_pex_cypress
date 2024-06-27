let scrollToBottom = require("scroll-to-bottomjs");

describe('Integration test with visual testing - configurator Sonderformen - Sechsecke', function () {

    it('load configurator Sonderformen - Sechsecke with Perlissimo-5125', function () {

        //load PDP page
        cy.visit('/perlissimo-5125');
        //load js files
        cy.wait('@configurator-js-files')
        //scroll to bottom with npm package to be sure that alls ressources are loaded
        cy.window().then(cyWindow => scrollToBottom({ remoteWindow: cyWindow }));
        //check if main image is visible
        cy.get('#image').should('be.visible')
        //check if all gallery pictures are visible yet
        cy.get('.small_gallery > ul li')
            .should('have.length', 11)
            .each(($li) => { // iterate through each 'li'
                cy.wrap($li).children().each(($img) => { // iterate through each child of li --> img
                    cy.wrap($img).should('be.visible')
                })
            })

        // check if FreshChat icon is loaded
        cy.checkFreshChat()

        //Auswahl Tab Sonderformen
        cy.contains('Sonderformen').click()
        cy.percySnapshot('Startseite: Sonderformen Perlissimo-5125')


        //*********************************************************************************
        //*********************************************************************************
        //************ capture all 'Eigenschaften' of the loaded plissee-cloth ************

        //Stoffeinegnschaften
        var attributes = [
            "\"Blickdicht & Lichtdurchlässig\"",
            "\"Perlex Beschichtung\"",
            "\"Geeignet für Feuchträume\"",
            "\"1-2 Tage Maßanfertigung\"",
            "\"Hergestellt in Deutschland\""
        ]

        for (var i = 0; i < attributes.length; i++) {
            cy.get('img[title=' + attributes[i] + ']').trigger('mouseover')
            cy.percySnapshot('Eigenschaft Perlissimo-5125: ' + attributes[i]);
        }

        //*********************************************************************************
        //*********************************************************************************
        //----------------check form Sechsecke with all available products----------------\\

        cy.get('#hexagon').click({ force: true })
        cy.percySnapshot('Fensterform: Sechsecke')

        // select VS6        
        cy.get('#vs6').click({ force: true }).wait(500)  //interception '@prices' or workaround cy.clearPopup() do not work
        cy.percySnapshot('Sonderformen Sechsecke - Auswahl und Infobox: VS6')

        // select VSSD
        cy.get('#vs6sd').click({ force: true }).wait(500)  //interception '@prices' or workaround cy.clearPopup() do not work
        cy.percySnapshot('Sonderformen Sechsecke - Auswahl und Infobox: VS6SD')


        // *********************************** BEFESTIGUNGEN - AUSWAHL & INFOBOXES ***********************************

        cy.get('h3').contains('Befestigungstyp').click()  //the only way to make the last VS6d-popup disappear

        //Befestigungen
        var befestigungen = [
            "#direkt_vor_der_scheibe",
            "#klemmtraeger",
            "#am_fensterfluegel"
        ]

        //select available befestigungen and make snapshots
        for (var i = 0; i < befestigungen.length; i++) {

            cy.get('input' + befestigungen[i]).check({ force: true })
            cy.percySnapshot('Sonderformen Sechsecke Befestigung: ' + befestigungen[i])
            //capture info popup
            cy.get(befestigungen[i]).siblings('.tooltip_icon').realHover()
            cy.percySnapshot('Sonderformen Sechsecke Befestigung- Infobox: ' + befestigungen[i])

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
            cy.percySnapshot('Sonderformen Sechsecke: Schienenfarbe ' + schienenfarben[i])
            //capture info popup
            cy.get(schienenfarben[i]).siblings('.tooltip_icon').realHover()
            cy.percySnapshot('Sonderformen Sechsecke - Infobox: Schienenfarbe ' + schienenfarben[i])

            cy.clearPopup()
        }


        // *********************************** BEDIENGRIFFE - AUSWAHL & INFOBOXES ***********************************

        //Standard preselected
        cy.percySnapshot('Sonderformen Sechsecke: Bediengriff Standard')
        //capture info popup
        cy.get('#standard').siblings('.tooltip_icon').realHover()
        cy.percySnapshot('Sonderformen Sechsecke - Infobox: Bediengriffe Standard')

        cy.clearPopup()

        //select Design
        cy.get('#design').check({ force: true })
        cy.percySnapshot('Sonderformen Sechsecke: Bediengriff Design')
        //capture info popup
        cy.get('#design').siblings('.tooltip_icon').realHover()
        cy.percySnapshot('Sonderformen Sechsecke - Infobox: Bediengriffe Design')

        // workaorund in order to close the last tooltip
        cy.contains('Mehr erfahren').realHover().wait(500)

        // *********************************** BEDIENSTAB-SELECT-FELD & INFOBOX ***********************************

        cy.get('#bedienstab_select').openSelect() //custom command in commands.js
        cy.percySnapshot('Sonderformen Sechsecke: Bedienstäbe')
        cy.get('#bedienstab_select').closeSelect();   //custom command in commands.js
        //capture info popup
        cy.contains('Optionaler Bedienstab für besonders hohe Fenster').siblings('.tooltip_icon').realHover()
        cy.percySnapshot('Sonderformen Sechsecke - Infobox: Bedienstab')

    })
})