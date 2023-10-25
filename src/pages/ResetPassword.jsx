import { Link, useNavigate } from 'react-router-dom';
import { reset } from '../api';
import { useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';

export const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const query = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  useEffect(() => {
    if (!query.get('key')) {
      navigate('/');
    }
  }, [navigate, query]);
  const handleReset = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const res = await reset({
        key: formData.get('key'),
        password1: formData.get('password1'),
        password2: formData.get('password2'),
      });
      if (res?.status !== 200) {
        console.log(res);
        return;
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
              Reset Password
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleReset}>
              <div>
                <input type='hidden' name='key' value={query.get('key')} />
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  New Password
                </label>
                <input
                  disabled={loading}
                  type='password'
                  name='password1'
                  id='password'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='••••••••'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='password2'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Confirm Password
                </label>
                <input
                  disabled={loading}
                  type='password'
                  name='password2'
                  id='password2'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='••••••••'
                  required
                />
              </div>
              <button
                disabled={loading}
                type='submit'
                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                {loading && (
                  <Spinner aria-label='Filter Attendance' size='sm' />
                )}
                <span className={loading ? 'pl-3' : null}>Update Password</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
