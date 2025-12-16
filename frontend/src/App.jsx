import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function App() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Olá! Sou a IA do Rodrigo. Posso te explicar sobre **Automação**, **Sites** ou **SEO**. Por onde começamos?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // SEU LINK DO RENDER
  //const API_URL = "https://ifood-backend-rodrigo.onrender.com/chat"; 
  const API_URL = "http://localhost:8000/chat"; 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const textoUsuario = input;
    setInput('');
    setLoading(true);

    setMessages(prev => [...prev, { role: 'user', content: textoUsuario }]);

    try {
      const response = await axios.post(API_URL, { message: textoUsuario });
      setMessages(prev => [...prev, { role: 'bot', content: response.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "**Erro de conexão.** O servidor pode estar dormindo (Render Free). Tente de novo em 30s." }]);
    }
    setLoading(false);
  };

  const MAIN_SITE_URL = "https://rodrigocotrin.com";
  const WHATSAPP_URL = "https://wa.me/5511988263659";

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#0f172a] text-[#f8fafc]">
      
      {/* HEADER */}
      <header className="fixed w-full top-0 bg-[#0f172a]/90 backdrop-blur-md border-b border-white/5 z-50 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href={MAIN_SITE_URL} target="_blank" rel="noopener noreferrer" className="text-xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition">
            Rodrigo Cotrin
          </a>
          <ul className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <li><a href={MAIN_SITE_URL} className="hover:text-blue-500 transition">Home</a></li>
            <li><a href={MAIN_SITE_URL} className="hover:text-blue-500 transition">Serviços</a></li>
            <li><a href={MAIN_SITE_URL} className="hover:text-blue-500 transition">Sobre</a></li>
          </ul>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-sm font-bold transition shadow-lg shadow-green-500/20 hover:scale-105 active:scale-95">
            WhatsApp
          </a>
        </nav>
      </header>

      {/* MAIN */}
      <main className="flex-1 pt-24 pb-10 px-4 flex flex-col items-center justify-center">
        <div className="text-center mb-8 animate-message">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mb-4">
            ENGENHARIA DIGITAL
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Assistente Virtual <span className="text-blue-500">Inteligente</span>
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Tire suas dúvidas sobre nossos serviços. IA treinada com contexto real.
          </p>
        </div>

        {/* CHAT CONTAINER */}
        <div className="w-full max-w-2xl bg-[#1e293b]/80 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-message`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed break-words shadow-md transition-all hover:shadow-lg ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-sm' 
                  : 'bg-slate-700/50 text-slate-200 border border-white/5 rounded-bl-sm'
                }`}>
                  <ReactMarkdown 
                    components={{
                      a: ({node, ...props}) => <a {...props} className="text-blue-400 hover:underline font-bold" target="_blank" rel="noopener noreferrer" />,
                      strong: ({node, ...props}) => <span {...props} className="font-bold text-white" />,
                      ul: ({node, ...props}) => <ul {...props} className="list-disc ml-4 my-2 space-y-1" />,
                      ol: ({node, ...props}) => <ol {...props} className="list-decimal ml-4 my-2 space-y-1" />,
                      p: ({node, ...props}) => <p {...props} className="mb-2 last:mb-0" />
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start animate-message">
                <div className="bg-slate-700/50 p-4 rounded-2xl rounded-bl-sm border border-white/5">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-[#0f172a]/50 border-t border-white/5">
            <div className="flex gap-2">
              <input 
                autoFocus={true}
                className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-slate-500 text-white"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ex: Quanto custa o site?"
                disabled={loading}
              />
              <button 
                onClick={sendMessage}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 rounded-xl font-bold transition flex items-center justify-center shadow-lg shadow-blue-600/20 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#0b1120] border-t border-white/5 py-8 text-center text-slate-500 text-sm">
        <p>© 2025 Rodrigo Cotrin Engenharia Digital.</p>
      </footer>
    </div>
  );
}

export default App;