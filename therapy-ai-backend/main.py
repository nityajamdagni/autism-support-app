from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

from tavily import TavilyClient

app = Flask(__name__)
CORS(app)

# Load PDFs
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
text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=300)
texts = text_splitter.split_documents(docs)

print("Creating embeddings...")
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

print("Initializing vector store...")
vectorstore = Chroma.from_documents(texts, embedding=embeddings, persist_directory="db")

# Tavily Client
print("Initializing Tavily Client...")
client = TavilyClient("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")
response = client.extract(
    urls=["https://www.autismspeaks.org/"]
)
print(response)

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question", "").strip()

    if not question:
        return jsonify({"error": "No question provided"}), 400

    try:
        prompt_template = (
            "You are a highly experienced and compassionate autism therapy assistant. "
            "Answer the question thoroughly in multiple detailed paragraphs. "
            "Provide practical strategies, real examples, and helpful resources. "
            "Avoid one-line or short responses. "
            "Here’s the question: {question}"
        )
        full_prompt = prompt_template.format(question=question)

        response = client.search(
            query=full_prompt,
            include_answer="advanced"
        )

        answer = response.get("answer", "Sorry, no answer available.")
        return jsonify({"answer": answer})

    except Exception as e:
        return jsonify({"error": f"Exception: {str(e)}"}), 500


if __name__ == "__main__":
    print("Flask server running on port 5000...")
    app.run(port=5000)
