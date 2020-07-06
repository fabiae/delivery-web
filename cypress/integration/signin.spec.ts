describe('signin unit test', function(){
    it('you must navigate to login and require email and password', function(){
        cy.visit('localhost:3000/signin')

        cy.get('button').as('submit')
        cy.get('@submit').click()

        cy.get('div').contains('¡Porfavor, ingresa tu correo electronico!')
        cy.get('div').contains('¡Porfavor, ingresa tu contraseña!')
    })

    it('you must navigate to the login and require the correct type of email', function(){
        cy.visit('localhost:3000/signin')

        cy.get('input[name="email"]').as('emailInput')
        cy.get('@emailInput').type('exemail.com')

        cy.get('div').contains('No es un correo valido')
    })

    it('you must navigate to the login and the user does not exist', function(){
        cy.visit('localhost:3000/signin')

        cy.get('input[name="email"]').as('emailInput')
        cy.get('input[name="password"]').as('passwordInput')
        cy.get('button').as('submit')

        cy.get('@emailInput').type('example@email.com')
        cy.get('@passwordInput').type('example99')
        cy.get('@submit').click()

        cy.get('.alert').as('message')

        cy.get('@message').should('have.text', 'The user entered is not registered')
    })

    it('you must navigate to the login and the password is incorrect', function(){
        cy.visit('localhost:3000/signin')

        cy.get('input[name="email"]').as('emailInput')
        cy.get('input[name="password"]').as('passwordInput')
        cy.get('button').as('submit')

        cy.get('@emailInput').type('client@email.com')
        cy.get('@passwordInput').type('example99')
        cy.get('@submit').click()

        cy.get('.alert').as('message')

        cy.get('@message').should('have.text', 'Invalidate password')
    })

    it('must navigate to login and be successful', function(){
        cy.visit('localhost:3000/signin')

        cy.get('input[name="email"]').as('emailInput')
        cy.get('input[name="password"]').as('passwordInput')
        cy.get('button').as('submit')

        cy.get('@emailInput').type('client@email.com')
        cy.get('@passwordInput').type('CLIENT123')
        cy.get('@submit').click().should(() => {
            expect(localStorage.getItem('token')).exist
        })

        cy.url().should('eq', 'http://localhost:3000/')
    })
})