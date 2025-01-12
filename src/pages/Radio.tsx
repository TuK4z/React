import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Signature from '../components/Signature';
import Escape from '../components/Escape';

import PowerLogo from '../assets/radio/pwr.svg';
import RCLogo from '../assets/radio/rc.png';
import ZipLogo from '../assets/radio/zip.png';
import RusLogo from '../assets/radio/rus.png';
import PowerGoldLogo from '../assets/radio/pwrgold.svg';
import RelaxLogo from '../assets/radio/relax.png';
import GoldLogo from '../assets/radio/gold.png';
import TurnOff from '../assets/radio/switch.png';

interface RadioStation {
  Id: number;
  Name: string;
  Image: string;
  Link: string;
}

export default function Radio() {
  const [volume, setVolume] = useState(0.5);
  const volumeAdjusted = useRef(false); // Track manual adjustments
  const radius = 300;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const encodedJson = searchParams.get('data');
  const jsonData = encodedJson
    ? JSON.parse(encodedJson)
    : {
        PlayerData: { Volume: 0.5 },
        Stations: [],
      };

  useEffect(() => {
    if (!volumeAdjusted.current && jsonData?.PlayerData?.Volume !== undefined) {
      setVolume(jsonData.PlayerData.Volume);
    }
  }, [jsonData]);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    volumeAdjusted.current = true; // Mark volume as adjusted manually
    if ('alt' in window) alt.emit('Radio:SetRadioVolume', newVolume);
  };

  const radioStations: RadioStation[] = [
    { Id: 1, Name: 'Power Hit Radio', Image: PowerLogo, Link: 'https://stream.powerhitradio.lt/PHR_AAC' },
    { Id: 2, Name: 'Radio centras', Image: RCLogo, Link: 'https://stream2.rc.lt/rc128.mp3' },
    { Id: 3, Name: 'ZIP FM', Image: ZipLogo, Link: 'https://stream2.zipfm.lt/zipfm128.mp3' },
    { Id: 4, Name: 'RusRadio', Image: RusLogo, Link: 'https://stream2.rusradio.lt/rrb128.mp3' },
    { Id: 5, Name: 'Power Gold', Image: PowerGoldLogo, Link: 'https://powerhitradio.tv3.lt/PHR_GOLD_AAC' },
    { Id: 7, Name: 'Relax FM', Image: RelaxLogo, Link: 'https://stream1.relaxfm.lt/relaxfm128.mp3' },
    { Id: 8, Name: 'Gold FM', Image: GoldLogo, Link: 'http://82.135.234.195:8000/goldfm.mp3' },
  ];

  const calculatePosition = (id: number) => {
    const angle = (id / radioStations.length) * 2 * Math.PI;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
  };

  const handleRadio = (station: RadioStation) => {
    if ('alt' in window) alt.emit('Radio:SetRadioStation', station.Id, volume);
  };

  const TrunOffRadio = () => {
    if ('alt' in window) alt.emit('Radio:SetRadioStation', 0, volume);
  };

  return (
    <div className="h-screen bg-custom-gradient">
      <div className="bg-[#0e041c90] h-screen flex items-center justify-center">
        <Signature />
        <Escape />
        <div className="relative flex flex-col justify-center items-center">
          <div className="absolute rounded-full w-32 h-32 flex justify-center items-center text-black z-10" onClick={TrunOffRadio}>
            <img className="h-14" src={TurnOff} alt="Turn Off" />
          </div>

          <div className="relative flex justify-center items-center" style={{ width: radius * 2, height: radius * 2 }}>
            {radioStations.map((station, index) => {
              const { x, y } = calculatePosition(index);
              return (
                <div
                  key={station.Id}
                  className="absolute rounded-full w-32 h-32 flex justify-center items-center text-black"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  onClick={() => handleRadio(station)}
                >
                  <img className="h-14" src={station.Image} alt={station.Name} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-0 mb-12 w-2/5 z-10">
          <input
            type="range"
            tabIndex={-1}
            value={volume}
            min="0.0"
            max="1.0"
            step="0.1"
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
            onChange={handleVolumeChange}
          />
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">0%</span>
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
            {volume * 100} %
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">100%</span>
        </div>
      </div>
    </div>
  );
}
