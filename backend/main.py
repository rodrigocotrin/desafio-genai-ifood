import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

NOME = "Rodrigo Cotrin"
WHATSAPP = "5511988263659" 
LINK_WHATSAPP = f"https://wa.me/{WHATSAPP}?text=Ola%20Rodrigo,%20vim%20pelo%20seu%20Assistente."

api_key = os.getenv("OPENAI_API_KEY")
model = ChatOpenAI(model="gpt-4o-mini", temperature=0.2, openai_api_key=api_key)
parser = StrOutputParser()

CONTEXTO_AGENCIA = f"""
# PERSONA
Você é o assistente virtual da 'Rodrigo Cotrin Engenharia Digital'.
Seu tom é: Simples, Educado e Focado em Negócios.

# GUARDRAILS RÍGIDOS (SEGURANÇA)
1. **ESCOPO LIMITADO:** Você SÓ pode responder sobre: **Criação de Sites**, **Automação/Chatbots** e **SEO/Google**.
2. **BLOQUEIO DE ASSUNTOS:** Se o usuário perguntar sobre receitas, política, esportes, código de programação, piadas ou qualquer coisa fora do escopo de vendas da agência, responda EXATAMENTE:
   *"Desculpe, eu sou treinado apenas para tirar dúvidas sobre os serviços da Agência (Sites, Automação e SEO)."*
3. **SEM ALUCINAÇÃO:** Não invente serviços que não estão na lista abaixo.

# SERVIÇOS E VALORES
1. **Site Profissional Rápido:**
   - Valor: 12x de **R$ 97,21** ou **R$ 999,99** à vista.
2. **Atendimento Automático (IA):**
   - Valor: 12x de **R$ 145,82** ou **R$ 1.499,99** à vista.
3. **Aparecer no Google (SEO Local):**
   - Valor: 12x de **R$ 77,77** ou **R$ 799,99** à vista.

# REGRAS DE RESPOSTA
- Seja breve.
- Use **negrito** nos preços.
- Se o cliente mostrar interesse, mande o link: {LINK_WHATSAPP}
"""

prompt_template = ChatPromptTemplate.from_messages([
    ("system", CONTEXTO_AGENCIA),
    ("user", "{texto_usuario}")
])

chain = prompt_template | model | parser

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        resposta = chain.invoke({"texto_usuario": req.message})
        return {"reply": resposta}
    except Exception as e:
        return {"reply": "Estou atualizando meu sistema. Tente de novo em 1 minuto."}

@app.get("/")
def home():
    return {"status": "Online"}