from flask import Flask, request, jsonify
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import spacy
from spacy import displacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

# Carregue o modelo de linguagem spaCy
nlp = spacy.load("pt_core_news_sm")

# Defina a fonte de dados (por exemplo, uma base de dados médica)
fonte_dados = "https://www.ncbi.nlm.nih.gov/pubmed/"

# Defina o conjunto de stopwords
stop_words = set(stopwords.words("portuguese"))

# Função para pré-processar o texto
def preprocess_text(texto):
 texto = texto.lower()
 tokens = word_tokenize(texto)
 tokens = [t for t in tokens if t not in stop_words]
 return " ".join(tokens)

# Função para buscar informações relevantes
def busca_informacoes(query):
    # Busque informações na fonte de dados
    url = f"{fonte_dados}?term={query}"
    resposta = requests.get(url)
    soup = BeautifulSoup(resposta.content, "html.parser")
    
    # Extraia os títulos e resumos dos artigos
    titulos = [t.text.strip() for t in soup.find_all("h1")]
    resumos = [r.text.strip() for r in soup.find_all("p")]
    
    # Crie um conjunto de documentos
    documentos = []
    for titulo, resumo in zip(titulos, resumos):
        documento = f"{titulo}. {resumo}"
        documentos.append(documento)
    
    # Crie um vetor de características TF-IDF
    vetorizador = TfidfVectorizer()
    vetor = vetorizador.fit_transform(documentos)
    
    # Calcule a similaridade entre a consulta e os documentos
    similaridade = cosine_similarity(vetor, vetorizador.transform([query]))
    
    # Retorne os documentos mais relevantes
    return [documento for _, documento in sorted(zip(similaridade, documentos), reverse=True)]

# Rota para a consulta
@app.route("/consulta", methods=["POST"])
def consulta():
    query = request.form["query"]
    query = preprocess_text(query)
    documentos = busca_informacoes(query)
    return jsonify({"resultados": documentos})

if __name__ == "__main__":
    app.run(debug=True)