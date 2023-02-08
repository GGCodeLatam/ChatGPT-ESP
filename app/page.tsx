import { SunIcon, BoltIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white px-2">
        <h1 className="text-5xl font-bold mb-20">Chat GPT GG</h1>
        <div className='flex space-x-2 text-center'>
            <div>
                <div className="flex flex-col items-center justify-center mb-5">
                    {/* Sun Icon */}
                    <SunIcon className="h-8 w-8"/>
                    <h2>Ejemplos</h2>
                </div>

                <div className="space-y-2">
                    <p className="infoText">"Expliacame fisica cuantica de una manera sencilla"</p>
                    <p className="infoText">"¿Cual es la diferencia entre un impuesto y un servicio?"</p>
                    <p className="infoText">"¿Como puedo hacer un contador con javascript?"</p>
                </div>
            </div>
            <div>
                <div className="flex flex-col items-center justify-center mb-5">
                    {/* Sun Icon */}
                    <BoltIcon className="h-8 w-8"/>
                    <h2>Capacidades</h2>
                </div>

                <div className="space-y-2">
                    <p className="infoText">Puedes cambiar a cualquier modelo de chat GPT</p>
                    <p className="infoText">Los mensajes se guardan en tu cuenta</p>
                    <p className="infoText">Notificaciones mientras el modelo esta pensando!</p>
                </div>
            </div>
            <div>
                <div className="flex flex-col items-center justify-center mb-5">
                    {/* Sun Icon */}
                    <ExclamationTriangleIcon className="h-8 w-8"/>
                    <h2>Limitaciones</h2>
                </div>

                <div className="space-y-2">
                    <p className="infoText">A veces puede generar información erronea</p>
                    <p className="infoText">Ocasionalmente puede producir contenido sesgado</p>
                    <p className="infoText">Conocimiento limitado del mundo después de 2021</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage