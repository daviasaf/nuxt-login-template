# Modelo de login com nuxt 

# App
Pasta principal que mostra o front-end
## Assets
Usado para importar o @nuxt/ui e tailwindcss
## Middleware
Middleware dentro da pasta page significa que são middlewares de rota
- Quando chamado, pega a sessão atual do usuário
- Se não estiver logado, recarrega a página e o navega para a página /login
- Esse comportamento de navegar para a página login protege certas páginas que não podem ser acessado sem ter login, como o index.vue
## Pages
- Páginas principais do projeto, páginas dentro dessa pasta são convertidas em rota automaticamente
    - localhost:3000/login
## App.vue
- Página principal, aqui carregamos o layout e o UApp
# Server
## Api
- Usado para colocar os endpoints do nosso projeto
### auth / login.post.ts
- Cria um schema do zod para verificação no backend
- Recebe a requisição do frontend com o readValidateBody que passa pelo schema
- Tenta encontar o primeiro valor no database que bate com a requisição enviada
- Se tudo estiver certo, atualiza a sessão do usuário
- Retorna true para bater no response.success
### auth / register.post.ts
- Cria um schema do zod para verificação no backend
- Recebe a requisição do frontend com o readValidateBody que passa pelo schema
- Faça o hash da senha do usuário
- O mysql não devolve o valor que você enviou para você, então, envie os dados e salve o resultado de inserção 'insertResult', esse insertResult é um array, peguei o id dele e crie um novo usuário com os mesmo dados enviados do body
- Crie uma váriavel e salve esses novos dados após enviar para o database
- Atualize a sessão do usuário com setUserSession
- Retorne sucesso
## database
- Utilizado para configurar algumas informações do banco de dados
### drizzle
- Saida de migrações que faço com drizzle
### schema
- Lugar de declaração de schema que será migrado para o banco de dados
### database.ts
- Lugar de conexão com o banco de dados e envio do schema e algumas funções do database
# auth.d.ts
- estende os tipos TS para os módulos usados no setUserSession
# drizzle.config.ts
- Configuração da biblioteca drizzle
- exporte defineConfig, não irá completar mas funcionará
- dialeto://username:password@host:port/database
# nuxt.config.ts
- Configurações do nuxt
- Configure os cookies