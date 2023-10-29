import React from "react";
import Home from "./pages/main/home/home";
import ConnexionBusiness from "././pages/main/log/connexionBusiness";
import Reinitialisation from "././pages/main/log/reinitialisation_mdp";
import Modification from "././pages/main/log/modification_mdp";
import Contact from "././pages/main/contact/contact";
import MessageEnvoyé from "./pages/main/contact/message_sent";
import About from "././pages/main/about/about";
import Authentification from "././pages/main/log/authentification";
import MaterialUI from "././pages/test/test";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Business from "./pages/main/business/business";
import Shop from "./pages/main/product/shop";
import ShopDetail from "./pages/main/product/shopDetail";
import InscriptionBusiness from "./pages/main/log/inscription_business";
import ValidationBusiness from "./pages/main/log/business_validation";
import TermsAndConditions from "./pages/main/terms/termsAndConditions";
import MessageNonEnvoyé from "./pages/main/contact/message_not_sent";

import EpicerieHome from "./pages/epicerie/epicerieHome";
import EpicerieProduct from "./pages/epicerie/epicerieProduct";
import EpicerieProductAdd from "./pages/epicerie/epicerieProductAdd";
import EpicerieProductUpdate from "./pages/epicerie/epicerieProductUpdate";
import EpicerieProfile from "./pages/epicerie/epicerieProfile";
import EpicerieContact from "./pages/epicerie/epicerieContact";
import EpicerieMarket from "./pages/epicerie/epicerieMarket";
import EpicerieMarketDetail from "./pages/epicerie/epicerieMarketDetail";
import EpicerieFournisseur from "./pages/epicerie/epicerieFournisseur";
import EpicerieFournisseurDetail from "./pages/epicerie/epicerieFournisseurDetail";
import MessageEnvoyéEpicerie from "./pages/epicerie/message_sent";
import MessageNonEnvoyéEpicerie from "./pages/main/contact/message_not_sent";

import FournisseurHome from "./pages/fournisseur/fournisseurHome";
import FournisseurProduct from "./pages/fournisseur/fournisseurProduct";
import FournisseurProductAdd from "./pages/fournisseur/fournisseurProductAdd";
import FournisseurProductUpdate from "./pages/fournisseur/fournisseurProductUpdate";
import FournisseurProfile from "./pages/fournisseur/fournisseurProfile";
import FournisseurContact from "./pages/fournisseur/fournisseurContact";
import MessageEnvoyéFournisseur from "./pages/fournisseur/message_sent";
import FournisseurEpicerie from "./pages/fournisseur/fournisseurEpicerie";
import FournisseurEpicerieDetail from "./pages/fournisseur/fournisseurEpicerieDetail";
import FournisseurMarket from "./pages/fournisseur/fournisseurMarket";
import FournisseurMarketDetail from "./pages/fournisseur/fournisseurMarketDetail";
import MessageNonEnvoyéFournisseur from "./pages/main/contact/message_not_sent";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Main */}
          <Route path="/" element={<Home />} />
          <Route path="/business/connexion/reinitialisation-mdp" element={<Reinitialisation />}/>
          <Route path="/business/connexion/reinitialisation-mdp/modification-mdp" element={<Modification />}/>
          <Route path="/business/connexion/authentification" element={<Authentification />}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/sent" element={<MessageEnvoyé/>} />
          <Route path="/contact/notsent" element={<MessageNonEnvoyé/>} />
          <Route path="/about-us" element={<About />} />
          <Route path="/materialui" element={<MaterialUI />} />
          <Route path="business/connexion" element={<ConnexionBusiness />} />
          <Route path="business/inscription" element={<InscriptionBusiness />}/>
          <Route path="business/inscription/validation" element={<ValidationBusiness />}/>
          <Route path="business" element={<Business />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="produit" element={<Shop />} />
          <Route path="produit/:idProducts" element={<ShopDetail />} />

          {/* Epicerie */}
          <Route path="/business/epicerie/:idUser" element={<EpicerieHome />} />
          <Route path="/business/epicerie/:idUser/produit" element={<EpicerieProduct />}/>
          <Route path="/business/epicerie/:idUser/produit/add" element={<EpicerieProductAdd />}/>
          <Route path="/business/epicerie/:idUser/produit/update/:product" element={<EpicerieProductUpdate />}/>
          <Route path="/business/epicerie/:idUser/profil" element={<EpicerieProfile />}/>
          <Route path="/business/epicerie/:idUser/contact" element={<EpicerieContact />}/>
          <Route path="/business/epicerie/:idUser/contact/sent" element={<MessageEnvoyéEpicerie />}/>
          <Route path="/business/epicerie/:idUser/contact/notsent" element={<MessageNonEnvoyéEpicerie />}/>
          <Route path="/business/epicerie/:idUser/market" element={<EpicerieMarket />}/>
          <Route path="/business/epicerie/:idUser/market/:idproductUser" element={<EpicerieMarketDetail />}/>
          <Route path="/business/epicerie/:idUser/fournisseur" element={<EpicerieFournisseur />}/>
          <Route path="/business/epicerie/:idUser/fournisseur/:nameCompany" element={<EpicerieFournisseurDetail />}/>
          
          {/* Fournisseur */}
          <Route path="/business/fournisseur/:idUser" element={<FournisseurHome />} />
          <Route path="/business/fournisseur/:idUser/produit" element={<FournisseurProduct />}/>
          <Route path="/business/fournisseur/:idUser/produit/add" element={<FournisseurProductAdd />}/>
          <Route path="/business/fournisseur/:idUser/produit/update/:product" element={<FournisseurProductUpdate />}/>
          <Route path="/business/fournisseur/:idUser/contact/notsent" element={<MessageNonEnvoyéFournisseur/>}/>
          <Route path="/business/fournisseur/:idUser/profil" element={<FournisseurProfile />}/>
          <Route path="/business/fournisseur/:idUser/contact" element={<FournisseurContact />}/>
          <Route path="/business/fournisseur/:idUser/contact/sent" element={<MessageEnvoyéFournisseur />}/>
          <Route path="/business/fournisseur/:idUser/market" element={<FournisseurMarket />}/>
          <Route path="/business/fournisseur/:idUser/market/:idproductUser" element={<FournisseurMarketDetail />}/>
          <Route path="/business/fournisseur/:idUser/epicerie" element={<FournisseurEpicerie />} />
          <Route path="/business/fournisseur/:idUser/epicerie/:nameCompany" element={<FournisseurEpicerieDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
