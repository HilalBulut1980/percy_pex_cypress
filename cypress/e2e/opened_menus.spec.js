describe('Integration test with visual testing - opened menus', function () {

    // Why does cy.realHover() hovering state not show in the visual regression services?
    // Unfortunately, visual regression services like Happo and Percy do not solve this issue. 
    // Their architecture is based on saving dom snapshot, not the screenshot, 
    // and then rendering the snapshot on their machines. 
    // It means that the hover and focus state will be lost if it won't be serialized manually.


    // cy.get('.menu_level_two.menu_colors').realHover()

    // .realHover() works fine here but Cypress is doing some work in preparation between screenshot/snapshot that will break hover
    // so the hovered state cannot be captured
    // see: https://github.com/dmtrKovalenko/cypress-real-events/issues/80#ref-issue-1327207562
    // and: https://stackoverflow.com/questions/72665494/cant-take-screenshot-of-hovered-element-in-cypress

    // WORKAROUND: set the css 'display: none' to 'display', 'grid' and back again (attributes block, inline, initial etc. does not )
    // This way we can take the screenshot as if the element was actually hovered. 
    // Then  we have to set visibility to hidden again --> 'display', 'none'

    it('take percy snapshot of opened menu: Plissee nach Farben', function () {

        //********************** OPEN MENU PLISSEE NACH FARBEN *********************************

        //open menu 'Plissee nach Farben' and take percy snaphot
        cy.visit('/');

        cy.get('.menu_level_two.menu_colors').then(($menuColors) => {
            $menuColors.css('display', 'grid');
        });
        // cy.screenshot('colors')
        // check if FreshChat icon is loaded
        cy.checkFreshChat()
        cy.percySnapshot('opened menu: Plissee nach Farben')


        cy.get('.menu_level_two.menu_colors').then(($menuColors) => {
            $menuColors.css('display', 'none');
        });
    })

    it('take percy snapshot of opened menu: Plissee für Räume', function () {

        //********************** OPEN MENU PLISSEE FÜR RÄUME *********************************

        //open menu 'Plissee für Räume' and take percy snaphot
        cy.visit('/');

        cy.get('.menu_level_two.menu_rooms').then(($menuRooms) => {
            $menuRooms.css('display', 'grid');
        });
        // cy.screenshot('rooms')
        // check if FreshChat icon is loaded
        cy.checkFreshChat()
        cy.percySnapshot('opened menu: Plissee für Räume')


        cy.get('.menu_level_two.menu_rooms').then(($menuRooms) => {
            $menuRooms.css('display', 'none');
        });
    })
})