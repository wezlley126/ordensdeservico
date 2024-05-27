/**
 * Nome do arquivo: ordens.js
 * Data de criação: 26/05/2024
 * Autor: Weslley Pereira Borges
 * Matrícula: 01608378
 *
 * Descrição:
 * Este arquivo é responsável pelo CRUD da collection ordens de serviço
 * fazendo a manipulação dos dados conformme o tipo de requisição realizada.
 *
 * Este script é parte o curso de ADS.
 */

import {
    getData,
    insertData,
    update,
    getOrdem,
    deleto
  } from './../../repository/ordens.js'

export default async function handler(req, res) {

    if(req.method == 'GET') {

        const dataReceived = await getData()
        res.json(dataReceived)

    }
    else if (req.method == 'POST') {

        const dataReceived = req.body;
        if(dataReceived.id){
            const statusCode = await update(dataReceived.id, dataReceived.status, dataReceived.client, dataReceived.date, dataReceived.describe, dataReceived.cost)
            if(statusCode == 200){
                res.status(200).json('Dados alterados com sucesso')
            }else{
                res.status(500).json('Erro ao alterar os dados')
            }
        }else{
            const statusCode = await insertData(dataReceived.client, dataReceived.date, dataReceived.describe, dataReceived.cost)
            if(statusCode == 201){
                res.status(201).json('Usuário criado com sucesso')
            }else{
                res.status(500).json('Erro ao inserir o usuário no banco')
            }
        }
    }

    else if(req.method == 'PUT') {
        const dataReceived = req.body
            const responseData = await getOrdem(dataReceived)
            if(responseData == 404){
                res.status(404).json('Ordem não encontrada')
            }else{
                res.status(200).json(responseData)
            }
    }

    else if(req.method == 'DELETE') {
        const dataReceived = req.query;
        const statusReceived = await deleto(dataReceived.id, process.env.FIRE_ORDENS_COLLECTION)
        if(statusReceived == 200){
            res.status(200).json('Ordem apagada com sucesso')
        }else{
            res.status(500).json('Erro ao apagar a ordem')
        }
    }

}