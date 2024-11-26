from flask import Flask, request, jsonify
from googletrans import Translator, LANGUAGES
import requests
from flask_cors import CORS
import spacy  # Importando spaCy para análise de texto

# Criar a instância do Flask
app = Flask(__name__)
CORS(app)

# Configuração da chave da API OpenFDA
OPENFDA_API_KEY = "W2ov3YzVyhPBRPiI4VpbYnauSMzokdcB9Bulv4wP"
OPENFDA_BASE_URL = "https://api.fda.gov/drug/label.json"

# Instância do tradutor
translator = Translator()

# Carregar o modelo spaCy para português (pt)
nlp = spacy.load("pt_core_news_sm")

# Função para traduzir sintomas para inglês
def traduzir_para_ingles(sintomas):
    try:
        # Verifica se há sintomas a traduzir
        if not sintomas:
            return []
        
        # Realiza a tradução de cada sintoma individualmente
        return [translator.translate(sintoma.strip(), src='pt', dest='en').text for sintoma in sintomas]
    
    except Exception as e:
        print(f"Erro ao traduzir para inglês: {e}")
        return sintomas  # Retorna o texto original caso falhe

# Função para traduzir o uso para português
def traduzir_para_portugues(uso):
    try:
        if uso != "Não especificado":
            return translator.translate(uso.strip(), src='en', dest='pt').text
        else:
            return uso  # Retorna como está caso o uso não seja especificado
    except Exception as e:
        print(f"Erro ao traduzir o uso para português: {e}")
        return "Erro ao traduzir"  # Retorna um erro padrão caso falhe

# Função para identificar sintomas usando spaCy
def identificar_sintomas(texto):
    try:
        doc = nlp(texto)  # Processa o texto com spaCy
        sintomas_identificados = []

        # Itera sobre as entidades reconhecidas (ex: doenças, sintomas)
        for ent in doc.ents:
            if ent.label_ == "SYMPTOM":  # Verifica se a entidade é um sintoma
                sintomas_identificados.append(ent.text)

        return sintomas_identificados
    except Exception as e:
        print(f"Erro ao identificar sintomas com spaCy: {e}")
        return []

# Função para consultar a API OpenFDA
def consultar_openfda(sintomas_traduzidos):
    query = " OR ".join([f"description:{sintoma}" for sintoma in sintomas_traduzidos])
    params = {
        "search": query,
        "limit": 10,
        "api_key": OPENFDA_API_KEY
    }
    response = requests.get(OPENFDA_BASE_URL, params=params)

    if response.status_code == 200:
        return response.json().get("results", [])
    else:
        print("Erro na consulta OpenFDA:", response.status_code)
        return []

# Função para processar os resultados da consulta e extrair informações relevantes
def processar_resultados(resultados):
    medicamentos = []
    for item in resultados:
        # Pega o uso original ou uma string padrão se não estiver disponível
        uso_original = item.get("indications_and_usage", ["Não especificado"])[0]
        
        # Traduz o uso para o português
        uso_traduzido = traduzir_para_portugues(uso_original)

        medicamento = {
            "medicamento": item.get("openfda", {}).get("brand_name", ["Desconhecido"])[0],
            "uso": uso_traduzido
        }

        # Adiciona o medicamento à lista se o nome for encontrado
        if medicamento["medicamento"] != "Desconhecido":
            medicamentos.append(medicamento)

    return medicamentos

# Endpoint para consulta por sintomas
@app.route('/consulta', methods=['GET'])
def consulta_por_sintomas():
    sintomas = request.args.get('sintomas', '')  # Obtemos os sintomas da query string
    if not sintomas:
        return jsonify({"erro": "Sintomas não fornecidos"}), 400

    # Quebramos a string de sintomas em uma lista, mesmo que tenha apenas um sintoma
    sintomas_lista = sintomas.split(',')  # Se passar 'hipertensao', ele será ['hipertensao']

    # Traduzir os sintomas para inglês
    sintomas_traduzidos = traduzir_para_ingles(sintomas_lista)

    # Consultar a OpenFDA
    resultados = consultar_openfda(sintomas_traduzidos)

    # Processar os resultados
    medicamentos = processar_resultados(resultados)

    return jsonify(medicamentos)  # Retorna os medicamentos encontrados


# Inicializa o servidor Flask
if __name__ == '__main__':
    app.run(debug=True, port=8000)
