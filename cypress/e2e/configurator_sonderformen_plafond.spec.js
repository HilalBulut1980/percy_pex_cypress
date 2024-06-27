let scrollToBottom = require("scroll-to-bottomjs");

describe('Integration test with visual testing - configurator Sonderformen - Plafond', function () {

    it('load configurator Sonderformen - Plafond with Perlissimo-4515', function () {

        //load PDP page
        cy.visit('/perlissimo-4515');
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
        cy.percySnapshot('Startseite: Sonderformen Perlissimo-4515')


        //*********************************************************************************
        //*********************************************************************************
        //************ capture all 'Eigenschaften' of the loaded plissee-cloth ************

        //Stoffeinegnschaften
        var attributes = [
            "\"Blickdicht & Lichtdurchlässig\"",
            "\"Perlex Beschichtung\"",
            "\"Geeignet für Bildschirmarbeitsplätze\"",
            "\"Öko-Tex Standard 100 zertifiziert (schadstoffgeprüft)\"",
            "\"Geeignet für Feuchträume\"",
            "\"1-2 Tage Maßanfertigung\"",
            "\"Hergestellt in Deutschland\""
        ]

        for (var i = 0; i < attributes.length; i++) {
            cy.get('img[title=' + attributes[i] + ']').trigger('mouseover')
            cy.percySnapshot('Eigenschaft Perlissimo-4515: ' + attributes[i]);
        }


        //*********************************************************************************
        //*********************************************************************************
        //----------------check form Plafond with all available products----------------\\


        cy.get('#plafond').click({ force: true })
        cy.percySnapshot('Fensterform: Plafond')

        //Plisseetypen erhältlich
        var available_types = [
            "#pl11",
            "#pl40",
            "#plk13"
        ]

        //select plissee types and make snapshot
        for (var i = 0; i < available_types.length; i++) {
            cy.get(available_types[i]).click({ force: true }).wait(500)  //interception '@prices' or workaround cy.clearPopup() do not work
            cy.percySnapshot('Sonderformen Plafond - Auswahl und Infobox: ' + available_types[i])
        }

        //Plisseetypen nicht erhältlich
        var non_available_types = [
            "#pl30",
            "#pl31",
            "#pl32",
            "#pl33",
            "#pl41",
            "#pl42",
            "#ple12",
            "#sdp2",
            "#sdp3"
        ]

        //select plissee types and make snapshot
        for (var i = 0; i < non_available_types.length; i++) {
            cy.get(non_available_types[i]).click({ force: true }).wait(500)  //interception '@prices' or workaround cy.clearPopup() do not work
            cy.percySnapshot('Sonderformen Plafond - Auswahl: ' + non_available_types[i])
        }


        // *********************************** BEFESTIGUNGEN - AUSWAHL & INFOBOXES ***********************************

        // select plk13 to make all befestigungen visible
        cy.get('#plk13').click({ force: true }).wait(500)

        cy.get('h3').contains('Befestigungstyp').click()  //the only way to make the last f1-popup disappear

        //Befestigungen
        var befestigungen = [
            "#clip",
            "#winkel",
            "#montageprofil_mit_winkeln",
            "#montageprofil_haltebolzen"
        ]

        //select available befestigungen and make snapshots
        for (var i = 0; i < befestigungen.length; i++) {

            cy.get('input' + befestigungen[i]).check({ force: true })
            cy.percySnapshot('Sonderformen Plafond Befestigung: ' + befestigungen[i])
            //capture info popup
            cy.get(befestigungen[i]).siblings('.tooltip_icon').realHover()
            cy.percySnapshot('Sonderformen Plafond Befestigung- Infobox: ' + befestigungen[i])

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
            cy.percySnapshot('Sonderformen Plafond: Schienenfarbe ' + schienenfarben[i])
            //capture info popup
            cy.get(schienenfarben[i]).siblings('.tooltip_icon').realHover()
            cy.percySnapshot('Sonderformen Plafond - Infobox: Schienenfarbe ' + schienenfarben[i])

            cy.clearPopup()
        }


        //*********************************** BEDIENSEITE UND PENDELSICHERUNG ***********************************

        //select Bedienseite rechts
        cy.get('#rechts').check({ force: true }).wait(500)
        cy.percySnapshot('Sonderformen Plafond: Bedienseite rechts')

        //select Bedienseite mitte
        cy.get('#mitte').check({ force: true })
        cy.percySnapshot('Sonderformen Plafond: Bedienseite mitte')

        //select Bedienseite links
        cy.get('#links').check({ force: true })
        cy.percySnapshot('Sonderformen Plafond: Bedienseite links')

        //capture info popup Bedienseite
        cy.contains(new RegExp("^" + 'Bedienseite' + "\\s*$")).next('.tooltip_icon').realHover()
        cy.percySnapshot('Sonderformen Plafond - Infobox: Bedienseite')

        cy.clearPopup()

        // *********************************** KURBEL - AUSWAHL & INFOBOXES ***********************************

        //select HANDKURBEL 
        cy.get('#kurbel').check({ force: true })
        cy.percySnapshot('Sonderformen Plafond: Bedienung Kurbel')
        //capture info popup
        cy.get('#kurbel').siblings('.tooltip_icon').realHover()
        cy.percySnapshot('Sonderformen Plafond - Infobox: Bedienung Kurbel')

        cy.clearPopup()

        // SELECT HANDKURBEL
        cy.get('#handkurbel_select').openSelect() //custom command in commands.js
        cy.percySnapshot('Sonderformen Plafond: Handkurbel')
        cy.get('#handkurbel_select').closeSelect();   //custom command in commands.js

        //------------------------------------------------------------------------------------------------------ 

        //select Elektrostab
        cy.get('#elektrostab').check({ force: true })
        cy.percySnapshot('Sonderformen Plafond: Bedienung Elektrostab')
        //capture info popup
        cy.get('#elektrostab').siblings('.tooltip_icon').realHover()
        cy.percySnapshot('Sonderformen Plafond - Infobox: Bedienung Elektrostab')

        cy.clearPopup()

        // SELECT Elektrostab
        cy.get('#elektrostab_select').openSelect() //custom command in commands.js
        cy.percySnapshot('Sonderformen Plafond: Elektrostab')
        cy.get('#elektrostab_select').closeSelect();   //custom command in commands.js
    })
})