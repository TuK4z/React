import { useLocation } from 'react-router-dom';
import Signature from '../components/Signature';
import DiscordLogo from '../assets/brands/discord.svg';
/*const closeAfk = () => {
    console.log("Close")
};*/

export default function Afk() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const encodedJson = searchParams.get('data');
    const jsonData = encodedJson ? JSON.parse(encodedJson) : null;
    
    return (
<div className="h-screen bg-custom-gradient">
    <div className="bg-[#0e041c90] h-screen flex items-center justify-center">

        <Signature/>

        <div className='grid grid-rows-3 gap-4 text-center h-full'>
            <div className='m-auto'>
                <img className='h-14' src={DiscordLogo} alt="logo" />
            </div>

            <div className='m-auto'>
                {jsonData != null
                    ? <h4 className="text-xl font-bold dark:text-white">{jsonData.JoinMessage}</h4>
                    : <h4 className="text-xl font-bold dark:text-white">Vyksta Discord autorizacija. Prašome palaukti...</h4>
                }
            </div>

            <div className='m-auto'>
                <h1 className="mb-4 text-sm font-extrabold leading-none tracking-tight text-red-800 md:text-2xl">Dėmesio!</h1>
                {jsonData != null
                    ? <p className="mb-6 text-lg font-normallg:text-xl sm:px-16 xl:px-48 text-gray-400">{jsonData.DisplayMessage}</p>
                    : <p>...</p>
                }
            </div>
        </div>

    </div>
</div>
    );
};