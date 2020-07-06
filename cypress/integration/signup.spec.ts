describe('signup unit testing', function(){
    it('you must navigate to the record and require all fields', function(){
        cy.visit('localhost:3000/signup')

        cy.get('button').as('submit')
        cy.get('@submit').click()

        cy.get('div').contains('¡Porfavor, ingresa tu correo electronico!')
        cy.get('div').contains('¡Porfavor, ingresa tu nombre!')
        cy.get('div').contains('¡Porfavor, ingresa tu contraseña!')
        cy.get('div').contains('Confirma tu contraseña')
    })

    it('you must navigate to the registry and require the type of email', function(){
        cy.visit('localhost:3000/signup')

        cy.get('input[name="email"]').as('emailInput')

        cy.get('@emailInput').type('exa.email.com')

        cy.get('div').contains('No es un correo valido')
    })

    it('you must navigate to the registry and validate the name', function(){
        cy.visit('localhost:3000/signup')

        cy.get('input[name="name"]').as('nameInput')

        cy.get('@nameInput').type('a')
        cy.get('div').contains('El nombre debe tener minimo 2 caracteres')

        cy.get('@nameInput').type('nombre super largo ejemplo')
        cy.get('div').contains('El nombre debe tener maximo 20 caracteres')

    })

    it('you must navigate to the registry and validate the password', function(){
        cy.visit('localhost:3000/signup')

        cy.get('input[name="password"]').as('passwordInput')

        cy.get('@passwordInput').type('contraseña')
        cy.get('div').contains('La contraseña debe tener minimo 2 mayusculas')
        cy.get('div').contains('La contraseña debe tener minimo 3 numeros')

        cy.get('@passwordInput').clear()
        cy.get('@passwordInput').type('COntraseña')
        cy.get('div').contains('La contraseña debe tener minimo 3 numeros')

        cy.get('@passwordInput').clear()
        cy.get('@passwordInput').type('contraseña123')
        cy.get('div').contains('La contraseña debe tener minimo 2 mayusculas')
    })

    it('you must navigate to the registry and show error by same email', function(){
        cy.visit('localhost:3000/signup')

        cy.get('input[name="email"]').as('emailInput')
        cy.get('input[name="name"]').as('nameInput')
        cy.get('input[name="password"]').as('passwordInput')
        cy.get('input[name="confirm-password"]').as('confirmPasswordInput')
        cy.get('button').as('submit')

        cy.get('@emailInput').type('client@email.com')
        cy.get('@nameInput').type('Nombre Ejemplo')
        cy.get('@passwordInput').type('PASS987')
        cy.get('@confirmPasswordInput').type('PASS987')

        cy.get('@submit').click()

        cy.get('.alert').as('message')
        cy.get('@message').should('have.text', 'Email already registered')

    })

    it('you must navigate to the registry and be successful', function(){
        cy.visit('localhost:3000/signup')

        cy.get('input[name="email"]').as('emailInput')
        cy.get('input[name="name"]').as('nameInput')
        cy.get('input[name="password"]').as('passwordInput')
        cy.get('input[name="confirm-password"]').as('confirmPasswordInput')
        cy.get('button').as('submit')

        cy.get('@emailInput').type('fabianclaros@gmail.com')
        cy.get('@nameInput').type('Fabian Claros')
        cy.get('@passwordInput').type('PASS987')
        cy.get('@confirmPasswordInput').type('PASS987')

        cy.get('@submit').click().should(() => {
            expect(localStorage.getItem('token')).exist
        })

        cy.url().should('eq', 'http://localhost:3000/')
    })
})