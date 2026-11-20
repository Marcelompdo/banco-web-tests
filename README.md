# Testes automatizados do banco-web

Projeto de testes end-to-end (WEB) para validar os principais fluxos da aplicação [banco-web](https://github.com/juliodelimas/banco-web). Os testes são escritos em JavaScript e executados com Cypress, usando Custom Commands para reutilizar ações e cypress-mochawesome-reporter para gerar relatórios.

## Pré-requisitos

- Node.js e npm instalados.
- Os projetos [banco-api](https://github.com/juliodelimas/banco-api) e [banco-web](https://github.com/juliodelimas/banco-web) clonados, configurados e em execução.
- A aplicação WEB acessível em `http://localhost:4000/`, endereço definido como `baseUrl` em `cypress.config.js`.

Antes de executar os testes, inicie a API e a aplicação conforme as instruções de cada repositório. Os testes dependem de ambos estarem disponíveis.

## Instalação

Na raiz deste projeto, instale as dependências listadas em `package.json`:

```bash
npm install
```

## Execução

Com a API e a aplicação em execução, use um dos comandos:

| Comando | Descrição |
| --- | --- |
| `npm test` | Executa os testes em modo headless (`cypress run`). |
| `npm run cy:headed` | Executa os testes com o navegador visível. |
| `npm run cy:open` | Abre a interface do Cypress para selecionar e executar os testes. |

O comando `cy:open` também pode ser usado para executar os specs individualmente durante o desenvolvimento.

## Estrutura do projeto

```text
cypress/
├── e2e/                  # Specs dos fluxos de login e transferência
├── fixtures/             # Dados usados pelos testes, incluindo credenciais
└── support/
    ├── commands/         # Implementações dos Custom Commands
    ├── commands.js       # Importa os comandos personalizados
    └── e2e.js            # Carrega comandos e registro do reporter
cypress.config.js         # Configuração do Cypress, baseUrl e reporter
package.json              # Dependências e scripts npm
package-lock.json         # Versões instaladas das dependências
```

### Testes automatizados

Os testes ficam em `cypress/e2e`:

- **`login.cy.js` — Login**
  - Login com credenciais válidas e verificação de acesso à tela de transferência.
  - Login com credenciais inválidas e verificação da mensagem de erro.
  - Os dois cenários salvam uma captura de tela como evidência.
- **`tranferencia.cy.js` — Transferências**
  - Transferência com dados válidos e verificação da mensagem de sucesso.
  - Transferência acima de R$ 5.000,00 e verificação da mensagem de autenticação necessária.

Os dados de autenticação usados nos cenários estão em `cypress/fixtures/credenciais.json`.

### Custom Commands

Os comandos são definidos em `cypress/support/commands/` e importados por `cypress/support/commands.js`:

| Comando | Finalidade |
| --- | --- |
| `cy.fazerLoginValido()` | Preenche o formulário com as credenciais válidas do fixture e envia o login. |
| `cy.fazerLoginComCredenciaisInvalidas()` | Preenche o formulário com as credenciais inválidas do fixture e envia o login. |
| `cy.verificarMensagemToast(mensagem)` | Verifica se o toast exibido contém exatamente a mensagem informada. |
| `cy.selecionarOpcaoSelect(descricaoLabel, descricaoItem)` | Seleciona uma opção em um campo da aplicação identificado pelo label e pelo texto da opção. |
| `cy.realizarTransferencia(contaOrigem, contaDestino, valor)` | Seleciona as contas de origem e destino, informa o valor e envia a transferência. |

## Relatórios e evidências

O reporter `cypress-mochawesome-reporter` está configurado em `cypress.config.js` e registrado em `cypress/support/e2e.js`. Após a execução, o relatório HTML fica em `cypress/reports/html/index.html`. Os arquivos de relatório e as capturas de tela são gerados localmente e estão ignorados pelo Git.
