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

---

---

## Vasco Hamburgueria

Design:

This project uses the dinero.js library to manipulate and format monetary values. Implementing financial operations manually makes the code more vulnerable to rounding errors.

Project defines an API using the following layer pattern:

Routes: Defines the routes of the API. Each route definition file defines the URLS of each route and the method to be executed from the respective Controller.

Controllers: Defines the validation logic, and processing of Requests and Responses for each Route. The logical processing itself for each route is executed by a Service or Repository. 

Services: Receives the Request objects from the Controllers, gets data from the database through the Repositories and perform some processing on this data.

Repositories: Get data from the database and transform it to a format suitable to be worked on by the Services.

Models: Define the Application Data Types/Models. Either they are internally processed data only. Or they are also exchange data with the Frontend.

Middleware: Defines utility and intermediate methods used in the processing by Services and Controllers.

Config: Defines global settings of the application.

In the folder __tests__ the tests that validate the API are present.

---

Frontend: 

The frontend is divided in simplified form into :

Pages: Represent a resource that can be accessed via URL.
Components: Represent discrete blocks of a Page that receives values, processes, and makes requests to the Backend. In this example the requests are made directly by the components. In a larger application, it is a good idea to encapsulate the requests in Service/Resource etc classes, which in turn would receive the requests from the components and return the responses in the appropriate format.

A page is nothing more than a component accessible via an URL.

In this example the frontend shows the main menu on the index.tsx home page.

The main menu is a list of ProductCard components. Each ProductCard shows the product's data such as photo, name and value. On the home page the value shown is the base value, without any promotion processing.

Clicking on a product in the Main Menu calls up a dynamic page /pages/order/[productId]. When calling this page from a Link such as: /pages/order/2, the page component then shows the Product data and brings the mutated Price by the active Sale ids.

By clicking on the "Build Your Own" link on the home page, the user can add any number of ingredients to the Snack. There are no limits in this example. The total value is automatically updated each time the user changes the quantities. This value changes according to the active Sale ids.

On the Admin page the active sale ids can be changed. Any number of promotions can be activated at the same time. The values shown on pages/order/[] and pages/custom are mutated from these Sale ids..

---
End