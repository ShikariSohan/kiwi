'use client';

import { useRef, useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Confetti from 'react-dom-confetti';

import LoadingDots from '../LoadingDots';
import { DiffMatchPatch } from 'diff-match-patch-ts';
import ButtonPrimary from '../misc/ButtonPrimary';
import { Center } from '@mantine/core';
import { Card } from 'flowbite-react';
import { Alert } from '@mantine/core';

const defaultContent = `<p>Helo Kiwis! Run dis to know how it work! Write somethin!</p>`;

const ContentEditor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setresult] = useState('');
  const [AlertText, setAlertText] = useState('Something went wrong!');
  const [alert, setAlert] = useState(false);

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
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = () => {
    setShowConfetti(true);
    // hide after 3 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  const config = {
    angle: '155',
    spread: 360,
    startVelocity: '30',
    elementCount: '121',
    dragFriction: '0.07',
    duration: '7360',
    stagger: '3',
    width: '29px',
    height: '10px',
    perspective: '500px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };
  const [show, setShow] = useState(false);
  const checkGrammar = async () => {
    const cleanText = editor?.getText();
    setAlert(false);
    setShow(false);
    if (!cleanText) {
      console.log('content is missing: ', cleanText);
      setAlert(true);
      setAlertText('Content is missing!');
      return;
    }

    // max word limit
    if (cleanText.split(' ')?.length > 800) {
      setAlert(true);
      setAlertText('Max word limit is 800!');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/grammar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: cleanText }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setAlert(true);
        setAlertText('Failed to process your request!');
      } else {
        const data = await response.json();
        setresult(data.result.corrections);
        if (matchString(data.result.corrections, cleanText)) {
          handleClick();
        } else {
          setShow(true);
        }
      }
    } catch (err: any) {
      console.log(err);
      setAlert(true);
      setAlertText('Failed to process your request!');
    } finally {
      setIsLoading(false);
    }
  };
  const diffChecker = (resp: string) => {
    const text1 = editor?.getText() || '';
    const text2 = resp;

    const dmp = new DiffMatchPatch();
    const diff = dmp.diff_main(text1, text2);
    dmp.diff_cleanupSemantic(diff);
    let result = '';
    for (const [op, text] of diff) {
      if (op === 0) {
        result += text;
      } else if (op === 1) {
        result += `<span style="color: red">${text}</span>`;
      }
    }
    return result;
  };

  return (
    <div
      className="custom-scrollbar my-8 overflow-auto pt-20"
      style={{ maxHeight: '90%' }}
    >
      <Center style={{ flexDirection: 'column' }}>
        <EditorContent editor={editor} style={{ minWidth: '70vw' }} />
        <ButtonPrimary
          type="button"
          addClass="mt-8 px-6 py-3 transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={checkGrammar}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingDots color="white" style="large" />
          ) : (
            'Check My Grammar'
          )}
        </ButtonPrimary>
        {show && (
          <Card className="mt-2" style={{ backgroundColor: 'white' }}>
            <Center style={{ flexDirection: 'column' }}>
              <h1 className="text-title mb-3">Corrected Text </h1>
              <div
                dangerouslySetInnerHTML={{ __html: diffChecker(result) }}
              ></div>
            </Center>
          </Card>
        )}
        <div>
          <Confetti active={showConfetti} config={config} />
        </div>
      </Center>
      {alert && (
        <Alert
          title="Bummer!"
          color="red"
          withCloseButton
          sx={{
            marginLeft: '10%',
            top: '15%',
            position: 'fixed',
            width: '30%',
            right: '5%',
          }}
          onClose={() => setAlert(false)}
        >
          {AlertText}
        </Alert>
      )}
    </div>
  );
};

function matchString(x: string, y: string) {
  // remove all spaces and newlines from both strings beginning and end
  x = x.trim().replace(/\s/g, '');
  y = y.trim().replace(/\s/g, '');
  console.log(x, y);
  return x === y;
}

export default ContentEditor;
