Para realizar solicitações a api, basta fazer requisição aos arquivos users.js e ordens.js dentro da pasta /api.

<h2>Solicitações REST</h2>
<ol>
  <li>GET: Retorna os dados dos clientes e das ordens de serviço</li>
  <li>POST: Caso não seja passado o id, somente os dados, irá realizar a criação de um novo item, caso seja passado um id, irá alterar os dados do item existe com base no id</li>
  <li>PUT: Retorna os dados de um único item</li>
  <li>DELETE: Apaga o item com baso no id passado.</li>
</ol>

OBS: O put e delete pasam o id pela url sendo o usuário ?Userid=****** e o ordens de serviço ?id=******

<h2>Variavéis de ambiente</h2>
<b>há 8 variáveis, sendo 6 para a configuração da conexão com o banco do firebase</b><br/><br/>

<ul>
  <li>FIRE_API_KEY=</li>
  <li>FIRE_AUTH_DOMAIN=</li>
  <li>FIRE_PROJECT_ID=</li>
  <li>FIRE_STORAGE_BUCKET=</li>
  <li>FIRE_MESSAGINGSENDERID=</li>
  <li>FIRE_APP_ID=</li>
</ul>

<b>e duas para os nomes que serão dados as duas collections de ordens de serviço e dos clientes</b>
<ul>
  <li>FIRE_ORDENS_COLLECTION=</li>
  <li>FIRE_USERS_COLLECTION=</li>
</ul>
