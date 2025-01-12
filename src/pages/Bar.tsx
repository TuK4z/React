import { useLocation } from 'react-router-dom';
import Signature from '../components/Signature';
import Escape from '../components/Escape';

interface BarItem {
    Id: number;
    Name: string;
    Price: number;
}

export default function Bar() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const encodedJson = searchParams.get('data');
    const jsonData = encodedJson ? JSON.parse(encodedJson) : [];

    const handleItemClick = (item : BarItem) => {
        if ("alt" in window){
            alt.emit('Bar:OnBuyItem', item.Id);
        }
    };

    return (

      <div className="h-screen bg-custom-gradient">
        <div className="bg-[#0e041c90] h-screen flex items-center justify-center">
            
            <Signature />
            <Escape />

            <div className="w-full max-w-sm p-4 rounded-lg shadow sm:p-6 bg-cardbackground">
                <h5 className="mb-3 text-base font-semibold md:text-xl text-white">
                    Baras
                </h5>
            <p className="text-sm font-normal text-gray-400">Čia gali pavartoti alkoholinių gėrimų. Atsargiai, tai paveiks tavo žaidėją!</p>

            <ul className="my-4 space-y-3">
                {jsonData.map((item : BarItem) => (
                    <li key={item.Id}>
                        <div className="flex items-center p-3 text-base font-bold rounded-lg group hover:shadow bg-contentbackground hover:bg-contentbackgroundhover text-white" onClick={() => handleItemClick(item)}>
                            <span className="flex-1 ms-3 whitespace-nowrap">{item.Name}</span>
                            {item.Price && (
                                <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium rounded bg-contentbackgroundhover text-gray-400">
                                    ${item.Price}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

                <div>
                    <div className="inline-flex items-center text-xs font-normal text-gray-400">
                        Pervartojus, galima išsiblaivinti pas medikus
                    </div>
                </div>
            </div>

        </div>
      </div>

    );
};