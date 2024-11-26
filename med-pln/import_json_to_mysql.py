import json
import mysql.connector
from mysql.connector import Error
from fastapi import FastAPI

app = FastAPI()

# Função para criar a conexão com o banco de dados
def create_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',       # Host do banco de dados
            database='medicamentos_db',  # Nome do banco de dados
            user='root',            # Usuário do banco
            password='root'         # Senha do banco
        )
        if connection.is_connected():
            print("Conexão com o banco de dados estabelecida!")
            return connection
    except Error as e:
        print(f"Erro de conexão: {e}")
        return None

# Função para inserir um medicamento na tabela
def insert_medicamento(connection, medicamento):
    try:
        cursor = connection.cursor()
        query = """
            INSERT INTO medicamentos 
            (principio_ativo, cnpj, laboratorio, registro, ean, produto, apresentacao, classe_terapeutica, pmc_0, pmc_12, pmc_17, pmc_20)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            medicamento.get("PRINCIPIO ATIVO"),
            medicamento.get("CNPJ"),
            medicamento.get("LABORATORIO"),
            medicamento.get("REGISTRO"),
            medicamento.get("EAN"),
            medicamento.get("PRODUTO"),
            medicamento.get("APRESENTACAO"),
            medicamento.get("CLASSE TERAPEUTICA"),
            float(medicamento.get("PMC 0%", 0)),
            float(medicamento.get("PMC 12%", 0)),
            float(medicamento.get("PMC 17%", 0)),
            float(medicamento.get("PMC 20%", 0)),
        )
        cursor.execute(query, values)
        connection.commit()
        print(f"Medicamento '{medicamento.get('PRODUTO')}' inserido com sucesso.")
    except Error as e:
        print(f"Erro ao inserir medicamento: {e}")
    except ValueError as ve:
        print(f"Erro de conversão de valor: {ve}")

# Função principal para processar o arquivo JSON e inserir os dados
def importar_medicamentos():
    try:
        # Lendo o arquivo JSON
        with open("medicamentos.json", "r", encoding="utf-8") as file:
            medicamentos = json.load(file)

        # Conectando ao banco de dados
        connection = create_connection()
        if not connection:
            return

        # Inserindo cada medicamento
        for medicamento in medicamentos:
            insert_medicamento(connection, medicamento)

        # Fechando a conexão
        connection.close()
        print("Conexão com o banco de dados encerrada.")

    except FileNotFoundError:
        print("Arquivo medicamentos.json não encontrado.")
    except json.JSONDecodeError as e:
        print(f"Erro ao ler o arquivo JSON: {e}")
    except Exception as e:
        print(f"Erro inesperado: {e}")

# Executando a função
if __name__ == "__main__":
    importar_medicamentos()
