import React, { useState, useEffect } from 'react';
import Dropdown from './homeComponents/Dropdown';
import { Route } from "react-router-dom";

import HomePage from './homeComponents/LandingPage';
import './csStyle.css';
import Footer from './homeComponents/footer';
import Connexion from './homeComponents/Connexion';
import Inscription from './homeComponents/Inscription';
import ProductPage from './products/productPage';
import ProductP from './products/oneProduct';
import OrderPage from './products/orderPage';
import Newsletter from './newsletterC';
import LaMarque from './laMarque';
import NousContacter from './nousContacter';
import Entreprises from './entreprises';
import Archives from './archives';
import Blog from './blog';
import BlogPost from './blogArticle';
import EntrepProfile from './profilEntrep';

function HomeCt() {
    const [token, setToken] = useState("")

    useEffect(() => {
        return setToken(localStorage.getItem('token'))

    })
    return (
        <div>

            <Route path="/" render={() => <Dropdown token={token} />} />

            <Route exact path="/c/" component={HomePage} />
            <Route exact path="/c/inscription" component={Inscription} />
            <Route exact path="/c/connexion" component={Connexion} />


            <Route path="/c/newsletter" component={Newsletter} />
            <Route path="/c/products/product:id" component={ProductP} />
            <Route path="/c/products/order/:id" component={OrderPage} />
            <Route exact path="/c/products/" component={ProductPage} />


            <Route path="/c/laMarque/" component={LaMarque} />
            <Route path="/c/archives/" component={Archives} />
            <Route path="/c/entrepreneurprofile/:id" component={EntrepProfile} />

            <Route path="/c/nousContacter/" component={NousContacter} />
            <Route path="/c/entreprises/" component={Entreprises} />

            <Route exact path="/c/blog/" component={Blog} />
            <Route path="/c/blog/post:id" component={BlogPost} />
            <Footer />






        </div>
    );
}

export default HomeCt;








//<Route exact path="/c/products/" component={ProductPage} />

