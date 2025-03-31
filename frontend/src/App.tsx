import { ChangeEvent, FormEvent, useState } from 'react'

import './App.css'
import { API_URL } from './utils/apiUrl'
import { useNavigate } from 'react-router'
import { useAuthCheck } from './hooks/useAuthCheck'

interface FormData {
  numero1: string
  numero2: string
}

interface ApiResponse {
  error?: string;
  newHistory?: {
    createdAt: string
    id: number
    numero1: string
    numero2: string
    resultado: boolean
    userId: number
  }
}

function App() {
  useAuthCheck();
  const navigate = useNavigate()
  const token = localStorage.getItem('authToken')
  const [formData, setFormData] = useState<FormData>({
    numero1: '',
    numero2: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [areSiamese, setAreSiamese] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }))
  }

  const handleCloseError = () => {
    setError('')
    setFormData({
      numero1: '',
      numero2: ''
    })
  }
  const handleCloseSuccess = () => {
    setSuccess('')
    setFormData({
      numero1: '',
      numero2: ''
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.numero1 || !formData.numero2) {
      setError('Os dois números devem ser informados')
      setSuccess('')
      setLoading(false)
      return
    }
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/irmaos-siameses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          numero1: +formData.numero1,
          numero2: +formData.numero2
        }),
      })

      const data: ApiResponse = await response.json()

      if (!data) {
        setError('Erro ao fazer a verificação')
      }

      if (data.error === 'Invalid or expired token') {
        localStorage.removeItem('authToken')
        navigate('/login')
      }

      if (data.error) {
        setError(data.error)
      } else {
        const resultado = data.newHistory?.resultado ?? false
        setSuccess('ok')
        setAreSiamese(resultado)
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao processar sua solicitação');
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='px-6 md:px-0 flex flex-1 flex-col'>
      <h1 className='text-4xl font-bold mb-8'>Irmãos Siameses</h1>
      <h4 className='text-1xl font-bold'>Verifique se os números a seguir são irmãos siameses</h4>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 mb-8'>

          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
              <div className='absolute right-4 cursor-pointer' onClick={() => handleCloseError()}>X</div>
              {error}
            </div>
          )}

          {success && (
            <>
              <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'>
                <div className='absolute right-4 cursor-pointer' onClick={() => handleCloseSuccess()}>X</div>
                Verificação concluída!
              </div>
              <div>
                São siameses? {areSiamese ? <h2 className='text-green-500 font-bold text-2xl'>Sim</h2> : <h2 className='text-red-500 font-bold text-2xl'>Não</h2>}
              </div>
            </>
          )}

          <div className='flex flex-col items-start'>
            <label
              htmlFor='numero1'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Primeiro número
            </label>
            <input
              type='text'
              id='numero1'
              value={formData.numero1}
              onChange={handleChange}
              autoComplete='off'
              placeholder='Digite o primeiro número'
              className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#8106AC] sm:text-sm/6'
            />
          </div>

          <div className='flex flex-col items-start'>
            <label
              htmlFor='numero2'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Segundo número
            </label>
            <input
              type='text'
              id='numero2'
              value={formData.numero2}
              onChange={handleChange}
              autoComplete='off'
              placeholder='Digite o segundo número'
              className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#8106AC] sm:text-sm/6'
            />
          </div>

          <div>
            <button className='btn-primary w-full px-4 py-2' disabled={loading}>{loading ? 'Verificando...' : 'Verificar'}</button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default App
