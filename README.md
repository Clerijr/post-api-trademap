Desafio Backend para a empresa [TradeMap](https://www.linkedin.com/company/trademaphub).

# O Desafio (De acordo com a TradeMap)

"Precisamos de uma API que sirva o Back-end de um blog. Essa API precisa ser capaz de:

- [x] Criar um Post
- [x] Editar um Post
- [x] Deletar um Post
- [x] Listar os Posts de maneira paginada, permitindo filtro por data.
    - [x] Paginação
    - [x] Filtro por Data
- [x] Obter informações de um Post por ID.

TODO: 
- Adicionar Swagger

### Ferramentas Utilizadas

- Node
- Typescript
- Express
- MongoDb
- Jest
- Rimraf
- Docker

### Como rodar

1 - Tenha docker engine e docker compose instalados. Caso necessário siga a doc: https://docs.docker.com/

2 - Clone o projeto na sua máquina e entre na pasta:
```bash 
git clone https://github.com/Clerijr/post-api-trademap.git && cd ./post-api-trademap
```
3 - Crie um arquivo .env com a variável MONGO_URL. Você pode utilizar o .env.example presente neste repositório, basta renomear para .env

4 - Uma vez dentro da pasta do projeto rode o comando `docker compose up --build` e estará funcionando na localhost:8080/post

- O projeto usa porta 8080 para API e 27017 para o MongoDB

### Endpoints
- GET /post
 Retorna um array com todos os posts
- GET /post?initial_date=2024-12-22&final_date=2024-12-23&size=5&page=0
 Retorna um array com paginação e/ou filtro de data
- GET /:post_id
 Retorna um objeto post
- POST /post
 Publica um objeto post no seguinte formato, e retorna 201 e o objeto Post caso sucesso: 
 ```json
 {
    "title": "Título",
    "body": "Corpo do post(apenas string)",
    "description": "Descrição(Opcional)",
 }
 ```
- PUT /:post_id
 Altera um post com uuid passado na URI, retorna 200 e o post caso sucesso 
- DELETE /:post_id
 Deleta o Post com mesmo uuid passado na URI diretamente no banco, não usa soft delete 