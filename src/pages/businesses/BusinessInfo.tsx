import Signature from '../../components/Signature';
import Escape from '../../components/Escape';
//import ArtWork from '../../assets/budget.png';

export default function Afk() {
    //const location = useLocation();
   // const searchParams = new URLSearchParams(location.search);
    //const encodedJson = searchParams.get('data');
    //const jsonData = encodedJson ? JSON.parse(encodedJson) : null;
    
    return (
<div className="h-screen bg-custom-gradient">
    <div className="bg-[#0e041c90] h-screen flex items-center justify-center">

        <Signature/>
        <Escape/>

        <div>
            <div className="flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-x bg-darkcard p-8">
                {/* <img className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg' src={ArtWork} alt="artwork" /> */}
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Verslas</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Aprašymas</p>
                </div>
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Purple to blue
</span>
</button>
            </div>
        </div>

    </div>
</div>
    );
};