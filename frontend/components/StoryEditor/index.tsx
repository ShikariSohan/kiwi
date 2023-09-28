'use client';

import { useRef, useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import LoadingDots from '../LoadingDots';
import { title } from 'process';
import ButtonPrimary from '../misc/ButtonPrimary';
import { Center } from '@mantine/core';

const defaultContent = `<p>A boy and a happy lion</p>`;

const StoryEditor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setresult] = useState('');
  const [title, settitle] = useState('');
  const editor = useEditor({
    extensions: [StarterKit],
    content: defaultContent,
    editorProps: {
      attributes: {
        class:
          'border border-gray-300 min-h-[200px] p-3 prose dark:prose-invert focus:outline-none max-w-full',
      },
    },
  });

  const generateStory = async () => {
    const cleanText = editor?.getText();

    if (!cleanText) {
      console.log('content is missing: ', cleanText);
      alert('Content is missing!');
      return;
    }

    // max word limit
    if (cleanText.split(' ')?.length > 800) {
      alert('You may only use 800 words at once!');
      return;
    }

    try {
      setIsLoading(true);
      const profile = localStorage.getItem('profile') || '';
      const id = JSON.parse(profile)  || {
        id :"abcs",
        name :"abcs",
        age:2,
        gender:"male"
      }
      const response = await fetch('/api/story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: cleanText , profile: id}),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        alert(errorResponse?.error);
      } else {
        const data = await response.json();

        setresult(data.result.story);
        settitle(data.result.title);
      }
    } catch (err: any) {
      alert('Failed to process your request');
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDF = async () => {
    setIsLoading(true);
    try {
      const profile =  await localStorage.getItem('profile') || '';
      const id = JSON.parse(profile)  || {
        id :"abcs",
        name :"abcs",
        age:2,
        gender:"male"
      }
      const token = await localStorage.getItem('token') || '';
      const response = await fetch('/api/storybook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ story: result, title: title, profile: id,token:token }),
      });
      // redirect to dashboard
      setIsLoading(false);
      window.location.href = '/dashboard';
    } catch (err) {
      console.log(err);
      alert('Failed to process your request');
    }
  };

  return (
    <div
      className="custom-scrollbar overflow-auto"
      style={{ minWidth: '100%', marginTop: '170px' }}
    >
      <Center style={{ flexDirection: 'column' }}>
        <EditorContent
          editor={editor}
          style={{ minWidth: '50%', backgroundColor: '#FFF' }}
        />
        <ButtonPrimary
          type="button"
          addClass="mt-8 px-6 py-3 transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={generateStory}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingDots color="white" style="large" />
          ) : (
            'Generate Story'
          )}
        </ButtonPrimary>
        <div className="text-title mt-5">{title}</div>
        <div className="text-title mt-5 px-10" style={{ width: '70%' }}>
          {result}
        </div>
        {result && (
          <ButtonPrimary
            type="button"
            addClass="mt-5 px-6 py-3 transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400 mb-5"
            onClick={generatePDF}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingDots color="white" style="large" />
            ) : (
              'Generate PDF'
            )}
          </ButtonPrimary>
        )}
      </Center>
    </div>
  );
};

export default StoryEditor;
