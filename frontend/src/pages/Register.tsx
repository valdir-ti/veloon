import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import logo from '../assets/Logo_Veloon_v1_02.png'
import { API_URL } from '../utils/apiUrl';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}
interface ApiResponse {
  id?: string;
  message?: string;
}

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar usuário');
      }

      setSuccess('ok');
      setCountdown(4);
      setFormData({
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao processar sua solicitação');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let timer: number | undefined;

    if (success && countdown !== null) {
      if (countdown <= 0) {
        navigate('/login');
      } else {
        timer = window.setTimeout(() => {
          setCountdown(prev => (prev !== null ? prev - 1 : null));
        }, 1000);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [success, countdown, navigate]);

  return (
    <main className='flex min-h-screen flex-col justify-center px-6 py-8 lg:px-8'>
      <div className='flex flex-col items-center justify-center gap-8 sm:mx-auto sm:w-full sm:max-w-sm'>
        <img src={logo} alt='Veloon' width={156} />
        <h2 className='text-black text-2xl'>Registre-se</h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 mb-8'>
          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
              {error}
            </div>
          )}

          {success && (
            <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded'>
              Usuário criado com sucesso! Redirecionando para a página de login em {countdown} segundos...
            </div>
          )}

          <div className='flex flex-col items-start'>
            <label
              htmlFor='email'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Digite o seu email'
              className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#8106AC] sm:text-sm/6'
            />
          </div>

          <div className='flex flex-col items-start'>
            <label
              htmlFor='password'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Digite o seu password'
              className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#8106AC] sm:text-sm/6'
            />
          </div>

          <div className='flex flex-col items-start'>
            <label
              htmlFor='confirmPassword'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Confirmar Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Confirme o password'
              className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#8106AC] sm:text-sm/6'
            />
          </div>

          <div>
            <button className='btn-primary w-full px-4 py-2' disabled={loading}>{loading ? 'Processando...' : 'Entrar'}</button>
          </div>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </main>
  )
}

export default Register
