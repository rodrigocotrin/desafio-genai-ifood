<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=8A2BE2&height=120&section=header"/>

# 🚀 Assistente Virtual Inteligente (GenAI) – Desafio iFood

<p align="center">
  <a href="https://chat.rodrigocotrin.com" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Acessar%20Live%20Demo-22c55e?style=for-the-badge&logo=vercel&logoColor=white" alt="Deploy Vercel">
  </a>
  <a href="https://github.com/rodrigocotrin" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Meu%20GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://rodrigocotrin.com" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Portfólio-8A2BE2?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Portfólio">
  </a>
</p>

## 💼 Sobre o Projeto

Este projeto é uma resposta prática a um desafio técnico: **Sair da abstração das ferramentas Low-Code e construir uma solução de Engenharia de IA proprietária.**

Em menos de 24 horas, migrei a lógica de um chatbot visual para uma aplicação **Full Stack (Python + React)** robusta. O objetivo é demonstrar capacidade de execução ("High Agency"), domínio de arquitetura de software e engenharia de prompt avançada.

O sistema atua como um **Agente de Vendas (SDR)**, capaz de qualificar leads, utilizar gatilhos mentais de ancoragem de preço e proteger a marca contra alucinações, tudo via código.

---

## 🛠️ Tech Stack & Arquitetura

O projeto segue uma arquitetura de microsserviços para garantir escalabilidade e performance:

### 🧠 Backend (O Cérebro)
- **Linguagem:** Python 3.10+
- **Framework:** FastAPI (Assíncrono e performático).
- **Orquestração:** LangChain (Controle de fluxo e parsers).
- **IA Core:** OpenAI GPT-4o-mini (Temperatura controlada via código).
- **Hospedagem:** Render (Container Linux).

### 🎨 Frontend (O Corpo)
- **Framework:** React + Vite (Single Page Application).
- **Estilização:** TailwindCSS (Responsivo e Dark Mode).
- **UX:** Optimistic UI, Markdown Rendering e Animações CSS.
- **Hospedagem:** Vercel (Edge Network).

---

## 🧠 Engenharia de Prompt & Guardrails

Diferente de chatbots genéricos, este agente possui **Regras de Negócio (Guardrails)** hardcoded no System Prompt:

1.  **Segurança de Escopo:** O bot se recusa a responder sobre assuntos fora do contexto da agência (ex: política, receitas), garantindo a integridade da marca.
2.  **Ancoragem de Preço:** Instrução lógica para sempre apresentar o valor parcelado antes do valor à vista, aumentando a percepção de valor.
3.  **Conversão (CTA):** Gatilhos automáticos para direcionar o usuário para o WhatsApp assim que um sinal de compra é detectado.

---
