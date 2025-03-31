import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router'
import logo from '../assets/Logo_Veloon_v1_02.png'
import { API_URL } from '../utils/apiUrl';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token?: string;
  user?: {
    id: string;
    email: string;
  };
  message?: string;
}

function Login() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha na autenticação');
      }

      if (data.token) {
        localStorage.setItem('authToken', data.token);

        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        navigate('/');
      } else {
        throw new Error('Token não recebido');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex min-h-screen flex-col justify-center px-6 py-8 lg:px-8'>
      <div className='flex flex-col items-center justify-center gap-8 sm:mx-auto sm:w-full sm:max-w-sm'>
        <img src={logo} alt='Veloon' width={156} />
        <h2 className='text-black text-2xl'>Faça seu login</h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 mb-8'>

          {error && (
            <div className='mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
              {error}
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
              value={credentials.email}
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
              value={credentials.password}
              onChange={handleChange}
              placeholder='Digite o seu password'
              className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#8106AC] sm:text-sm/6'
            />
          </div>

          <div>
            <button className='btn-primary w-full px-4 py-2' disabled={loading}>{loading ? 'Processando...' : 'Entrar'}</button>
          </div>
        </form>
        <Link to='/registro'>Registre-se</Link>
      </div>
    </main>
  )
}

export default Login
