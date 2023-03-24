"use client"
import React, { useState, useEffect } from 'react';

import { MicrophoneIcon } from "@heroicons/react/24/solid";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const SpeechRecognition: typeof window.SpeechRecognition =
  window?.SpeechRecognition || window?.webkitSpeechRecognition;

const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'es-ES';

interface ISpeechRecognitionEvent extends Event {
  results: {
    transcript: string;
    confidence: number;
  }[];
}

interface ISpeechToTextProps {
  onExport: (transcription: string) => any;
}

const SpeechToText: React.FC<ISpeechToTextProps> = ({ onExport }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [exportedTranscription, setExportedTranscription] = useState<string | null>(null);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = (): any => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log('continue..');
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log('Stopped Mic on Click');
      };
    }
    mic.onstart = () => {
      console.log('Mics on');
    };

    mic.onresult = (event: ISpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result: unknown) => (result as SpeechRecognitionResult)[0])
        .map((result: any) => result.transcript)
        .join('');
      console.log(transcript);
      setTranscription(transcript);
    };

    mic.onerror = (event: { error: any }) => {
      console.log(event.error);
    };
  };

  const handleExportTranscription = async (): Promise<void> => {
    if (transcription) {
      setExportedTranscription(transcription);
      onExport(transcription);
    }
  };

  return (
    <>
      <div className="container mx-auto my-8">
        <div className="bg-gray-900 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center mb-4 gap-4">
            {isListening ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
              </svg>

            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>

            )}

            <button className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded mr-4" onClick={() => setIsListening((prevState) => !prevState)}>
              Empezar/Parar grabación
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
              </svg>
            <button className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded" onClick={handleExportTranscription} disabled={!transcription}>
              Exportar transcripción
            </button>
          </div>

          <p className="text-gray-400">{transcription}</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 max-w-md mx-auto mt-8">
          <h2 className="text-gray-400 mb-4">Transcripción exportada:</h2>

          {exportedTranscription ? (
            <div>
              <p className="text-gray-400 mb-4">{exportedTranscription}</p>
              <button className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded" onClick={() => setExportedTranscription(null)}>Clear</button>
            </div>
          ) : (
            <p className="text-orange-400">Aun no se han exportado transcripciones.</p>
          )}
        </div>
      </div>

    </>
  );
};

export default SpeechToText;