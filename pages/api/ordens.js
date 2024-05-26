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


export default function handler(req, res) {

    if(req.method == 'GET') {
        res.status(200).json('Local onde será retornado os dados das ordens')
    }
    else if (req.method == 'POST') {
        res.status(200).json('Local onde serão adicionadas novas ordens')
    }

    else if(req.method == 'PUT') {
        res.status(200).json('Local onde as ordens terão seus dados alterados')
    }

    else if(req.method == 'DELETE') {
        res.status(200).json('Local onde as ordens serão apagadas')
    }

}