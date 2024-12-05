import sqlite3
import pandas as pd
import json
import re

# Carregar o JSON corrigido
with open('listacmed.json', 'r', encoding='utf-8-sig') as f:
    raw_data = f.read()

raw_data = re.sub(r'}\s*{', '},{', raw_data)  # Corrigir objetos não delimitados
if not raw_data.strip().startswith('['):
    raw_data = f'[{raw_data}]'

data = json.loads(raw_data)
df = pd.DataFrame(data)

# Conectar ao banco de dados SQLite
conn = sqlite3.connect('medicamentos.db')
cursor = conn.cursor()

# Criar a tabela
cursor.execute('''
CREATE TABLE IF NOT EXISTS medicamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    classe_terapeutica TEXT,
    produto TEXT
)
''')

# Inserir os dados no banco
df.to_sql('medicamentos', conn, if_exists='replace', index=False)

print("Banco de dados criado com sucesso!")
conn.close()
