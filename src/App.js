import { Routes , Route  } from 'react-router-dom';
import Navigation from './routes/navigation/component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { CategoriesProvider } from './context/categories.context';

const App = () => {
  return (
    <CategoriesProvider>
      <Routes>
        {/* Redirect root path to /home*/ }
        <Route path ='/' element = {<Navigation/>}>
        {/*<Route path='/' element = {<Navigate to='/home' />} />*/}
        <Route index element={<Home />} />
        <Route path ='/shop/*' element={<Shop />} />

        <Route path ='/auth' element={<Authentication />} />
        <Route path ='/checkout' element={<Checkout />} />

        </Route>  
    </Routes>
    </CategoriesProvider>
  );
};

export default App;
