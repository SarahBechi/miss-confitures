import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FormControl } from 'react-bootstrap';




class ProductPage extends Component {
    constructor(state) {
        super(state);
        this.state = {
            products: [],
            category: "",
            search: ""
        }
    }


    componentDidMount() {
        console.log("Component did mount  productpae")
        axios.get("http://localhost:4000/find_products").then(res => {
            this.setState({ products: res.data })
            console.log(this.state.products)
        })
    }


    changeInput = (e) => {
        this.setState({ search: e.target.value })


    }

    aZ_Filter = () => {
        this.setState({
            products: this.state.products.sort((a, b) => (a.Product_Name.toUpperCase() > b.Product_Name.toUpperCase()) ? 1 : -1)
        })
    }


    filter_Za = () => {
        this.setState({
            products: this.state.products.sort((a, b) => (b.Product_Name.toUpperCase() > a.Product_Name.toUpperCase()) ? 1 : -1)
        })
    }


    IsClicked = (c) => {

        this.setState({
            category: c,


        })
    }

    filter_priceMax = () => {
        this.setState({
            products: this.state.products.sort((a, b) => (a.Price > b.Price) ? 1 : -1)
        })
    }


    filter_priceMin = () => {
        this.setState({
            products: this.state.products.sort((a, b) => (b.Price > a.Price) ? 1 : -1)
        })
    }





    render() {

        return (<div className="productsPg">

            <div className="pdtCards" >
                {(this.state.category) ? this.state.products.filter(el => el.Product_Category === this.state.category).map(el => <div className="prodCard" key={el._id}>
                    <img style={{ width: "150px", height: "150px", "margin-left": "50px" }} src={process.env.PUBLIC_URL + `/upload/${el.Link_Img}`} alt="produit" />
                    <h5>{el.Product_Name}</h5>
                    <h6>{el.Price}</h6>
                    <Link to={`/c/products/product${el._id}`}><span className="pcBtn">Consulter</span></Link> </div>
                ) : this.state.products.filter(el => (el.Product_Name.toUpperCase().includes(this.state.search.toUpperCase()))).map(el => <div className="prodCard" key={el._id}>
                    <img style={{ width: "150px", height: "150px", "margin-left": "50px" }} src={process.env.PUBLIC_URL + `/upload/${el.Link_Img}`} alt="produit" />
                    <h5>{el.Product_Name}</h5>
                    <h6>{el.Price}</h6>
                    <Link to={`/c/products/product${el._id}`}><span className="pcBtn">Consulter</span></Link> </div>)}
            </div>


            <div className="sidebarPt" >



                <div className="PCategory">
                    <h3 onClick={() => this.IsClicked("")}>Tous les produits</h3>
                    <h4 onClick={() => this.IsClicked("Confiture")}>Confiture</h4>
                    <h4 onClick={() => this.IsClicked("Pate")}>Pate</h4>
                    <h4 onClick={() => this.IsClicked("Jus")}>Jus</h4>
                </div>

                <hr></hr>

                <div className="SBfilters">
                    <FormControl
                        placeholder="Recherche .."
                        aria-describedby="basic-addon2" onChange={(e) => this.changeInput(e)} />

                    <h3>Tirer par</h3>
                    <div className="NameFilter">
                        <h4>Nom</h4>
                        <div className="fltBtns azdiv">
                            <span className="pcBtn filterBtns" onClick={this.aZ_Filter}>A-z</span>
                            <span className="pcBtn filterBtns" onClick={this.filter_Za}>Z-a</span>
                        </div>
                    </div>
                    <div className="PriceFilter filterBtns">
                        <h4>Prix</h4>
                        <div className="fltBtns">
                            <span className="pcBtn filterBtns" onClick={this.filter_priceMax} >Min-max</span>
                            <span className="pcBtn filterBtns" onClick={this.filter_priceMin}>Max-min</span>

                        </div>
                    </div>

                </div>

            </div>

        </div>


        );
    }
}



export default ProductPage;