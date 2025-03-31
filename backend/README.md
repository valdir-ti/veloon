# Veloon

## Backend - Irmão siameses 2.0

### Função principal

- Receber dois números, verificar se os mesmos são siameses e devolver uma resposta para o usuário

### Tecnologias utilizadas

- NodeJS + TypeScript
- Express para o gerenciamento de rotas
- Postgres como base de dados
- ORM Prisma
- Jest para testes unitários

### Para rodar o projeto localmente com Docker

- Documentação com Swagger no link:

    - `http://localhost:3000/api-docs`

- Url de healthcheck:

    - `http://localhost:3333/health`

- Para rodar os testes acessa a pasta backend e digite no terminal o comando:

    - `npm run test`

### Rotas do sistema

- #### Rotas abertas

    - Healthcheck
        - Para verificar se o app está rodando
            - `http://localhost:3333/api/health`
    - Register
        - Para registrar um usuário
            - `http://localhost:3333/api/register`
    - Login
        - Para fazer o login do usuário
            - `http://localhost:3333/api/login`
    - Docs
        - Swagger com as rotas deiponíveis do sistema
            - `http://localhost:3333/api-docs`

- #### Rotas protegidas
    - Irmãos siameses
        - Para testar os números recebidos
            - `http://localhost:3333/api/irmaos-siameses`
    - Histórico
        - Para acessar o histórico de consultas do usuário
            - `http://localhost:3333/api/historico`
    - Deletar Histórico
        - Para deletar um histórico do usuário
            - `http://localhost:3333/api/historico/id`
