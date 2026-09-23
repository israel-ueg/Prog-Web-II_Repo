import { Usuario } from "./Usuario";
import { Cliente } from "./Cliente";

const usuario = new Usuario(1, "Israel");
const cliente = new Cliente("12.345.678/0001-90");

console.log(`Tabela do Usuario: ${usuario.getTableName()}`);
console.log(`Tabela do Cliente: ${cliente.getTableName()}`);