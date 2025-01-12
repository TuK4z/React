import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Signature from '../../components/Signature';
import Escape from '../../components/Escape';
import CustomButton from '../../components/Button';

interface TrvOrderModel {
    Guid: string;
    Name: string;
    OrderType: number;
    OwnerName: string;
    Created: string;
    InProgress: boolean;
    OrderDistance: number;
    OrderFaction: number;
}

export default function CreateTrvOrder() {
    const [isChecked, setIsChecked] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const encodedJson = searchParams.get('data');
    const jsonData = encodedJson
        ? JSON.parse(encodedJson)
        : {
            PlayerData: { PlayerName: "Valentinas_Tukas" },
            Orders: [{
                "Guid": "aw5dfaw5f",
                "Name": "Vaistinėlės",
                "OrderDistance": 0.45,
                "Created": "2025-01-01 10:45",
                "OwnerName": "Valentinas_Tukas",
                "OrderFaction": 9
            },
            {
                "Guid": "aewg45a5fw4",
                "Name": "Vaistinėlės",
                "OrderDistance": 0.45,
                "Created": "2025-01-01 10:45",
                "OwnerName": ""
            },{
                "Guid": "aewg45a5fw4",
                "Name": "Vaistinėlės",
                "OrderDistance": 0.45,
                "Created": "2025-01-01 10:45",
                "OwnerName": "Lolas"
            }]
        };

    useEffect(() => {
        if (jsonData?.PlayerData?.DisplayOrdersTable !== undefined) {
            setIsChecked(jsonData.PlayerData.DisplayOrdersTable);
        }
    }, [jsonData]);

    const handleItemClick = (item: TrvOrderModel) => {
        if ("alt" in window) {
            alt.emit('TrvOrders:PickOrder', item.Guid);
        }
    };

    const denyOrder = (item: TrvOrderModel) => {
        if ("alt" in window) {
            alt.emit('TrvOrders:DenyOrder', item.Guid);
        }
    };

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);

        if ("alt" in window) {
            alt.emit('TrvOrders:SettingsResponse');
        }

        console.log(`Player setting: Checkbox is now ${newCheckedState ? "checked" : "unchecked"}`);
    };

    const playerName = jsonData?.PlayerData?.PlayerName || "";

    const userHasOrder = jsonData.Orders.some((item: TrvOrderModel) => item.OwnerName === playerName);

    return (
        <div className="h-screen bg-custom-gradient">
            <div className="bg-[#0e041c90] h-screen flex items-center justify-center">
                <Signature />
                <Escape />

                <div className="w-full max-w-6xl p-4 rounded-lg shadow sm:p-6 bg-cardbackground">
                    <div className="flex justify-between items-center">
                        <h5 className="mb-3 text-base font-semibold md:text-xl text-white">
                            Užsakymų sąrašas
                        </h5>
                        <div className="flex items-center text-gray-400 text-sm">
                            <h4 className="mr-2">Rodyti lentelę įlipus į darbinę tr. priemonę</h4>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                className="w-4 h-4 rounded bg-gray-700 border-gray-600"
                            />
                        </div>
                    </div>

                    <p className="text-sm font-normal text-gray-400">
                        Šiame sąraše pateikiami galimi užsakymai, dalis iš jų reikalauja tam tikros tr. priemonės naudojimo. Pasiėmus užsakymą, jį galima ir atšaukti esant reikalui.
                    </p>

                    <ul className="my-4 space-y-3 max-h-144 overflow-y-auto">
                        {jsonData.Orders.map((item: TrvOrderModel) => (
                            <li key={item.Guid}>
                                <div
                                    className={`grid grid-cols-5 items-center p-3 text-base rounded-lg group hover:shadow text-white min-h-16 ${
                                        item.OrderFaction > 0
                                            ? "bg-[#f5d0271a] border border-yellow-300"
                                            : "bg-contentbackground hover:bg-contentbackgroundhover"
                                    }`}
                                >
                                    <div className="col-span-1 text-center font-semibold whitespace-nowrap">
                                        {item.Name}
                                    </div>

                                    <div className="col-span-1 text-center text-gray-400">
                                        {item.OrderDistance} km
                                    </div>

                                    <div className="col-span-1 text-center text-gray-400">
                                        {item.Created}
                                    </div>

                                    <div className="col-span-1 text-center text-gray-400">
                                        {item.OwnerName || "-"}
                                    </div>

                                    <div className="col-span-1 text-center flex justify-center items-center flex-grow">
                                        {!userHasOrder && item.OwnerName === "" && (
                                            <CustomButton onClick={() => handleItemClick(item)} btnText="Vykdyti" size="small" />
                                        )}
                                        {item.OwnerName === playerName && (
                                            <CustomButton onClick={() => denyOrder(item)} btnText="Atšaukti" size="small" />
                                        )}
                                    </div>
                                </div>

                            </li>
                        ))}
                    </ul>

                    <div>
                        <div className="inline-flex items-center text-xs font-normal text-gray-400">
                            Jei nuėmėte kelio rodymą kur pristatyti krovinį, išlipus ir įlipus į tr. priemonę serveris vėl uždės nuorodą
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
