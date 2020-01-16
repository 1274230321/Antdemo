import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AddUpdate from "./add-update";
import Detail from "./detail";
import ProductHome from "./product-home";
const Product = () =>{
    return (
        <Switch>
            {/* 加上exact指完全匹配，不加会导致直接匹配到product然后停住 */}
            <Route path='/product' component={ProductHome} exact></Route>
            <Route path='/product/detail' component={Detail}></Route>
            <Route path='/product/addupdate' component={AddUpdate}></Route>
            <Redirect to='/product'></Redirect>
        </Switch>
    )
}

export default Product;