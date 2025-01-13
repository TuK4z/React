import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Hud from './pages/Hud';
import Radio from './pages/Radio';
import Afk from './pages/Afk';
import Login from './pages/Login';
import BusinessInfo from './pages/businesses/BusinessInfo';
import Bar from './pages/Bar';
import CreateTrvOrder from './pages/trv/CreateTrvOrder';
import TrvOrders from './pages/trv/TrvOrders';
import Tanks from './pages/Tanks';
import Notifications from './components/Notifications';

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPage = (page: string) => {
      //console.log("redirectPage");
      navigate(page);
    };

    const redirectPageJson = (page: string, json: string) => {
      console.log(json);
      const url = `${page}?data=${json}`;
      navigate(url);
    };


    if ('alt' in window) {
      alt.on("webView:Redirect", redirectPage);
      alt.on("webView:RedirectWithJson", redirectPageJson);
    }

    return () => {
      if ('alt' in window){
        alt.off("webView:Redirect", redirectPage)
        alt.off("webView:RedirectWithJson", redirectPageJson);
      }
    };
  }, [navigate]);

  return (
    <>
    <Notifications />

      <Routes>
        <Route path="/" element={<Hud />} />
        <Route path="/radio" element={<Radio />} />
        <Route path="/afk" element={<Afk />} />
        <Route path="/login" element={<Login />} />
        <Route path="/businessinfo" element={<BusinessInfo />} />
        <Route path="/bar" element={<Bar />} />
        <Route path="/createtrvorder" element={<CreateTrvOrder />} />
        <Route path="/trvorders" element={<TrvOrders />} />
        <Route path="/tanks" element={<Tanks />} />
      </Routes>
    </>
  );
}
