/**
 * Nome do arquivo: users.js
 * Data de criação: 26/05/2024
 * Autor: Weslley Pereira Borges
 * Matrícula: 01608378
 *
 * Descrição:
 * Este arquivo é responsável pelo CRUD da collection de clients
 * fazendo a manipulação dos dados conformme o tipo de requisição realizada
 * e repassando para a camada de banco de dados do repository
 *
 * Este script é parte o curso de ADS.
 */

import {
  getClients,
  getUser,
  insert,
  update,
  deleto
} from './../../repository/users.js'

export default async function handler(req, res){

  if(req.method == 'GET'){
    const dataResponse = await getClients()
    res.status(200).json(dataResponse)
  }

  else if(req.method == 'POST'){

    const dataReceived = req.body;
    if(dataReceived.id){
      const responseData = await update(dataReceived.id, dataReceived.nome, dataReceived.endereco, dataReceived.telefone, dataReceived.email)
      res.status(200).json(responseData)
    }else{
      const responseData = await insert(dataReceived.nome, dataReceived.endereco, dataReceived.telefone, dataReceived.email)
      res.status(201).json(responseData)
    }

}

  else if(req.method == 'PUT'){

    const dataReceived = req.body
    if(!dataReceived.id){
        res.status(200).json('Por favor realizar o envio do id')
      }else{
        const dataResponse = await getUser(dataReceived)
      if(dataResponse == 404){
        res.status(404).json('Usuário não encontrado')
      }else{
        res.status(200).json(dataResponse)
      }
    }
    
  }

  else if(req.method == 'DELETE'){

    const dataReceived = req.query;
    const responseData = await deleto(dataReceived.idUser, process.env.FIRE_USERS_COLLECTION)
    if(responseData == 200){
      res.status(200).json('Usuário excluido com sucesso')
    }else{
      res.status(500).json('Ocorreu um erro ao deletar o usuário do banco');
    }
  }

}
