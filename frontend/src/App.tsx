import './App.css'

function App() {
  return (
    <main className='h-full'>
      <h1 className="text-4xl font-bold mb-8">Irmãos Siameses</h1>
      <h4 className="text-1xl font-bold">Verifique se os números a seguir são irmãos siameses</h4>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="" className='flex flex-col gap-6 mb-8'>

          <div className='flex flex-col items-start'>
            <label
              htmlFor="numero1"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Primeiro número
            </label>
            <input
              type="text"
              id='numero1'
              placeholder='Digite o primeiro número'
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-[#8106AC] sm:text-sm/6"
            />
          </div>

          <div className='flex flex-col items-start'>
            <label
              htmlFor="numero2"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Segundo número
            </label>
            <input
              type="text"
              id='numero2'
              placeholder='Digite o segundo número'
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-[#8106AC] sm:text-sm/6"
            />
          </div>

          <div>
            <button className='btn-primary w-full px-4 py-2'>Verificar</button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default App
