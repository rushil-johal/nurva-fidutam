"use client"

import React, { useEffect, useRef } from "react";
import { Message, useAssistant } from '@ai-sdk/react';
import { MdAssistant, MdPerson } from "react-icons/md";
import Link from "next/link";
import { useRouter } from 'next/navigation';

function Assistant() {
  const {
    status,
    messages,
    input,
    submitMessage,
    handleInputChange,
    error,
    stop,
  } = useAssistant({ api: '/api/advice_asst' });

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === 'awaiting_message') {
      inputRef.current?.focus();
    }
  }, [status]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage();
  };

  return (
    <div className="bg-nurva3 min-h-screen font-nurvafont border-2 border-black rounded-xl p-4 hover:shadow-lg">
      <header className="flex justify-between p-4">
        <div className="flex items-center">
          <Link href={{ pathname: '/' }}>
            <img src="/fidulogo.png" alt="Logo" className="h-8 w-8 mr-2" />
          </Link>
          <h1 className="text-xl font-bold">Nurva</h1>
        </div>
      </header>
      <div className="mt-4 overflow-y-auto max-h-96">
        <div className="flex items-center mb-8">
          <MdAssistant className="text-nurva1 w-12 h-12 mr-3" />
          <h2 className="text-nurva1 text-4xl font-bold">Assistant</h2>
        </div>
        <div className="mt-4 overflow-y-auto max-h-screen">
          {messages.map((m: Message) => (
            <div
              key={m.id}
              className={`flex items-start space-x-4 p-4 rounded-lg shadow-sm ${m.role === 'user' ? 'bg-nurva1 self-end text-black justify-end' : 'bg-nurva2 text-black justify-start'
                } my-2`}
            >
              <div
                className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-nurva4 font-bold ${m.role === 'user' ? 'bg-nurva2' : 'bg-nurva1'
                  }`}
              >
                {m.role === 'user' ? <MdPerson /> : <MdAssistant />}
              </div>
              <div>
                <strong className="block mb-1 capitalize">{`${m.role}`}</strong>
                {m.role !== 'data' && <p className="text-sm leading-tight">{m.content.split('**').map((item, index) => {
                  if (index % 2 === 1) {
                    return <strong key={index}>{item}</strong>;
                  } else {
                    return <span key={index}>{item}</span>;
                  }
                })}</p>}
                {m.role === 'data' && (
                  <>
                    <p className="text-sm leading-tight">{(m.data as any).description.split('**').map((item: string, index: number) => {
                      if (index % 2 === 1) {
                        return <strong key={index}>{item}</strong>;
                      } else {
                        return <span key={index}>{item}</span>;
                      }
                    })}</p>
                    <pre className="bg-gray-200 p-2 rounded-lg mt-2 overflow-x-auto text-xs">
                      {JSON.stringify(m.data, null, 2)}
                    </pre>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {status === 'in_progress' && (
          <div className="w-full h-8 max-w-md p-2 mb-8 bg-gray-300 rounded-lg dark:bg-gray-600 animate-pulse" />
        )}
        <div className="bg-gray-100 p-4 rounded-2xl mb-4 text-xl text-gray-500">
          <form onSubmit={handleFormSubmit}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask away"
              className="bg-transparent w-full focus:outline-none"
              value={input}
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Assistant;
