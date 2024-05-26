/**
 * Nome do arquivo: firebase.js
 * Data de criação: 26/05/2024
 * Autor: Weslley Pereira Borges
 * Matrícula: 01608378
 *
 * Descrição:
 * Este arquivo é responsável por configurar o banco de dados
 * e exportar a const db que é utlizada pelas demais rotas para solicitações ao banco.
 *
 * Este script é parte o curso de ADS.
 */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db;