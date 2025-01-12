import { useLocation } from 'react-router-dom';
import Signature from '../components/Signature';
import Escape from '../components/Escape';
import CustomButton from '../components/Button';

interface TankModel {
    Id: number;
    Name: string;
}

export default function Tanks() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const encodedJson = searchParams.get('data');
    const jsonData = encodedJson ? JSON.parse(encodedJson) : [{Id:1,"Name":"Valentinas_Tukas"},{Id:2,"Name":"Valentddinas_Tukas"}];

    const handleItemClick = (item: TankModel) => {
        if ("alt" in window) {
            alt.emit('TankuKovos:SelectPlayer', item.Id);
        }
    };

    return (
        <div className="h-screen bg-custom-gradient">
            <div className="bg-[#0e041c90] h-screen flex items-center justify-center">
                <Signature />
                <Escape />

                <div className="w-full max-w-6xl p-4 rounded-lg shadow sm:p-6 bg-cardbackground">
                    <div className="flex justify-between items-center">
                        <h5 className="mb-3 text-base font-semibold md:text-xl text-white">
                            Tankų kovos
                        </h5>
                    </div>

                    <p className="text-sm font-normal text-gray-400">
                        Pasirink iš sąrašo žaidėją kuriam nori pasiūlyti kovoti tankų mūšyje. Žaidėjui sutikus prasidės 1 prieš 1 kova su tankais.
                    </p>

                    <ul className="my-4 space-y-3 max-h-144 overflow-y-auto">
                        {jsonData.map((item : TankModel) => (
                            <li key={item.Id}>
                                <div
                                    className={`grid grid-cols-2 items-center p-3 text-base rounded-lg group hover:shadow text-white min-h-16 bg-contentbackground hover:bg-contentbackgroundhover`}>
                                    <div className="col-span-1 text-center font-semibold whitespace-nowrap">
                                        {item.Name}
                                    </div>

                                    <div className="col-span-1 text-center flex justify-center items-center flex-grow">
                                        <CustomButton onClick={() => handleItemClick(item)} btnText="Kovoti" size="small" />
                                    </div>
                                </div>

                            </li>
                        ))}
                    </ul>

                    <div>
                        <div className="inline-flex items-center text-xs font-normal text-gray-400">
                            Kovą laimi žaidėjęs kurio tankas išgyvena
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
