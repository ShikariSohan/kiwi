'use client';

import { useRef, useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import LoadingDots from '../LoadingDots';
import { title } from 'process';

const defaultContent = `<p>Biology is a really unique scient to study. There are alott of different aspects to it, such as ecology, genetics, and physiology. One of the most interesitng things to learn about in biology is animals and the way they behave. For example, did you know that some birds give hugs to their babies to keep them warm? That's so cute!</p>

<p>Another important aspect of biology is understanding the structure and function of different living things. Cells are the basic building blocks of all living organisms, and they are responsible for carrying out all of the processes necessary for life. Studying the biology of cells is important for understanding everything from how the body works to how diseases develop.</p>`;

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
      const response = await fetch('/api/story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: cleanText }),
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
    const response = await fetch('/api/storybook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ story: result, title: title }),
    });
    console.log({ response });
  };

  return (
    <div className="my-8">
      <EditorContent editor={editor} />
      <button
        type="button"
        className="mt-8 rounded-md bg-black px-6 py-3 text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400"
        onClick={generateStory}
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadingDots color="white" style="large" />
        ) : (
          'Generate Story'
        )}
      </button>
      <h1>{title}</h1>
      <div>{result}</div>
      {result && (
        <button
          type="button"
          className="mt-8 rounded-md bg-black px-6 py-3 text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={generatePDF}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingDots color="white" style="large" />
          ) : (
            'Generate PDF'
          )}
        </button>
      )}
    </div>
  );
};

export default StoryEditor;
