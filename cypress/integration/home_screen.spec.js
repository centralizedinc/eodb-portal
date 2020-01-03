describe('HomeScreen Testing', ()=> {

    beforeEach(() => {
        cy.fixture("users/user1").as("testuser");
    });


    it('Access home screen', function(){
        cy.visit('/')
        cy.contains('Avoid the hassle, apply your business permit here!')
        cy.contains('Login using Facebook')
        cy.contains('Login using Google')
        cy.contains('Login using e-mail')
    })

    it('Login using email', function() {
        cy.contains('Login using e-mail').click()
        cy.get(':nth-child(1) > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input-affix-wrapper > .ant-input')
        .type(this.testuser.username)
        cy.get(':nth-child(2) > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input-affix-wrapper > .ant-input')
        .type(this.testuser.password)
        cy.contains('LOGIN').click()
        cy.url().should('include', '/app')
        // cy.getCookie('app-session').should('exist')
    })

    it('Logout', function(){
        cy.get('.anticon-setting > svg').click()
        cy.contains('Logout').click()
        cy.contains('Yes').click()
        cy.url().should('include', '/')
    })

    it('Login using Facebook', function() {
        cy.contains('Login using Facebook').click()
    })

    it('Login using Google', function() {
        cy.contains('Login using Google').click()
    })

})