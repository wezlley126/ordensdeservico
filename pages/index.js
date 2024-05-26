/**
 * Nome do arquivo: index.js
 * Data de criação: 26/05/2024
 * Autor: Weslley Pereira Borges
 * Matrícula: 01608378
 *
 * Descrição:
 * Este arquivo é responsável por exibir a página de clientes como a página principal ao acessar a url padrão.
 * Este script é parte o curso de ADS.
 */

import Clients from './crudClients'

export default function Home() {
  return (
  <>
  <Clients />
  </> 
  );
}
