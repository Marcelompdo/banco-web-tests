Cypress.Commands.add('verificarMensagemToast', mensagem => {
    cy.get('.toast').should('have.text', mensagem)
})

Cypress.Commands.add('selecionarOpcaoSelect', (descricaoLabel, descricaoItem) => {
    cy.get(`label[for=${descricaoLabel}]`).parent().as(`campo-${descricaoLabel}`)
    cy.get(`@campo-${descricaoLabel}`).click()
    cy.get(`@campo-${descricaoLabel}`).contains(descricaoItem).click()
})