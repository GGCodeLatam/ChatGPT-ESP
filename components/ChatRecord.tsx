import React, { useState, useEffect } from 'react';

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

interface ISpeechToTextProps { }

const SpeechToText: React.FC<ISpeechToTextProps> = () => {
    const [isListening, setIsListening] = useState(false);
    const [note, setNote] = useState<string | null>(null);
    const [savedNotes, setSavedNotes] = useState<string[]>([]);

    useEffect(() => {
        handleListen();
    }, [isListening]);

    const handleListen = (): void => {
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
            setNote(transcript);
        };

        mic.onerror = (event: { error: any; }) => {
            console.log(event.error);
        };
    };

    const handleSaveNote = (): void => {
        if (note) {
            setSavedNotes([...savedNotes, note]);
            setNote(null);
        }
    };

    return (
        <>
            <h1>Voice Notes</h1>
            <div className="container">
                <div className="box">
                    <h2>Current Note</h2>
                    {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
                    <button onClick={handleSaveNote} disabled={!note}>
                        Save Note
                    </button>
                    <button onClick={() => setIsListening(prevState => !prevState)}>
                        Start/Stop
                    </button>
                    <p>{note}</p>
                </div>
                <div className="box">
                    <h2>Notes</h2>
                    {savedNotes.map(n => (
                        <p key={n}>{n}</p>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SpeechToText;