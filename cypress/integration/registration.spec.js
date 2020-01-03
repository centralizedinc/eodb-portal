describe('Registration Testing', ()=> {

    beforeEach(() => {
        cy.fixture("users/user2").as("testuser");
    });

    it('Required Field Validation', function(){
        cy.visit('/')
        cy.contains('Avoid the hassle, apply your business permit here!')
        cy.contains('Create an account').click()        
        cy.get('.ant-btn-primary').click()
        cy.contains('Please input desired username')
        cy.contains('Please input last name')
        cy.contains('Please input email')
        cy.contains('Please input password')
        cy.contains('Please input confirm password')
        cy.get('.ant-modal-footer > .ant-btn-default').click()
    })

    it('Resgister New User', function() {
        cy.visit('/')
        cy.contains('Create an account').click()
        cy.get('[style="margin-left: -2.5px; margin-right: -2.5px;"] > :nth-child(1) > .ant-row > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input')
        .type(this.testuser.fname)
        cy.get(':nth-child(2) > .ant-row > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input')
        .type(this.testuser.lname)
        cy.get(':nth-child(2) > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input')
        .type(this.testuser.email)
        cy.get(':nth-child(3) > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input')
        .type(this.testuser.password)
        cy.get(':nth-child(4) > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input')
        .type(this.testuser.confirm_password)
        cy.get('.ant-btn-primary').click()
        cy.get('.ant-message-notice-content')
        cy.contains('Your information has been sent successfully. Please check your email for verification link to activate your account.')
    })

    it('Resgister Existing User', function() {
        cy.visit('/')
        cy.contains('Create an account').click()
        cy.get('[style="margin-left: -2.5px; margin-right: -2.5px;"] > :nth-child(1) > .ant-row > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input')
        .type(this.testuser.fname)
        cy.get(':nth-child(2) > .ant-row > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input')
        .type(this.testuser.lname)
        cy.get(':nth-child(2) > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input')
        .type(this.testuser.email)
        cy.get(':nth-child(3) > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input')
        .type(this.testuser.password)
        cy.get(':nth-child(4) > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input')
        .type(this.testuser.confirm_password)
        cy.get('.ant-btn-primary').click()
        cy.get('.ant-message-notice-content')
        cy.contains('Email already use.')
    })
})