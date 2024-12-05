from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

# Configuração do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:3306/medicamentos_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Habilitando CORS para permitir chamadas do frontend
CORS(app)

# Definindo a tabela de medicamentos
class Medicamento(db.Model):
    __tablename__ = 'medicamentos'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    produto = db.Column(db.String(120), index=True)
    classe_terapeutica = db.Column(db.String(120))
    principio_ativo = db.Column(db.String(120))
    laboratorio = db.Column(db.String(120))
    cnpj = db.Column(db.String(120))
    registro = db.Column(db.String(120))
    ean = db.Column(db.String(120))
    apresentacao = db.Column(db.String(120))

# Endpoint para buscar medicamentos
@app.route('/medicamentos', methods=['GET'])
def get_medicamentos():
    keyword = request.args.get('keyword', '')
    classe_terapeutica = request.args.get('classe_terapeutica', '')
    principio_ativo = request.args.get('principio_ativo', '')
    
    query = Medicamento.query

    if keyword:
        query = query.filter((Medicamento.produto.ilike(f"%{keyword}%")) | 
                             (Medicamento.principio_ativo.ilike(f"%{keyword}%")))

    if classe_terapeutica:
        query = query.filter(Medicamento.classe_terapeutica.ilike(f"%{classe_terapeutica}%"))
    
    if principio_ativo:
        query = query.filter(Medicamento.principio_ativo.ilike(f"%{principio_ativo}%"))

    medicamentos = query.all()

    return jsonify([{
        "id": med.id,
        "produto": med.produto,
        "classe_terapeutica": med.classe_terapeutica,
        "principio_ativo": med.principio_ativo,
        "laboratorio": med.laboratorio,
        "cnpj": med.cnpj,
        "registro": med.registro,
        "ean": med.ean,
        "apresentacao": med.apresentacao
    } for med in medicamentos])

# Endpoint para listar todas as classes terapêuticas
@app.route('/classes', methods=['GET'])
def get_classes():
    classes = Medicamento.query.with_entities(Medicamento.classe_terapeutica).distinct().all()
    return jsonify([classe[0] for classe in classes])

if __name__ == '__main__':
    app.run(debug=True)
