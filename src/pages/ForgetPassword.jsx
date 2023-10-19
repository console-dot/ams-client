import { Link } from 'react-router-dom';
import { login } from '../api';

export const ForgetPassword = () => {
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await login({
      username: formData.get('username'),
      password: formData.get('password'),
    });
    if (res?.status !== 200) {
      console.log(res);
      return;
    }
    localStorage.setItem('@token', res?.data?.token);
    localStorage.setItem('@user', JSON.stringify(res?.data?.employeeExist));
  };
  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <Link
          to='/login'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
        >
          <img className='w-8 h-8 mr-2 rounded-md' src='/logo.jpg' alt='logo' />
          AMS - ConsoleDot
        </Link>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Reset Account Password
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleLogin}>
              <div>
                <label
                  for='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Email or ID
                </label>
                <input
                  type='text'
                  name='username'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='email@consoledot.com or AA-AAA-0000'
                  required
                />
              </div>
              <div className='flex items-center justify-between'>
                <Link
                  to='/login'
                  className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Back to login
                </Link>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Send reset link
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
