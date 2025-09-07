from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA

app = Flask(__name__)
CORS(app)

def load_documents():
    docs = []
    pdf_folder = "pdfs"
    if not os.path.exists(pdf_folder):
        os.makedirs(pdf_folder)
        print(f"Created folder '{pdf_folder}'. Add PDFs there and restart.")
    else:
        for filename in os.listdir(pdf_folder):
            if filename.endswith(".pdf"):
                loader = PyPDFLoader(os.path.join(pdf_folder, filename))
                docs.extend(loader.load())
    return docs

print("Loading documents...")
docs = load_documents()
if not docs:
    print("No PDFs found in the 'pdfs' folder. Exiting.")
    exit()

print("Splitting documents into chunks...")
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
texts = text_splitter.split_documents(docs)

print("Creating embeddings...")
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

print("Initializing vector store...")
vectorstore = Chroma.from_documents(texts, embedding=embeddings, persist_directory="db")

print("Loading Ollama LLM...")
llm = Ollama(model="llama3")

qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=vectorstore.as_retriever())

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question", "")
    if not question:
        return jsonify({"error": "No question provided"}), 400

    prompt_template = (
        "You are a supportive, expert autism therapy assistant. "
        "Always provide helpful, hopeful, and practical strategies based on best practices and documents available. "
        "Avoid saying 'I don't know' or leaving questions unanswered. "
        "Here's the question: {question}"
    )
    full_prompt = prompt_template.format(question=question)

    try:
        answer = qa_chain.run(full_prompt)
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("Flask server running on port 5000...")
    app.run(port=5000)
