import React from 'react';
import './App.css';
import Home from './admin/components/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Calendar from './admin/components/sidebar-components/events/calendar';
import updateEvent from './admin/components/sidebar-components/events/updateEvent';
import Products from './admin/components/sidebar-components/products/products';
import Customers from './admin/components/sidebar-components/customers/customers';
import Gallery from './admin/components/sidebar-components/gallery/gallery';
import Events from './admin/components/sidebar-components/events/events';

import Sidebar from './admin/components/sidebar';
import Updateproduct from './admin/components/sidebar-components/products/updateProduct';
import HomeCt from './customer/HomeCt';
import Entrepreneurs from './admin/components/sidebar-components/entrepreneur';
import UpdateEntpProfile from './admin/components/sidebar-components/updateEntpProfile';

import SellingPt from './admin/components/sidebar-components/SellingPt'
import UpdateSellingPt from './admin/components/sidebar-components/updateSellingPt'
import Authorization from './authorization';
import AdminLogin from './admin/adminLogin';
import BlogPost from './admin/components/sidebar-components/blogpost';
import updateBlogPost from './admin/components/sidebar-components/updateblogpost';
import ContactForm from './admin/components/sidebar-components/ContactForm';
import Newsletter from './admin/components/sidebar-components/NewsLetter'
import Orders from './admin/components/sidebar-components/orders';
function App() {
  return (
    <div >
      <Router>


        <Route path="/c/" component={HomeCt} />


        <Authorization user="admin">
          <Route path="/adminlogin" component={AdminLogin} />

          <Route exact path="/a/" component={Home} />
          <Route path="/a/" component={Sidebar} />

          <Route path="/a/orders" render={() => <Orders />} />
          <Route path="/a/events" render={() => <Events />} />
          <Route path="/a/Updateevent/:id" component={updateEvent} />
          <Route path="/a/calendar" render={() => <Calendar />} />
          <Route path="/a/products" render={() => <Products />} />
          <Route path="/a/Updateproduct/:id" component={Updateproduct} />

          <Route path="/a/customers" render={() => <Customers />} />
          <Route path="/a/gallery" render={() => <Gallery />} />

          <Route path="/a/entrepreneurs" render={() => <Entrepreneurs />} />
          <Route path="/a/Updateprofile/:id" component={UpdateEntpProfile} />


          <Route path="/a/sellingPts" render={() => <SellingPt />} />
          <Route path="/a/UpdateSellingpt/:id" component={UpdateSellingPt} />

          <Route path="/a/blogposts" render={() => <BlogPost />} />
          <Route path="/a/Updateblogpost/:id" component={updateBlogPost} />

          <Route path="/a/contactform" render={() => <ContactForm />} />
          <Route path="/a/newsletter" render={() => <Newsletter />} />

        </Authorization>

      </Router>
    </div >
  );
}

export default App;
