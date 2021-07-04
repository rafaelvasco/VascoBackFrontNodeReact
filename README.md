## Vasco Hamburgueria

Design:

Projeto utiliza a biblioteca dinero.js para manipular e formatar valores monetários. Implementar operações financeiras manualmente torna o código mais vulnerável a erros de arredondamento.

Projeto define uma API utilizando  o seguinte padrão de camadas:

Routes: Define as rotas da API. Cada arquivo de definição de rotas define as URLS de cada rota e o método a ser executado do respectivo Controller.

Controllers: Define as lógicas de validação,  e processamento  de Requests e Responses para cada Rota. O processamento lógico em si de cada rota é executado por um Service ou Repository. 

Services: Recebem os objetos de Request dos Controllers , obtem dados da base de dados através dos Repositories e efetuam algum processamento nesses dados.

Repositories: Obtem dados do banco e os transformam para um formato adequado para ser trabalhado pelos Services.

Models: Definem os Tipos/Modelos de Dados da Aplicação. Ou são dados processados apenas internamente. Ou são dados também de intercâmbio com o Frontend.

Middleware: Definem métodos utilitários e intermediários usados nos processamentos pelos Services e Controllers.

Config: Definem configurações globais da aplicação.

Na pasta __tests__ estão presentes os testes que validam a API.

---

Frontend: 

O frontend é dividido de forma simplificada em :

Páginas: Representam um recurso que pode ser acessado via URL.
Componentes: Representam blocos discretos de tela que recebem valores, processam, e efetuam requests para o Backend. Nesse exemplo os requests são realizados diretamente pelos componentes. Em uma aplicação maior, é uma boa ideia encapsular os requests em classes Service/Resource etc, que por sua vez receberiam os requests dos componentes e retornariam os responses em formato adequado.

Uma página nada mais é que um componente acessível via URL.

Nesse exemplo o frontend mostra o menu principal na página inicial index.tsx.

O menu principal é uma lista de componentes ProductCard. Cada ProductCard mostra os dados do produto como foto, nome e valor. Na página inicial o valor mostrado é o valor base, sem qualquer processamento de promoção.

Ao clicar em um produto do Menu Principal, é chamada uma página dinamica /pages/order/[productId]. Ao chamar essa página em um Link como por exemplo: /pages/order/2, o componente da página então mostra os dados do Produto e trás o Preço alterado com as Promoções ativas.

Ao clicar no "Monte o Seu" na página inicial, o usuário pode adicionar qualquer quantidade de ingredientes no Lanche. Não existem limites nesse exemplo. O valor total é atualizado automáticamente cada vez que o usuário altera as quantidades. Esse valor é mutado conforme as Promoções ativas.

Na página Admin podem ser alteradas as promoções ativas. Qualquer número de promoções podem ser ativadas ao mesmo tempo. Os valores mostrados nas páginas pages/order/[] e pages/custom são mutados a partir dessas Promoções.

---
Fim