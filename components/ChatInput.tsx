"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";
import ChatRecord from "./ChatRecord";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [exportedTranscription, setExportedTranscription] = useState<string | null>(null);

  const handleTranscriptionExported = (transcription: string) => {
    setExportedTranscription(transcription);
  };

  const [userInput, setUserInput] = useState('');
  const [prompt, setPrompt] = useState<string>("");
  const { data: session } = useSession();

  // useSWR to get the model
  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });



  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };
    const handleSubmit = (e: any) => {
      e.preventDefault();
      const finalPrompt = exportedTranscription ? preprompt + exportedTranscription + prepregunta + userInput : pregunta1;
      // Lógica para enviar el formulario con el prompt final
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    // Toast notification to say thinking!
    const notification = toast.loading("ChatGPT is thinking!");
    // Toast notifications
    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // Toast notification to say successfully!
      toast.success("ChatGPT has responded!", {
        id: notification,
      });
    });
  };
  console.log(exportedTranscription)


  const preprompt = "A continuación, te muestro el texto de una grabación para que luego contestes una pregunta sobre el mismo, la grabacion es esta: '"
  const prepregunta = " Ahora, la pregunta a responder sobre la grabación anterior es: "
  const pregunta1 = "' Cual es el foco de lo que intenta expresar esta grabación? "
  const pregunta2 = "' En la grabación que sentimientos y / o emociones se pueden sentir? "
  const pregunta3 = "' Segun los escritos de Freud, que se puede observar en lo dicho en esta grabación? "
  const pregunta4 = " ' Segun la psicología moderna, que se podría analizar de esta grabación?"


  return (
<div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm" style={{ maxHeight: 'calc(33vh)' , overflowY: 'auto' }}>
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex justify-center items-center">
        <div className="justify-start">
          <ChatRecord onExport={handleTranscriptionExported} />
        </div>
        <div className="flex flex-col gap-1">
          <button
            className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded h-10"
            value={exportedTranscription?.toString()}
            onClick={() => setPrompt(exportedTranscription ? preprompt + exportedTranscription + prepregunta + pregunta1 : pregunta1)}
          >
            De qué habla?
          </button>
          <button
            className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded h-10"
            value={exportedTranscription?.toString()}
            onClick={() => setPrompt(exportedTranscription ? preprompt + exportedTranscription + prepregunta + pregunta2 : pregunta2)}
          >
            Sentimientos / Emociones
          </button>
          <button
            className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded h-10"
            value={exportedTranscription?.toString()}
            onClick={() => setPrompt(exportedTranscription ? preprompt + exportedTranscription + prepregunta + pregunta3 : pregunta3)}
          >
            Psicoanalisis
          </button>
          <button
            className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded h-10"
            value={exportedTranscription?.toString()}
            onClick={() => setPrompt(exportedTranscription ? preprompt + exportedTranscription + prepregunta + pregunta4 : pregunta4)}
          >
            Psicologia moderna
          </button>
        </div>
        <input
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          type="text"
          placeholder="Formula tu propia pregunta sobre la grabación aquí..."
          enterKeyHint="enter"
        />
        <button
          className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded h-10"
          value={exportedTranscription?.toString()}
          onClick={() => setPrompt(exportedTranscription ? preprompt + exportedTranscription + prepregunta + userInput : pregunta4)}
        >
          Pregunta personalizada
        </button>
{/*         <button
          disabled={!prompt || !session}
          type="submit"
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold 
          px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button> */}
      </form>

      {/* ModelSelection */}
      <div className="hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;