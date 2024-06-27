import React from "react";
import Home from "./pages/main/home/home";
import Connexion from "././pages/main/log/connexion";
import Reinitialisation from "././pages/main/log/reinitialisation_mdp";
import Modification from "././pages/main/log/modification_mdp";
import Contact from "././pages/main/contact/contact";
import MessageEnvoyé from "./pages/main/contact/message_sent";
import About from "././pages/main/about/about";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Business from "./pages/main/business/business";
import Shop from "./pages/main/product/shop";
import Suggestion from "./pages/main/product/suggestion";
import ShopDetail from "./pages/main/product/shopDetail";
import InscriptionEpicerie from "./pages/main/log/inscription_epicerie";
import TermsAndConditions from "./pages/main/terms/termsAndConditions";
import MessageNonEnvoyé from "./pages/main/contact/message_not_sent";
import ValidationReinitialisation from "./pages/main/log/reinitialisation_validation";

import EpicerieHome from "./pages/epicerie/home/epicerieHome";
import EpicerieProduct from "./pages/epicerie/product/epicerieProduct";
import EpicerieProductSearch from "./pages/epicerie/product/epicerieProductSearch";
import EpicerieProductAdd from "./pages/epicerie/product/epicerieProductAdd";
import EpicerieProductUpdate from "./pages/epicerie/product/epicerieProductUpdate";
import EpicerieProfile from "./pages/epicerie/profile/epicerieProfile";
import EpicerieContact from "./pages/epicerie/contact/epicerieContact";
import MessageEnvoyéEpicerie from "./pages/epicerie/contact/message_sent";
import MessageNonEnvoyéEpicerie from "./pages/epicerie/contact/message_not_sent";
import EpicerieProductPresentation from "./pages/epicerie/product/epicerieProductPresentation";
import EpicerieProductCreate from "./pages/epicerie/product/epicerieProductCreate";
import VerificationMailEpicerie from "./pages/main/log/mail_verification_epicerie";
import VerificationMailMarque from "./pages/main/log/mail_verification_marque";
import InscriptionMarque from "./pages/main/log/inscription_marque";
import ValidationEpicerie from "./pages/main/log/validation_epicerie";
import ValidationMarque from "./pages/main/log/validation_marque";
import ApproveMail from "./pages/epicerie/log/mail_verification";
import ApproveEpicerie from "./pages/epicerie/log/validation_epicerie";



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          
          {/* Main */}
          <Route path="/" element={<Home />} />
          <Route path="/connexion/reinitialisation-mdp" element={<Reinitialisation />}/>
          <Route path="/connexion/reinitialisation-mdp/validation" element={<ValidationReinitialisation />}/>
          <Route path="/connexion/reinitialisation-mdp/modification/:id/:token" element={<Modification />}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/sent" element={<MessageEnvoyé/>} />
          <Route path="/contact/notsent" element={<MessageNonEnvoyé/>} />
          <Route path="/about-us" element={<About />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription/epicerie" element={<InscriptionEpicerie />}/>
          <Route path="/inscription/marque" element={<InscriptionMarque />}/>
          <Route path="/inscription/marque/verification" element={<VerificationMailMarque/>}/>
          <Route path="/inscription/marque/verification/validation" element={<ValidationMarque/>}/>
          <Route path="/inscription/epicerie/verification" element={<VerificationMailEpicerie />}/>
          <Route path="/inscription/epicerie/verification/validation" element={<ValidationEpicerie />}/>
          <Route path="/business" element={<Business />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/produit" element={<Shop />} />
          <Route path="/produit/:name" element={<ShopDetail />} />
          <Route path="/produit/suggestion" element={<Suggestion />} />

          {/* Epicerie */}
          <Route path="/connexion/verification" element={<ApproveMail />} />
          <Route path="/connexion/verification/validation" element={<ApproveEpicerie />} />
          <Route path="/epicerie/" element={<EpicerieHome />} />
          <Route path="/epicerie/produit" element={<EpicerieProduct />}/>
          <Route path="/epicerie/produit/add" element={<EpicerieProductAdd />}/>
          <Route path="/epicerie/produit/search" element={<EpicerieProductSearch />}/>
          <Route path="/epicerie/produit/search/create" element={<EpicerieProductCreate />}/>
          <Route path="/epicerie/produit/search/:idProduct/" element={<EpicerieProductPresentation />}/>
          <Route path="/epicerie/produit/search/:idProduct/add" element={<EpicerieProductAdd/>}/>
          <Route path="/epicerie/produit/update/:idEpicerieProduct" element={<EpicerieProductUpdate />}/>
          <Route path="/epicerie/profil" element={<EpicerieProfile />}/>
          <Route path="/epicerie/contact" element={<EpicerieContact />}/>
          <Route path="/epicerie/contact/sent" element={<MessageEnvoyéEpicerie />}/>
          <Route path="/epicerie/contact/notsent" element={<MessageNonEnvoyéEpicerie />}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
