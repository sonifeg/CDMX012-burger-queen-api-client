// import { useNavigate } from "react-router-dom";


import { getMenu,getOrder, deleteOrder } from "../../lib/RequestHandler";
import React,{ useEffect, useState } from "react";


import CardsMenu from "./CardsMenu";
import "../../css/Menu.css";
import Header from "../Header";
import AsideMenu from "./asideMenu";
import { DateOrder } from "./DateOrder";
import AsideOrders from "./AsideOrders";

export default function Menu() {
  const [products, setProducts] = useState({});
  const [typeMenu, setTypeMenu] = useState("");
  const [orderMenu, setOrder] = useState({});
  const [changeView, setChangeView] = useState(true);
  const [comandasOrders, setComandasOrders] = useState([]);
  const [isDrawerOpenOrder, setIsDrawerOpenOrder] = useState(false);
  const[contador,setContador]=useState(0)
  const[selectedOder, setSelectedOrder] = useState({});
  const [total, setTotal] = useState("");
  const[watchBton, setWatchBton]=useState(true);
  


  useEffect(() => {
    typesProducts();
  }, []);
  const typesProducts = async () => {
    const products = await getMenu();
    let productsByTypes = {};
    for (let i = 0; i < products.length; i++) {
      let type = products[i].type;

      if (!Object.prototype.hasOwnProperty.call(productsByTypes, type)) {
        productsByTypes[type] = [];
      }
      productsByTypes[type].push(products[i]);
    }
    console.log(productsByTypes);
    setProducts(productsByTypes);
  };
  const breakfast = () => {
    setTypeMenu("desayuno");
    setChangeView(true);
  };
  const dinner = () => {
    setTypeMenu("cena");
    setChangeView(true);
  };
  const ordersComanda = async () => {
    const arrayOrders = await getOrder();
    console.log(arrayOrders);
    setChangeView(false);

    setComandasOrders(arrayOrders)
    console.log(arrayOrders)
      // setOrder(arrayOrders);
   
  }
  const handleDelete = async(id)=>{
    const orderDelete = await  deleteOrder(id)
    const arrayOrders= await getOrder();
    setComandasOrders(arrayOrders)
  
  }


  return (
    <main className="menu-container">
      <Header 
      updateComandaOrders={ordersComanda}
      
       />
      <section>
        <section className="search">
          <img
            className="Search"
            alt="searchIcon"
            src={require("../../assets/Search.png")}
          />
          <input type="text" placeholder="Search..."/>
        </section>


  <div className="btnsAndMenu-container">
    <section className="btnsOfMenu">
      <button className="breakAndDinner" onClick={breakfast} >Breakfast</button>
      <button className="breakAndDinner" onClick={dinner}> Dinner</button>
    </section>
    <section className="cards-container">
      
     { 
     changeView &&
     products[typeMenu] &&
        products[typeMenu].map((product) => {
          return (
            <CardsMenu
              key={product.id}
              imgProducts={product.image}
              name={product.name}
              price={product.price}
              order={orderMenu}
              id={product.id}
              updateOrder={setOrder}
              contador={contador}
              setContador={setContador}
            ></CardsMenu>
          );
        })
      }
     { 
     !changeView &&
        comandasOrders.map((order) => {
          return (
            <DateOrder
              key={order.id}
              order={order}
              updateComanda={setComandasOrders}
              setIsDrawerOpenOrder= {setIsDrawerOpenOrder}
              setSelectedOrder = {setSelectedOrder}
              deleteOrder={handleDelete}
              setTotal={setTotal}
              setContador={setContador}
       ></DateOrder>
        );
      })
      }
    </section>
    <AsideMenu
    order={orderMenu} 
    updateOrder={setOrder}
    total={total}
    setTotal={setTotal}
    contador={contador}
    
    />
    <AsideOrders
    isDrawerOpenOrder= {isDrawerOpenOrder}
    setIsDrawerOpenOrder= {setIsDrawerOpenOrder}
    selectedOder={selectedOder}
    total={total}
    setContador={setContador}
  
    
    />
  </div>
    </section >
  </main >

  );
}
