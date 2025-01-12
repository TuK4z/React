import { useLocation } from 'react-router-dom';
import Signature from '../components/Signature';
import CustomButton from '../components/Button';
import MathChallenge from '../components/MathChallenge';
interface JsonData {
    AfkMins: number;
    ActiveBonus: boolean;
    DisplayMessage: string;
    AltCheck: boolean;
}

export default function Afk() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const encodedJson = searchParams.get('data');
    let jsonData: JsonData | null = null;

    try {
        jsonData = encodedJson ? JSON.parse(encodedJson) : null;
    } catch (error) {
        console.error('Failed to parse JSON', error);
    }

    const handleSuccess = () => {
        if ("alt" in window){
            alt.emit('Client:AfkResponse');
        }
    };

return (
    <div className="h-screen bg-custom-gradient">
        <div className="bg-[#0e041c90] h-screen flex items-center justify-center">
            <Signature />
            <div className="grid grid-rows-3 gap-4 text-center h-full">
                <div className="m-auto">
                    <h4 className="text-xl font-bold text-white">
                        Jūs esate AFK būsenoje
                        {jsonData != null ? (
                            <span className="text-yellow-600"> {jsonData.AfkMins} </span>
                        ) : (
                            <span>0</span>
                        )}
                        min
                    </h4>
                    <h4 className="text-sm font-semibold text-white">
                        AFK zonos bonusas:
                        {jsonData?.ActiveBonus ? (
                            <span className="text-green-600"> aktyvus</span>
                        ) : (
                            <span className="text-red-600"> neaktyvus</span>
                        )}
                    </h4>
                </div>
                
                <div className="m-auto">
                    {jsonData?.AltCheck ? (
                        <MathChallenge onSuccess={handleSuccess} />
                    ) : (
                        <CustomButton onClick={handleSuccess} btnText="Išeiti iš AFK" size="medium" />
                    )}
                </div>
                <div className="m-auto">
                    <h1 className="mb-4 text-sm font-extrabold leading-none tracking-tight text-red-800 md:text-2xl">
                        Dėmesio!
                    </h1>
                    {jsonData != null ? (
                        <p className="mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
                            {jsonData.DisplayMessage}
                        </p>
                    ) : (
                        <p>...</p>
                    )}
                </div>
            </div>
        </div>
    </div>
);};