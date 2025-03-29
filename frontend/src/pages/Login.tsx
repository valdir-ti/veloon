import { Link } from 'react-router'
import logo from '../assets/Logo_Veloon_v1_02.png'

function Login() {
  return (
    <main className='flex min-h-screen flex-col justify-center px-6 py-8 lg:px-8'>
      <div className="flex flex-col items-center justify-center gap-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <img src={logo} alt="Veloon" width={156} />
        <h2 className='text-black text-2xl'>Faça seu login</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="" className='flex flex-col gap-6 mb-8'>

          <div className='flex flex-col items-start'>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id='email'
              placeholder='Digite o seu email'
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#8106AC] sm:text-sm/6"
            />
          </div>

          <div className='flex flex-col items-start'>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id='password'
              placeholder='Digite o seu password'
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#8106AC] sm:text-sm/6"
            />
          </div>

          <div>
            <button className='btn-primary w-full px-4 py-2'>Entrar</button>
          </div>
        </form>
        <Link to='/registro'>Registre-se</Link>
      </div>
    </main>
  )
}

export default Login
