var data =
{
    "login": "guest",
    "prefix": "Frau",
    "first_name": "Maria",
    "last_name": "Magdalena",
    "email": "maria@delphinus-test.de",
    "street": "Karlsplatz 40",
    "postal_code": "1040",
    "city": "Wien",
    "state": "Österreich",
    "phone": "222219",
    "shipping": "new",
    "prefix2": "Herr",
    "first_name2": "Mirco",
    "last_name2": "Yanar",
    "street2": "104 Bdin Str., Büro 12",
    "postal_code2": "1234",
    "city2": "Sofia",
    "state2": "Bulgarien",
    "phone2": "225588",
    "payment": "bankpayment"
}

module.exports = {

    checkout: function checkout() {

        // check if FreshChat icon is loaded
        cy.checkFreshChat()
        // take snapshot of cart
        cy.percySnapshot('Alle Produkte im Warenkorb')

        // proceed to checkout 
        cy.contains('zur Kasse gehen').click()
        // check if checkout is loaded
        cy.url().should('contain', '/checkout/onepage')

        // select customer type
        cy.intercept('POST', '/checkout/onepage/saveMethod').as('saveMethod')
        cy.contains('Als Gast zur Kasse gehen').click()
        cy.contains('Fortsetzen').click().wait('@saveMethod')

        //--------------------------- RECHNUNGSINFORMATION ------------------------------
        //-------------------------------------------------------------------------------

        // set billing address information & and take snapshot
        setBillingData(data.prefix, data.first_name, data.last_name, data.email, data.street, data.postal_code, data.city, data.phone, data.state)
        // check if FreshChat icon is loaded
        cy.checkFreshChat()
        cy.percySnapshot('checkout: Rechnungsinformation')

        // select 'An andere Adresse verschicken' and go on
        cy.intercept('POST', '/checkout/onepage/saveBilling').as('saveBilling')
        cy.get('input[title="An andere Adresse verschicken"]').check({ force: true })
        cy.get('#billing-buttons-container > button[title="Weiter"]').click().wait('@saveBilling')


        //---------------------------- VERSANDINFORMATION -------------------------------
        //-------------------------------------------------------------------------------

        // set shipping address information  & and take snapshot
        setShippingData(data.prefix2, data.first_name2, data.last_name2, data.street2, data.postal_code2, data.city2, data.phone2, data.state2)
        // check if FreshChat icon is loaded
        cy.checkFreshChat()
        cy.percySnapshot('checkout: Versandinformation')

        // click 'Weiter'
        cy.intercept('POST', '/checkout/onepage/saveShipping').as('saveShipping')
        cy.get('#shipping-buttons-container button').click().wait('@saveShipping')


        //--------------------------------- VERSANDART ----------------------------------
        //-------------------------------------------------------------------------------

        // check if FreshChat icon is loaded
        cy.checkFreshChat()
        // take snapshot of checkout: Versandart
        cy.percySnapshot('checkout: Versandart')

        // Click "Fortsetzen"
        cy.intercept('POST', '/checkout/onepage/saveShippingMethod').as('saveShippingMethod')
        cy.get('#shipping-method-buttons-container button').click().wait('@saveShippingMethod')


        //--------------------------- ZAHLUNGSINFORMATION -------------------------------
        //-------------------------------------------------------------------------------

        // check if FreshChat icon is loaded
        cy.checkFreshChat()
        // take snapshot of checkout: Zahlungsinformation
        cy.percySnapshot('checkout: Zahlungsinformation')

        //Click "Weiter"
        cy.intercept('POST', '/checkout/onepage/savePayment').as('savePayment')
        cy.get('#payment-buttons-container button').should('exist').and('be.visible').click().wait('@savePayment')


        //----------------------------- BESTELLÜBERSICHT --------------------------------
        //-------------------------------------------------------------------------------

        // check if FreshChat icon is loaded
        cy.checkFreshChat()

        //take snapshot of checkout: Bestellübersicht
        cy.percySnapshot('checkout: Bestellübersicht')
    },


    //----------------------------- WARENKORB LEEREN --------------------------------
    //-------------------------------------------------------------------------------

    emptyCart: function emptyCart() {

        // click cart icon and delete articles  + take snapshots before and after
        cy.get('.cart_block').click()
        // check if FreshChat icon is loaded
        cy.checkFreshChat()
        cy.percySnapshot('Warenkorb leeren')
        deleteProducts()
        // check if FreshChat icon is loaded
        cy.checkFreshChat()
        cy.percySnapshot('Warenkorb geleert')

    }
}

function setBillingData(prefix, firstName, lastName, email, street, postalCode, city, phone, state) {

    cy.get('[id="billing:prefix"]').select(prefix)
    cy.get('[id="billing:firstname"]').type(firstName)
    cy.get('[id="billing:lastname"]').type(lastName)
    cy.get('[id="billing:email"]').type(email)
    cy.get('[id="billing:street1"]').type(street)
    cy.get('[id="billing:postcode"]').type(postalCode)
    cy.get('[id="billing:city"]').type(city)
    cy.get('[id="billing:telephone"]').type(phone)
    cy.get('[id="billing:country_id"]').select(state)
}

function setShippingData(prefix, firstName, lastName, street, postalCode, city, phone, state) {

    cy.get('[id="shipping:prefix"]').select(prefix)
    cy.get('[id="shipping:firstname"]').type(firstName)
    cy.get('[id="shipping:lastname"]').type(lastName)
    cy.get('[id="shipping:street1"]').type(street)
    cy.get('[id="shipping:postcode"]').type(postalCode)
    cy.get('[id="shipping:city"]').type(city)
    cy.get('[id="shipping:telephone"]').type(phone)
    cy.get('[id="shipping:country_id"]').select(state)
}

function deleteProducts() {
    //delete articles from cart (recursively)
    const deleteArticle = () => {
        cy.get('body').then($body => {
            const isVisible = $body.find('.btn-remove2').is(':visible')
            if (isVisible) {
                cy.contains('Artikel entfernen').click()
                deleteArticle()
            }
        })
    }
    deleteArticle()
}