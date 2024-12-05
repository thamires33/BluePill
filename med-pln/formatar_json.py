import json
import re
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# FastAPI Setup
app = FastAPI()

# Configuração do CORS para integração com React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Função para formatar o JSON
def format_json(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8-sig') as f:
            raw_data = f.read()

        # Corrigir formatação do JSON
        raw_data = re.sub(r'}\s*{', '},{', raw_data)  # Corrige a quebra entre objetos JSON
        if not raw_data.strip().startswith('['):
            raw_data = f'[{raw_data}]'  # Envolve o conteúdo em um array, caso necessário

        # Carregar JSON corretamente
        data = json.loads(raw_data)

        return data  # Retorna os dados formatados

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao formatar JSON: {str(e)}")

# Função para salvar os dados formatados em um novo arquivo JSON
def save_to_json(formatted_data, output_file_path):
    try:
        with open(output_file_path, 'w', encoding='utf-8') as f:
            json.dump(formatted_data, f, ensure_ascii=False, indent=4)
        print(f"Dados formatados e salvos em {output_file_path}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao salvar arquivo JSON: {str(e)}")

# Classe para validar a requisição da API (caso necessário para endpoints adicionais)
class MedicamentoRequest(BaseModel):
    medicamentos: list

@app.post("/importar_medicamentos")
def importar_medicamentos():
    try:
        # Caminho do arquivo JSON que você quer importar
        input_file_path = 'listacmed.json'  # Caminho para o arquivo JSON desformatado
        output_file_path = 'medicamentos.json'  # Caminho para salvar o JSON formatado

        # Formatar o JSON
        formatted_data = format_json(input_file_path)

        # Salvar os dados formatados no novo arquivo
        save_to_json(formatted_data, output_file_path)

        return {"message": f"Dados formatados e salvos em {output_file_path}"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Rota para testar se o servidor está ativo
@app.get("/")
def root():
    return {"message": "API está funcionando corretamente!"}
