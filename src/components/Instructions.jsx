import { useState } from "react"

export default function Instructions({ close}) {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        {!isOpen && (
          <button
            className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 cursor-pointer rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            ?
          </button>
        )}

        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-2xl"> ¡Bienvenid@ a Wordlu!</h2>
              <h3 className="text-xl font-bold mb-4">Instrucciones</h3>
              <p className="mb-4">Adivina la palabra oculta en 6 intentos.</p>
              <p className="mb-4">
                - Cada intento debe ser una palabra válida de 5 letras.
              </p>
              <p className="mb-4">
                - Las letras correctas en la posición correcta se resaltarán en
                verde.
              </p>
              <p className="mb-4">
                - Las letras que forman parte de la palabra pero en la posición
                incorrecta se resaltarán en amarillo.
              </p>
              <p className="mb-4">
                - Las letras que no aparecen en la palabra se resaltarán en
                gris.
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors "
                onClick={() => {
                  setIsOpen(false);
                  close();
                }}
              >
                Jugar
              </button>
            </div>
          </div>
        )}
      </>
    );
}