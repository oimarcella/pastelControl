# PastelControl - Controle de pedidos

### Por que?
Projeto criado para atender a uma necessidade de uma igreja durante alguns eventos que ocorrem durante o ano. 
A igreja faz evento com vários quiosques para alimentação, e um deles é um quiosque de pastel, o fluxo de pedidos é grande, e tem pelo menos 3 pessoas trabalhando na preparação e entrega dos pedidos para as pessoas. Por vezes, isso acabava ficando confuso, pois cada pessoa trabalhando tinha que lembrar de tudo o que foi pedido, e se certificar de estar entregando para a pessoa certa.


### Implementação da pipeline

Oque foi usado:
- GitHub Actions
- Secrets do GitHub
- Vercel


Configuração do CI

- Vai ser disparado para realizar deploy somente quando um push for feito para a main

- Tem 2 etapas a serem concluídas, a de testes e a de deploy.
A etapa de deploy depende da etapa de testes ter sido concluída e ter tido sucesso.

Etapa 1 - Atualmente, tem 2 versões do Node definidas para quais os testes serão executados.
Antes tinha uma outra abaixo da versão 20, porém depois de ter implementado os testes unitários, a biblioteca não teve boa compatibilidade com a versão, então foi removida para evitar bugs.
Nessa etapa também é feito o clone do repositório, e a instalação das versões de Node.
Finalmente são instaladas as dependências do projeto e rodados os testes para todas as versões listadas.

Etapa 2 - Declara que depende da etapa 1 e de seu sucesso, define o ambiente de execução e dispara o deploy, somente uma vez, usando uma variável, que pode ser configurada nos secrets do GitHub.

