/**
 * Nome do arquivo: users.js
 * Data de criação: 26/05/2024
 * Autor: Weslley Pereira Borges
 * Matrícula: 01608378
 *
 * Descrição:
 * Este arquivo é responsável pelo CRUD da collection de clients
 * fazendo a manipulação dos dados conformme o tipo de requisição realizada.
 *
 * Este script é parte o curso de ADS.
 */

import db from './../../repository/firebase.js';
import { 
    collection,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    doc
    } from "firebase/firestore";
import {getClients, getUser, insert, update, deleto} from './../../repository/users.js'

export default async function handler(req, res){

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

if(req.method == 'GET'){
    const dataResponse = await getClients()
    res.status(200).json(dataResponse)
    //console.log(dataResponse)
    
    /*let data = [];

    const getClients = async () => {
        
        const dataResponse = await getDocs(collection(db, process.env.FIRE_USERS_COLLECTION));
        dataResponse.forEach((doc) => {
            let tempData = doc.data();
            tempData['id'] = doc.id
            data.push(tempData)
        })
        res.status(200).json(data)
      }
      getClients()
      */
}

else if(req.method == 'POST'){
  /*
    const insert = async (nome, endereco, telefone, email) => {
        const retorno = await addDoc(collection(db, process.env.FIRE_USERS_COLLECTION), {
            nome: nome,
            endereco: endereco,
            telefone: telefone,
            email: email
        })
        if(retorno.id != undefined){
          console.log('Cliente adicionado com o id:', retorno.id)
          res.status(201).json('Usuário criado com sucesso');
        }else{
          res.status(200).json('Erro ao adicionar o usuário no banco')
        }
    }
    

    const update = async (id, nome, endereco, telefone, email) => {

      // Organiza a inserção dos dados
      const idClient = id
      const valid_usuario = doc(db, process.env.FIRE_USERS_COLLECTION, idClient);

      // Atualiza os dados
      await updateDoc(valid_usuario, {
          nome: nome,
          email: email,
          endereco: endereco,
          telefone: telefone
      }).then(() => {
          res.status(200).json('Dados alterados com sucesso')
      })
  }

  */

    const dataReceived = req.body;
    if(dataReceived.id){
      const responseData = await update(dataReceived.id, dataReceived.nome, dataReceived.endereco, dataReceived.telefone, dataReceived.email)
      res.status(200).json(responseData)
    }else{
      const responseData = await insert(dataReceived.nome, dataReceived.endereco, dataReceived.telefone, dataReceived.email)
      res.status(201).json(responseData)
    }
    //res.status(200).json('Olá mundo POST')
}

if(req.method == 'PUT'){
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

  /*
    const getUser = async (data) => {
        const idUser = data.idUser;
        const datadb = await getDoc(doc(db, process.env.FIRE_USERS_COLLECTION, idUser))
        //console.log('Dados recebidos --------------> ', dataReceived.data)
        let tempData = datadb.data();
        tempData['id'] = datadb.id
        res.status(200).json(tempData);
    }
    const dataReceived = req.body
    //console.log('dados recebidos aqui --------------> ', dataReceived)
    if(dataReceived.idUser && dataReceived.endereco && dataReceived.email && dataReceived.telefone && dataReceived.nome){
        //console.log('Dados recebidos ----------> ', dataReceived)
        res.json('Dados recebidos ----------> ', dataReceived)
    }else{
        getUser(dataReceived)
    }
    */
    
  }

else if(req.method == 'DELETE'){
  /*
    const deleto = async (id, table) => {
        const idClient = id
        const valid_usuario = doc(db, table, idClient);

        await deleteDoc(valid_usuario).then(() => {
            res.status(200).json('Usuário foi fumar cigarro');
        })
    }
    */
    const dataReceived = req.query;
    //console.log('Id recebido para apagar: ', dataReceived.idUser)
    const responseData = await deleto(dataReceived.idUser, process.env.FIRE_USERS_COLLECTION)
    if(responseData == 200){
      res.status(200).json('Usuário excluido com sucesso')
    }else{
      res.status(500).json('Ocorreu um erro ao deletar o usuário do banco');
    }
}

}
