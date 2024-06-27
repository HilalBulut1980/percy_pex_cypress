let scrollToBottom = require("scroll-to-bottomjs");

describe('Integration test with visual testing - configurator Senkrechte Fenster', function () {

    it('load configurator Senkrechte Fenster with Liviano-4313', function () {

        //load PDP page
        cy.visit('/liviano-4313');
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

        // Senkrechte Fenster preselected
        cy.percySnapshot('Startseite: Senkrechte Fenster mit Liviano 4313')


        //*********************************************************************************
        //*********************************************************************************
        //************ capture all 'Eigenschaften' of the loaded plissee-cloth ************

        //Stoffeinegnschaften
        var attributes = [
            "\"Transparent\"",
            "\"identische Vorder- und Rückseite\"",
            "\"Wasser und Schmutzabweisend\"",
            "\"Öko-Tex Standard 100 zertifiziert (schadstoffgeprüft)\"",
            "\"Geeignet für Feuchträume\"",
            "\"1-2 Tage Maßanfertigung\"",
            "\"Hergestellt in Deutschland\""
        ]

        for (var i = 0; i < attributes.length; i++) {
            cy.get('img[title=' + attributes[i] + ']').trigger('mouseover')
            cy.percySnapshot('Eigenschaft Liviano-4313: ' + attributes[i]);
        }


        //------------------------------------------ Plissee-TYPEN VS1,VS2 & INFOBOXES -------------------------------------------\\
        //****************************************************************************************************************\\

        //VS2 preselected - select vs1
        cy.get('#vs1').click({ force: true })
        cy.percySnapshot('VS1 selected')
        //capture info popup
        cy.get('#vs1').siblings('.tooltip_icon').realHover()
        cy.percySnapshot('Infobox - Senkrechte Fenster: VS1')

        cy.clearPopup()

        //select vs2  
        cy.get('#vs2').click({ force: true })
        cy.percySnapshot('VS2 selected')
        //capture info popup
        cy.get('#vs2').siblings('.tooltip_icon').realHover()
        cy.percySnapshot('Infobox - Senkrechte Fenster: VS2')

        cy.clearPopup()

        // *********************************** BEFESTIGUNGEN - AUSWAHL & INFOBOXES ***********************************

        //Befestigungen
        var befestigungen = [
            "#direkt_vor_der_scheibe",
            "#gelenkklebeplatten",
            "#stick_fix",
            "#stick_fix_front",
            "#klemmtraeger",
            "#klebeleisten",
            "#am_fensterfluegel",
            "#falzfix",
            "#glasleistenwinkel",
            "#klemmtraeger_slim"
        ]

        //select available befestigungen and make snapshots
        for (var i = 0; i < befestigungen.length; i++) {

            // cy.get(befestigungen[i]).click({ force: true }).wait(500)  //interception '@prices' or workaround cy.clearPopup() do not work
            // cy.percySnapshot('Sonderformen Dreiecke - Auswahl und Infobox: ' + befestigungen[i])

            cy.get('input' + befestigungen[i]).check({ force: true })
            cy.percySnapshot('Senkrechte Fenster Befestigung: ' + befestigungen[i])
            //capture info popup
            cy.get(befestigungen[i]).siblings('.tooltip_icon').realHover()
            cy.percySnapshot('Senkrechte Fenster Befestigung- Infobox: ' + befestigungen[i])

            cy.clearPopup()
        }


        // *********************************** SCHIENENFARBEN - AUSWAHL & INFOBOXES ***********************************

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
            cy.percySnapshot('Senkrechte Fenster: Schienenfarbe ' + schienenfarben[i])
            //capture info popup
            cy.get(schienenfarben[i]).siblings('.tooltip_icon').realHover()
            cy.percySnapshot('Senkrechte Fenster - Infobox: Schienenfarbe ' + schienenfarben[i])

            cy.clearPopup()
        }


        // *********************************** BEDIENGRIFFE - AUSWAHL & INFOBOXES ***********************************

        cy.clearPopup()

        //Standard preselected
        cy.percySnapshot('Senkrechte Fenster: Bediengriff Standard')
        //capture info popup
        cy.get('#standard').siblings('.tooltip_icon').realHover()
        cy.percySnapshot('Senkrechte Fenster - Infobox: Bediengriffe Standard')

        cy.clearPopup()

        //select Design
        cy.get('#design').check({ force: true })
        cy.percySnapshot('Senkrechte Fenster: Bediengriff Design')
        //capture info popup
        cy.get('#design').siblings('.tooltip_icon').realHover()
        cy.percySnapshot('Senkrechte Fenster - Infobox: Bediengriffe Design')

        // workaorund in order to close the last tooltip
        cy.contains('Mehr erfahren').realHover().wait(500)

        // *********************************** BEDIENSTAB-SELECT-FELD & INFOBOX ***********************************

        cy.get('#bedienstab_select').openSelect() //custom command in commands.js
        cy.percySnapshot('Senkrechte Fenster: Bedienstäbe')
        cy.get('#bedienstab_select').closeSelect();   //custom command in commands.js
        //capture info popup
        cy.contains('Optionaler Bedienstab für besonders hohe Fenster').siblings('.tooltip_icon').realHover()
        cy.percySnapshot('Senkrechte Fenster - Infobox: Bedienstab')
    });
})