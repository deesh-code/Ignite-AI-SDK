'use client';

import { useState, FormEvent } from 'react';
import { useChat } from '../lib/hooks/useChat';
import { ActionpackdFooter } from './components/ActionpackdFooter';

export default function ChatPage() {
  const { messages, isLoading, error, sendMessage } = useChat();
  const [input, setInput] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input;
    setInput('');
    await sendMessage(message);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="container mx-auto max-w-4xl px-4 py-8 mb-16">
        <div className="card overflow-hidden">
          <header className="px-6 py-4 bg-white border-b">
            <h1 className="section-title text-center">Chat with AI</h1>
            <p className="text-sm text-gray-500 mt-1 text-center">Powered by OpenAI GPT</p>
          </header>

          <div className="flex-1 h-[60vh] overflow-auto p-6 space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-6 py-3 ${message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'}`}
                >
                  <div className="text-xs font-medium mb-1 opacity-75">
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </div>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-6 py-3 bg-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="animate-pulse flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animation-delay-200"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animation-delay-400"></div>
                    </div>
                    <span className="text-sm text-gray-500">AI is typing</span>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-center">
                <div className="bg-red-50 text-red-600 rounded-lg px-4 py-2 text-sm">
                  {error.message}
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="input-field flex-1"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <ActionpackdFooter />
    </div>
  );
}
