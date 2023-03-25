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
  const [manualTranscription, setManualTranscription] = useState<string | null>(null);
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
  console.log(manualTranscription)


  const preprompt = "Asistente, quisiera que analises esta transcripción a texto de una grabación donde se narra un sueño: '"
  const prepregunta = "' Segun la transcripción del sueño que te acabo de mostrar, porfavor responde lo siguiente: "
  const pregunta1 = "' Segun los escritos de Sigmund Freud, ¿Cuáles son los elementos de este sueño y cómo se relacionan entre sí? ¿Cuál es el contenido latente del sueño? "
  const pregunta2 = "' Segun los escritos de Carl Jung ¿Cuáles son los arquetipos presentes en este sueño? ¿Cuál es el mensaje del sueño para la totalidad de la psique?"
  const pregunta3 = "' Segun los escritos de Fritz Perls, ¿Cuáles son los diferentes elementos de este sueño y cómo se relacionan entre sí? ¿Qué partes del yo están representadas en el sueño y cómo se relacionan entre sí?"
  const pregunta4 = " ' Segun los escritos de Allan Hobson,¿Cuáles son los elementos aleatorios y desconectados del sueño y cómo pueden estar relacionados con la actividad cerebral subyacente? ¿Cómo se relaciona el contenido del sueño con la actividad cerebral y cómo puede ser utilizado para comprender mejor la forma en que el cerebro procesa la información?"
  const pregunta5 = " ' Segun los escritos de Rosalind Cartwright, Mark Solms y Antonio Zadra, ¿Qué eventos emocionales o psicológicos están asociados con los elementos de este sueño? ¿Cuál es el contexto de la vida del soñador?"

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm" style={{ maxHeight: 'calc(33vh)', overflowY: 'auto' }}>
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex justify-center items-center">
        <div className="justify-start">
          <ChatRecord onExport={handleTranscriptionExported} />
        </div>
        <div className="flex flex-col gap-3 w-1/3 min-h-full flex-1">
          <textarea
            className="bg-white rounded-xl p-14 focus:outline-none flex-1 h-full disabled:cursor-not-allowed text-black disabled:text-gray-300"
            disabled={!session}
            onChange={(e) => setManualTranscription(e.target.value)}
            placeholder="Escribir el sueño manualmente:"
          />
          <button
            className="inline-flex items-center justify-center text-lg font-thin space-x-2 bg-gray-900 hover:bg-gray-800 text-white py-4 px-4 rounded-md h-10"
            value={exportedTranscription?.toString()}
            onClick={() => setExportedTranscription(manualTranscription)}
          >
            <span>Ingresar sueño manualmente</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white font-light text-xl">Selecciona el tipo de analisis:</p>
          <button
            className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded h-10"
            value={exportedTranscription?.toString()}
            onClick={() => setPrompt(exportedTranscription ? preprompt + exportedTranscription + prepregunta + pregunta1 : pregunta1)}
          >
            Psicoanalisis
          </button>
          <button
            className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded h-10"
            value={exportedTranscription?.toString()}
            onClick={() => setPrompt(exportedTranscription ? preprompt + exportedTranscription + prepregunta + pregunta2 : pregunta2)}
          >
            Carl Jung
          </button>
          <button
            className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded h-10"
            value={exportedTranscription?.toString()}
            onClick={() => setPrompt(exportedTranscription ? preprompt + exportedTranscription + prepregunta + pregunta3 : pregunta3)}
          >
            Gestalt
          </button>
          <button
            className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded h-10"
            value={exportedTranscription?.toString()}
            onClick={() => setPrompt(exportedTranscription ? preprompt + exportedTranscription + prepregunta + pregunta4 : pregunta4)}
          >
            Activación - Síntesis
          </button>
          <button
            className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded h-10"
            value={exportedTranscription?.toString()}
            onClick={() => setPrompt(exportedTranscription ? preprompt + exportedTranscription + prepregunta + pregunta5 : pregunta4)}
          >
            Teoria Cognitiva
          </button>
        </div>
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