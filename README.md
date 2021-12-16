# Backend Fincycle

![Nest.js](https://img.shields.io/badge/nest.js-E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Docker](https://img.shields.io/badge/docker-0db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-000.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Kafka](https://img.shields.io/badge/apache%20kafka-231F20.svg?style=for-the-badge&logo=apachekafka&logoColor=white)

_Este repositório faz parte do projeto [Sistema de pagamentos Fincycle](https://github.com/jvcalassio/fc-payment-system)_

Este serviço é responsável por receber as requisições do frontend, disponibilizando uma API REST e gerenciando todas as contas de usuário e ordens de pagamento.

As ordens de pagamento são sempre geradas com o status pendente, e serão posteriormente processadas pelo [Gateway de Pagamento](https://github.com/jvcalassio/fc-payment-gateway).

## Documentação

A documentação da API está disponível ao executar o serviço, no caminho _/docs_.

Foi gerada utilizando o [Swagger](https://swagger.io/) e o módulo OpenAPI disponibilizado pelo Nest.js, que permite especificar os detalhes de cada endpoint/modelo através de decorators.

## Execução

Para o correto funcionamento do serviço, é necessário que o Apache Kafka esteja devidamente configurado e em execução.

Assim, é recomendável seguir as [instruções do repositório principal](https://github.com/jvcalassio/fc-payment-system#execu%C3%A7%C3%A3o-em-desenvolvimento).

Caso queira executar apenas este serviço, basta clonar o repositório e utilizar o docker compose:

```
docker-compose up -d --build
```

A API estará disponível em http://host.docker.internal:3000/
