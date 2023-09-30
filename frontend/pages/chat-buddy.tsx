import Layout from '@/components/Layout/Layout';
import { Chat } from '../components/Chat/Chat';
import { Message } from '../types';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { Center } from '@mantine/core';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>({
    name: 'Random User',
    age: 2,
    gender:"male"
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const profile = localStorage.getItem('profile');
    if (profile) {
      setProfile(JSON.parse(profile));
    }
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (message: Message) => {
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
          profile,
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
    } catch (err) {
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
        <div
          style={{
            height: '89%',
            width: '100%',
            backgroundImage: 'url("/assets/owl.gif")', // Your background image URL
            backgroundSize: 'auto 50%', // Auto width, full height
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left 100px bottom',
          }}
        >
          <Center
            className="mx-auto max-w-[800px]"
            style={{
              height: '89vh',
            }}
          >
            <div
              className="t-15 custom-scrollbar max-h-[80vh] overflow-y-auto" // Add these CSS classes for scrolling
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
        </div>
      </Layout>
    </>
  );
}
