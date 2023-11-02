import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accueil from './Accueil';
import Boutique from './Boutique';
import Produit from './Produit';
import Panier from './Panier';

function MyRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/produit" element={<Produit />} />
            <Route path="/panier" element={<Panier />} />
        </Routes>
    );
}

export default MyRoutes;
