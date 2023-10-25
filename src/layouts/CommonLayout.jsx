import { DefaultNavbar, Toast } from '../components';

export const CommonLayout = ({ children }) => {
  return (
    <>
      <DefaultNavbar />
      <Toast />
      <main>{children}</main>
    </>
  );
};
