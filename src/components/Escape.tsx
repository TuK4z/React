import { useEffect } from 'react';
import Esc from '../assets/esc_button.svg';

const closeWindow = () => {
  //console.log("Uždarome UI");
  if ("alt" in window) alt.emit("WebView:Close");
};

const SignatureEsc = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeWindow();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="absolute right-8 top-8">
      <div className="flex items-center" onClick={closeWindow}>
        <img className="h-14" src={Esc} alt="esc" />
      </div>
    </div>
  );
};

export default SignatureEsc;