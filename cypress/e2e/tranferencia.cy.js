describe('Transferencias', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.fazerLoginValido()
    })

    it('Deve transferir quando informo dados validos', () => {
        cy.realizarTransferencia('João da Silva', 'Maria Oliveira', '11')

        cy.verificarMensagemToast('Transferência realizada!')
    })

    it('Deve validar mensagem do token obrigatório em transferencias maiores que 5 mil', () => {
        cy.realizarTransferencia('João da Silva', 'Maria Oliveira', '5000.01')

        cy.verificarMensagemToast('Autenticação necessária para transferências acima de R$5.000,00.')
    })
})