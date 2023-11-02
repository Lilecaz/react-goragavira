import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Accueil from './Accueil';
import Boutique from './Boutique';
import Produit from './Produit';
import Panier from './Panier';

import Commande from './Commande';
import Login from './Login';

function MyRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/produit" element={<Produit />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/commande" element={<Commande />} />
        </Routes>
    );
}

export default MyRoutes;
