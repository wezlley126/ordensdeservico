/**
 * Nome do arquivo: ordens.js
 * Data de criação: 27/05/2024
 * Autor: Weslley Pereira Borges
 * Matrícula: 01608378
 *
 * Descrição:
 * Este arquivo é responsável por receber requisições da API e 
 * repassar as solicitações, com os tratamentos nescessários para fornecer uma resposta
 * fazendo parte da camada de banco de dados
 *
 * Este script é parte o curso de ADS.
 */

import db from './firebase.js';
import { 
    collection,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    doc
    } from "firebase/firestore";

export async function getData() {
    let data = [];

    const ordens = await getDocs(collection(db, process.env.FIRE_ORDENS_COLLECTION));
        
    ordens.forEach((doc) => {
        let tempData = doc.data();
        tempData['id'] = doc.id
        data.push(tempData)

        //data[doc.id] = doc.data();
    })
    //res.status(200).json(data)
    return(data)
}

export async function insertData(client, date, describe, cost) {
    await addDoc(collection(db, process.env.FIRE_ORDENS_COLLECTION), {
        status: 'iniciado',
        client: client,
        date: date,
        describe: describe,
        cost: cost
    })
    if(insertData){
        return(201)
        //res.status(201).json('Usuário criado com sucesso');
    }else{
        return(500)
        //res.status(500).json('Erro ao inserir o usuário no banco')
    }
}

export async function update(id, status, client, date, describe, cost) {

    // Organiza a inserção dos dados
    const idOrdem = id
    const valid_ordem = doc(db, process.env.FIRE_ORDENS_COLLECTION, idOrdem);

    // Atualiza os dados
    const statusResponse = await updateDoc(valid_ordem, {
        status: status,
        client: client,
        date: date,
        describe: describe,
        cost: cost
    }).then(() => {
        return(200)
        //res.status(200).json('Dados alterados com sucesso')
    }).catch(() => {
        return(500)
    })

    return(statusResponse)

}

export async function getOrdem(data) {
    const id = data.id;
    const datadb = await getDoc(doc(db, process.env.FIRE_ORDENS_COLLECTION, id))
    //console.log('Dados recebidos --------------> ', dataReceived.data)
    let tempData = datadb.data();
    tempData['id'] = datadb.id
    return(tempData)
    //res.status(200).json(tempData);
}

export async function deleto(id, table) {
    console.log(id)
    
    const idClient = id
    const valid_usuario = doc(db, table, idClient);

    const statusResponse = await deleteDoc(valid_usuario).then(() => {
        return(200)
        //res.status(200).json('Usuário foi fumar cigarro');
    }).catch(() => {
        return(500)
    })

    return(statusResponse)
}