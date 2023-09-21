import { Group } from '@mantine/core';
import { Message } from '../../types';
import { IconArrowUp, IconMicrophone } from '@tabler/icons-react';
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
interface Props {
  onSend: (message: Message) => void;
}

export const ChatInput: FC<Props> = ({ onSend }) => {
  const [content, setContent] = useState<string>();
  const [listen, setListen] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const microphoneRef = useRef(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 4000) {
      alert('Message limit is 4000 characters');
      return;
    }

    setContent(value);
  };

  const handleSend = () => {
    if (!content) {
      alert('Please enter a message');
      return;
    }
    onSend({ role: 'user', content });
    setContent('');
  };
  const handleListen = () => {
    if (!listen) {
      setListen(true);
      microphoneRef.current.classList.add('listening');
      SpeechRecognition.startListening({
        continuous: true,
      });
    } else {
      setListen(false);
      console.log({ transcript });
      setContent(transcript);
      microphoneRef.current.classList.remove('listening');
      SpeechRecognition.stopListening();
      resetTranscript();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        className="min-h-[44px] rounded-lg pl-4 pr-12 py-2 w-full input-border-color"
        style={{ resize: 'none' }}
        placeholder="Type a message..."
        value={content}
        rows={1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Group style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <button onClick={handleListen}>
          <IconMicrophone
            ref={microphoneRef}
            className={`absolute right-12 bottom-3 h-8 w-8 hover:cursor-pointer rounded-full p-1 text-white hover:opacity-80 ${
              !listen ? 'icon-button' : 'icon-button-clicked'
            } `}
          />
        </button>

        <button onClick={() => handleSend()}>
          <IconArrowUp
            className={`absolute right-3 bottom-3 h-8 w-8 hover:cursor-pointer rounded-full p-1 text-white hover:opacity-80 ${
              !listen ? 'icon-button' : 'icon-button-clicked'
            } `}
          />
        </button>
      </Group>
    </div>
  );
};
