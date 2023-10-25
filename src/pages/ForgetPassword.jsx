import { Link } from 'react-router-dom';
import { forget } from '../api';
import { Spinner } from 'flowbite-react';
import { useState } from 'react';
import { Toast } from '../components';
import { useToastState } from '../context';

export const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useToastState();
  const handleForget = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const res = await forget({
        email: formData.get('email'),
      });
      if (res?.status !== 200) {
        dispatch({ type: 'ERROR', payload: res?.message });
        return;
      } else {
        dispatch({ type: 'SUCCESS', payload: res?.message });
      }
      document.getElementById('forget-form').reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Toast />
      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <Link
            to='/login'
            className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
          >
            <img
              className='w-8 h-8 mr-2 rounded-md'
              src='/logo.jpg'
              alt='logo'
            />
            AMS - ConsoleDot
          </Link>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Reset Account Password
              </h1>
              <form
                id='forget-form'
                className='space-y-4 md:space-y-6'
                onSubmit={handleForget}
              >
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Email
                  </label>
                  <input
                    disabled={loading}
                    type='email'
                    name='email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='email@consoledot.com'
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
                  disabled={loading}
                  type='submit'
                  className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  {loading && (
                    <Spinner aria-label='Filter Attendance' size='sm' />
                  )}
                  <span className={loading ? 'pl-3' : null}>
                    Send reset link
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
