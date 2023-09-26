import Layout from '@/components/Layout/Layout';
import { Chat } from '../components/Chat/Chat';
import { Footer } from '../components/Layout/Footer';
import { Navbar } from '../components/Layout/Navbar';
import { Message } from '../types';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { Center } from '@mantine/core';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (message: Message) => {
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);
    try{
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });
  
      if (!response) {
        setLoading(false);
        throw new Error(response);
      }
  
      const content = await response.json();
  
      if (!content) {
        setLoading(false);
        throw new Error(content);
      }
  
      setLoading(false);
  
      setMessages((messages) => [
        ...messages,
        {
          role: 'assistant',
          content,
        },
      ]);

    }
    catch(err) {
      setLoading(false);
      console.log(err);
    }
  
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: `Hey, I'm Kiwi 🥝, your chat buddy! Let's make things fun and easy-peasy. How can I brighten your day? 😄`,
      },
    ]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: `Hey, I'm Kiwi 🥝, your chat buddy! Let's make things fun and easy-peasy. How can I brighten your day? 😄`,
      },
    ]);
  }, []);

  return (
    <>
   <Head>
      <title>Chat Buddy | Kiwi</title>
    </Head>
    <Layout>
      <Center
        className="max-w-[800px] mx-auto"
        style={{
          height: '89vh',
        }}
      >
        <div
          className="overflow-y-auto max-h-[80vh] mt-15 custom-scrollbar" // Add these CSS classes for scrolling
          style={{ width: '100%' }}
        >
          <Chat
            messages={messages}
            loading={loading}
            onSend={handleSend}
            onReset={handleReset}
          />
          <div ref={messagesEndRef} />
        </div>
      </Center>
    </Layout>
    </>
  );
}
