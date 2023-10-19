import { Button } from 'flowbite-react';
import { useEffect } from 'react';

export const GetApp = () => {
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (ev) => {
      // Stop Chrome from asking _now_
      ev.preventDefault();

      // Create your custom "add to home screen" button here if needed.
      // Keep in mind that this event may be called multiple times,
      // so avoid creating multiple buttons!
      document.getElementById('install').onclick = () => ev.prompt();
    });
  }, []);
  return <Button id='install'>Install</Button>;
};
