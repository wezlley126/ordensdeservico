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

export async function getClients() {
    let data = [];

    const get = async () => {
        
        const dataResponse = await getDocs(collection(db, process.env.FIRE_USERS_COLLECTION));
        /* res.status(200).json(dataResponse) */
        dataResponse.forEach((doc) => {
            let tempData = doc.data();
            tempData['id'] = doc.id
            data.push(tempData)

          //data[doc.id] = doc.data();
        })
        //res.status(200).json(data)
        return data
      }
      return get();
}

export async function insert (nome, endereco, telefone, email) {
    const retorno = await addDoc(collection(db, process.env.FIRE_USERS_COLLECTION), {
        nome: nome,
        endereco: endereco,
        telefone: telefone,
        email: email
    })
    if(retorno.id != undefined){
        console.log('Cliente adicionado com o id:', retorno.id)
        return('Usuário criado com sucesso')
        //res.status(201).json('Usuário criado com sucesso');
    }else{
        return('Erro ao adicionar o usuário no banco')
        //res.status(200).json('Erro ao adicionar o usuário no banco')
    }
}

export async function update(id, nome, endereco, telefone, email) {

    // Organiza a inserção dos dados
    const idClient = id
    const valid_usuario = doc(db, process.env.FIRE_USERS_COLLECTION, idClient);

    // Atualiza os dados
    const returnData = await updateDoc(valid_usuario, {
        nome: nome,
        email: email,
        endereco: endereco,
        telefone: telefone
    }).then(() => {
        return(true);
        //res.status(200).json('Dados alterados com sucesso')
    }).catch((err) => {
        return(false)
    })

    if(returnData){
        return('Dados alterados com sucesso')
    }else{
        return('Erro ao alterar os dados')
    }
}

export async function getUser(data) {
    const id = data.id;
    const datadb = await getDoc(doc(db, process.env.FIRE_USERS_COLLECTION, id))
    //console.log('Dados recebidos --------------> ', dataReceived.data)
    let tempData = await datadb.data();
    if(tempData == undefined){
        return(404)
    }else{
        tempData['id'] = datadb.id
        return(tempData)
    }
    //res.status(200).json(tempData);
}

export async function deleto(id, table) {
    const idClient = id
    const valid_usuario = doc(db, table, idClient);

    const statusReturn = await deleteDoc(valid_usuario).then(() => {
        return(200)
        //res.status(200).json('Usuário foi fumar cigarro');
    })

    return(statusReturn)
}