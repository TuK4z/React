import { useLocation } from 'react-router-dom';
import Signature from '../../components/Signature';
import Escape from '../../components/Escape';

interface OrderModel {
    Id: number;
    Name: string;
    Price: number;
}

interface TrvOrderModel {
    Name: string;
    OrderType: number;
    OwnerName: string;
    Created: string;
}

export default function CreateTrvOrder() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const encodedJson = searchParams.get('data');
    const jsonData = encodedJson ? JSON.parse(encodedJson) : { AwailableOrders: [], Orders: [] };

    const handleItemClick = (item : OrderModel) => {
        if ("alt" in window){
            alt.emit('Trv:OnRequestOrder', item.Id);
        }
    };

    return (

      <div className="h-screen bg-custom-gradient">
        <div className="bg-[#0e041c90] h-screen flex items-center justify-center">

            <Signature />
            <Escape />

            <div className="w-full max-w-6xl p-4 rounded-lg shadow sm:p-6 bg-cardbackground">
                <h5 className="mb-3 text-base font-semibold md:text-xl text-white">
                    Užsakymų sąrašas
                </h5>
            <p className="text-sm font-normal text-gray-400">Pateikiamas sąrašas kokių užsakymų gali jūsų darbas pateikti TRV darbui. Užsakymas bus atliktas iš darbo fondo pinigų.</p>

            <ul className="my-4 space-y-3 max-h-72 overflow-y-auto">
                {jsonData.AwailableOrders.map((item: OrderModel) => (
                    <li key={item.Id}>
                        <div
                            className="flex items-center p-3 text-base font-bold rounded-lg group hover:shadow bg-contentbackground hover:bg-contentbackgroundhover text-white"
                            onClick={() => handleItemClick(item)}
                        >
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

            <h5 className="mb-3 text-base font-semibold md:text-xl text-white flex items-center">
                Atlikti užsakymai
                <span className="ml-2 w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                <span className="ml-1 text-sm text-gray-400">Vykdomi</span>

                <span className="ml-2 w-2 h-2 bg-red-400 rounded-full inline-block"></span>
                <span className="ml-1 text-sm text-gray-400">Laukiantys</span>
            </h5>

            <ul className="my-4 space-y-3 max-h-72 overflow-y-auto">
                {jsonData.Orders.map((item: TrvOrderModel) => (
                    <li key={item.OrderType}>
                        <div className={`flex items-center p-3 text-base font-bold rounded-lg group hover:shadow text-white ${item.OwnerName ? 'border border-green-400' : 'border border-red-400'}`}>
                            <div className="flex-1 ms-3 whitespace-nowrap">{item.Name}{item.Created && (
                                <span className="flex-1 px-2 py-0.5 ms-3 text-xs font-medium rounded text-gray-400">
                                    {item.Created}
                                </span>
                            )}</div>
                            {item.OwnerName && (
                                <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium rounded text-gray-400">
                                    {item.OwnerName}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

                <div>
                    <div className="inline-flex items-center text-xs font-normal text-gray-400">
                        TRV darbuotojas jums pristatys užsakymą į jūsų darbo bazę.
                    </div>
                </div>
            </div>

        </div>
      </div>

    );
};