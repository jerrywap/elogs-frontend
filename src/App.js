import logo from './logo.svg';
import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import {BrowserRouter, Route, Router, Routes, Switch} from "react-router-dom";
import Home from "./Pages/Home";
import Details from "./Pages/Details";
import Layout from "./Components/Layout";
import 'primeicons/primeicons.css';
import {PropertyProvider} from "./Service/PropertyContext";



function App({ Component, pageProps }) {

  return (
      <PrimeReactProvider>
          <PropertyProvider>
              <Layout>
                  <BrowserRouter>
                      <Routes>
                          <Route exact path="/" index element={<Home />} />
                          <Route exact path="/job-details/:id" index element={<Details />} />
                      </Routes>
                  </BrowserRouter>
              </Layout>
          </PropertyProvider>

      </PrimeReactProvider>
  );
}

export default App;
