/**
 * Nome do arquivo: crudClients.js
 * Data de criação: 26/05/2024
 * Autor: Weslley Pereira Borges
 * Matrícula: 01608378
 *
 * Descrição:
 * Este arquivo é responsável por exibir o frontend para o usuário
 * e realizar as requisições relacionadas a collection clients nescessárias a api com base no que for
 * solicitado pelo usuário.
 * Este script é parte o curso de ADS.
 */

import axios from 'axios';
import styles from './../styles/crud.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';


export default function Clients() {

    const [users, setUsers] = useState(null);
    const [inputs, setInputs] = useState({});
    const [submit, setSubmit] = useState(false)
    const [titleForm, setTitleForm] = useState('Adicionar Cliente')
    //const [dataTable, setDataTable] = useState(null);

    const cancelForm = (e) => {
        e.preventDefault();
    }

    const closeForm = () => {
        divForm.style.display = 'none';
        setInputsValues(null, null, null, null, null)
        if(submit){
            setSubmit(false);
        }
    }

    const openForm = () => {
        divForm.style.display = 'flex';
    }


    const setInputsValues = async (nome, email, telefone, endereco) => {
        let nomeInput = document.querySelector('#nome')
        let emailInput = document.querySelector('#email')
        let telefoneInput = document.querySelector('#telefone')
        let enderecoInput = document.querySelector('#endereco')

        telefoneInput.value = telefone
        enderecoInput.value = endereco
        emailInput.value = email
        nomeInput.value = nome

    }

    const SubmitButton = () => {
        if(submit){
            setTitleForm('Alterar dados do Cliente')
            return(
                <>
                <button onClick = {updateUser} className = {styles.inputs}>Salvar Alterações</button>
                </>
            )
        }else{
            setTitleForm('Adicionar Cliente')
            return(
                <>
                <button onClick = {insertUsers} className = {styles.inputs}>Adicionar</button>
                </>
            )
        }
    }

    // ---------------------- GET ----------------------

    const getUsers = async () => {

        const response = await axios.get(`/api/users`)
        setUsers(response.data); 
    }

    // ---------------------- POST ----------------------

    const inputsData = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const insertUsers = async () => {
        if(inputs == null){
            console.log('Preencha os campos corretamente')
        }else{
            const sendData = {
                nome: inputs.nome,
                endereco: inputs.endereco,
                telefone: inputs.telefone,
                email: inputs.email
            }
            if(sendData.nome && sendData.endereco && sendData.telefone && sendData.email){
                const response = await axios.post('/api/users', sendData)
                console.log('Dados enviados: ', response.data)
                setInputs({})
                setInputsValues(null, null, null, null)
                getUsers()
            }else{
                console.log('Prencha o formulário com os dados nescessários')
            }
        }
    }
    
    // ---------------------- PUT ----------------------

    const getUser = async (e) => {
        openForm();
        // Pega os dados do usuário do botaõ Alterar
        const idUser = {id: e.target.value}
        const dataReceived = await axios.put('/api/users', idUser)
        //console.log(dataReceived.data)
        setInputsValues(dataReceived.data.nome, dataReceived.data.email, dataReceived.data.telefone, dataReceived.data.endereco)
        setInputs(dataReceived.data)
        setSubmit(true);
        
    }

    const updateUser = async () => {
        const updateResponse = await axios.post(`/api/users`, inputs)
        console.log(updateResponse.data)
        setSubmit(false)
        getUsers()
        setInputsValues(null, null, null, null)
        setInputs(null)
    }

    // ---------------------- DELETE ----------------------

    const dropUsers = async (e) => {
        const response = await axios.delete(`/api/users?idUser=${e.target.value}`)
        getUsers()
    }

    useEffect(() => {
        getUsers()
    }, [])

    if (!users) return <h1>Aguardando...</h1>

    return(
        <>
        <nav className = {styles.nav} >
            <Link className = {styles.links} href="/crudOS">Ordens de Serviço</Link>
        </nav>
        <div className = {styles.divPai}>
            <button onClick = {openForm} className = {styles.novaOrdem}>Adicionar Cliente</button>
            <div id = 'divForm' className = {styles.divForm}>
                <button onClick = {closeForm} className = {styles.closeForm}>Fechar</button>
                <form className = {styles.addForm} onSubmit = {cancelForm}>
                    <h2>{titleForm}</h2>
                    <input id = 'nome' className = {styles.inputs} type = 'text' onChange = {inputsData} name = 'nome' placeholder = 'Nome' required />
                    <input id = 'email' className = {styles.inputs} type = 'text' onChange = {inputsData} name = 'email' placeholder = 'Email' required />
                    <input id = 'telefone' className = {styles.inputs} type = 'text' onChange = {inputsData} name = 'telefone' placeholder = 'Telefone' required />
                    <input id = 'endereco' className = {styles.inputs} type = 'text' onChange = {inputsData} name = 'endereco' placeholder = 'Endereço' required />
                    <SubmitButton />
                </form>
            </div>

            <div className = {styles.divTable}>
            <table className = {styles.tableData}>
                <thead>
                    <tr>
                        <td>Alterar</td>
                        <td>Id</td>
                        <td>Nome</td>
                        <td>Email</td>
                        <td>Telefone</td>
                        <td>Endereco</td>
                        <td>Deletar</td>
                    </tr>
                </thead>
                <tbody>
                {
                        users.map(user => (
                            <tr key={user.id}>
                                <td><button onClick = {getUser} value = {user.id} className = {styles.inputs} >Alterar</button></td>
                                <td>{user.id}</td>
                                <td>{user.nome}</td>
                                <td>{user.email}</td>
                                <td>{user.telefone}</td>
                                <td>{user.endereco}</td>
                                <td><button onClick = {dropUsers} value = {user.id} className = {styles.inputs} >Deletar</button></td>
                            </tr>
                        ))}
                </tbody>
            </table>
            </div>
        </div>
            </>
    )
}