import React, { useEffect, useState, useContext } from 'react';
import { BeatLoader } from 'react-spinners';
import ThemeContext from '../../contexts/ThemeContext';

function Loading() {
  const { theme } = useContext(ThemeContext);
  const [loaderColor, setLoaderColor] = useState(theme === 'light' ? '#000' : '#fff');

  useEffect(() => {
    setLoaderColor(theme === 'light' ? '#000' : '#fff');
  }, [theme]);

  return (
    <div className='animation-loader'>
      <BeatLoader color={loaderColor} />
    </div>
  );
}

export default Loading;
