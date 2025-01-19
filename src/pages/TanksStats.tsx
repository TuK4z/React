import { useLocation } from 'react-router-dom';
import Signature from '../components/Signature';
import Escape from '../components/Escape';
interface TankStatModel {
    Name: string;
    GamesPlayed: number;
    Win: number;
    WinRate: number;
}

export default function TanksStats() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const encodedJson = searchParams.get('data');
    const jsonData = encodedJson
        ? JSON.parse(encodedJson)
        : {
            PlayerData: { Name: "Valentinas_Tukas", GamesPlayed: 10, Win: 2, WinRate: 28 },
            TopPlayers: [{ Name: "Valentinas_Tukas1", GamesPlayed: 10, Win: 2, WinRate: 12 }
            ,{ Name: "Valentinas_Tukas2", GamesPlayed: 3, Win: 2, WinRate: 40 }
            ,{ Name: "Valentinas_Tukas3", GamesPlayed: 5210, Win: 210, WinRate: 50}]
        };

    return (
        <div className="h-screen bg-custom-gradient">
            <div className="bg-[#0e041c90] h-screen flex items-center justify-center">
                
                <Signature />
                <Escape />

                <div className="w-full max-w-6xl p-4 rounded-lg shadow sm:p-6 bg-cardbackground">
                    <div className="flex justify-between items-center">
                        <h5 className="mb-3 text-base font-semibold md:text-xl text-white">
                            Tankų statistika
                        </h5>
                    </div>

                    <div>
                        <p className="text-sm font-normal text-gray-400">
                            Sąraše pateikiama top žaidėjų pagal laimėtų žaidimų procentą
                        </p>

                        <h1>Vardas / Sužaista / Laimėjimai / Laimėjimo procentas</h1>

                        <ul className="my-4 space-y-3 max-h-144 overflow-y-auto">
                            {jsonData.TopPlayers.map((item : TankStatModel, index : number) => (
                                <li key={index}>
                                    <div
                                        className={`grid grid-cols-4 items-center p-3 text-base rounded-lg group hover:shadow text-white min-h-16 bg-contentbackground hover:bg-contentbackgroundhover`}>
                                        <div className="col-span-1 text-center font-semibold whitespace-nowrap">
                                            {item.Name}
                                        </div>

                                        <div className="col-span-1 text-center flex justify-center items-center flex-grow">
                                            {item.GamesPlayed}
                                        </div>

                                        <div className="col-span-1 text-center flex justify-center items-center flex-grow">
                                            {item.Win}
                                        </div>

                                        <div className="col-span-1 text-center flex justify-center items-center flex-grow">
                                            {item.WinRate}%
                                        </div>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    </div>
                    

                    <div>
                        <div className="inline-flex items-center text-xs font-normal text-gray-400">
                            WR% išvedamas pagal sužaistų ir laimėtų žaidimų kiekį. Reikia sužaisti bent 50 žaidimų, kad WR% statistika patektų į TOP lentelę
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
