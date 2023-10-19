import { DefaultNavbar } from '../components';

export const CommonLayout = ({ children }) => {
  return (
    <>
      <DefaultNavbar />
      <main>{children}</main>
    </>
  );
};
