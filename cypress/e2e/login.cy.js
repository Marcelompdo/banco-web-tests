describe('Login', () => {
    beforeEach(() => {
        // Arrange
        cy.visit('/')
    })

    it('Login com dados válidos deve permitir entrada no sistema', () => {
        // Act
        cy.fazerLoginValido()

        // Assert
        cy.contains('h4', 'Realizar Transferência').should('be.visible')

        cy.screenshot('evidencia-login-valido')
    })

    it('Login com dados inválidos deve apresentar mensagem de erro', () => {
        cy.fazerLoginComCredenciaisInvalidas()

        cy.verificarMensagemToast('Erro no login. Tente novamente.')
        
        cy.screenshot('evidencia-login-invalido')
    })
})