Para acessar a manipulação do banco, basta que sejam feitas solicitações GET, POST, PUT ou DELETE aos arquivos:
users.js e ordens.js dentro da pasta /api, na GET se recebe os dados, no POST caso não seja passado ID,
será criado um(a) novo(a) usuário/ordem, caso seja passado ID, ele irá alterar os dados com base no ID,
no PUT é retornado os dados de um único item para auxiliar o sistema na alteração dos dados e no delete
é passado somente o ID do item que será apagado pela url.