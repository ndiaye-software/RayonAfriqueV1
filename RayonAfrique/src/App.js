import React from "react";
import Home from "./pages/main/home/home";
import Connexion from "././pages/main/log/connexion";
import ConnexionEpicerie from "././pages/main/log/connexionEpicerie";
import Reinitialisation from "././pages/main/log/reinitialisation_mdp";
import Modification from "././pages/main/log/modification_mdp";
import Contact from "././pages/main/contact/contact";
import MessageEnvoyé from "./pages/main/contact/message_sent";
import About from "././pages/main/about/about";
import Authentification from "././pages/main/log/authentification";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Business from "./pages/main/business/business";
import Shop from "./pages/main/product/shop";
import ShopDetail from "./pages/main/product/shopDetail";
import InscriptionEpicerie from "./pages/main/log/inscription_epicerie";
import InscriptionClient from "./pages/main/log/inscription_client";
import ValidationBusiness from "./pages/main/log/business_validation";
import TermsAndConditions from "./pages/main/terms/termsAndConditions";
import MessageNonEnvoyé from "./pages/main/contact/message_not_sent";

import EpicerieHome from "./pages/epicerie/home/epicerieHome";
import EpicerieProduct from "./pages/epicerie/product/epicerieProduct";
import EpicerieProductSearch from "./pages/epicerie/product/epicerieProductSearch";
import EpicerieProductAdd from "./pages/epicerie/product/epicerieProductAdd";
import EpicerieProductUpdate from "./pages/epicerie/product/epicerieProductUpdate";
import EpicerieProfile from "./pages/epicerie/profile/epicerieProfile";
import EpicerieContact from "./pages/epicerie/contact/epicerieContact";
import MessageEnvoyéEpicerie from "./pages/epicerie/contact/message_sent";
import MessageNonEnvoyéEpicerie from "./pages/epicerie/contact/message_not_sent";
import Test from "./pages/test";
import Test2 from "./pages/test2";
import Test3 from "./pages/test3";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          
          {/* Main */}
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />}/>
          <Route path="/test2" element={<Test2 />}/>
          <Route path="/test3" element={<Test3 />}/>
          <Route path="/business/connexion/reinitialisation-mdp" element={<Reinitialisation />}/>
          <Route path="/business/connexion/reinitialisation-mdp/modification-mdp" element={<Modification />}/>
          <Route path="/business/connexion/authentification" element={<Authentification />}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/sent" element={<MessageEnvoyé/>} />
          <Route path="/contact/notsent" element={<MessageNonEnvoyé/>} />
          <Route path="/about-us" element={<About />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/epicerie/connexion" element={<ConnexionEpicerie />} />
          <Route path="inscription/epicerie" element={<InscriptionEpicerie />}/>
          <Route path="/inscription/client" element={<InscriptionClient />}/>
          <Route path="business/inscription/validation" element={<ValidationBusiness />}/>
          <Route path="business" element={<Business />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="produit" element={<Shop />} />
          <Route path="produit/:name" element={<ShopDetail />} />

          {/* Epicerie */}
          <Route path="/epicerie/:id" element={<EpicerieHome />} />
          <Route path="/epicerie/:idEpicerie/produit" element={<EpicerieProduct />}/>
          <Route path="/epicerie/:id/produit/add" element={<EpicerieProductAdd />}/>
          <Route path="/epicerie/:id/produit/search" element={<EpicerieProductSearch />}/>
          <Route path="/epicerie/:id/produit/update/:product" element={<EpicerieProductUpdate />}/>
          <Route path="/epicerie/:id/profil" element={<EpicerieProfile />}/>
          <Route path="/epicerie/:id/contact" element={<EpicerieContact />}/>
          <Route path="/epicerie/:id/contact/sent" element={<MessageEnvoyéEpicerie />}/>
          <Route path="/epicerie/:id/contact/notsent" element={<MessageNonEnvoyéEpicerie />}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
