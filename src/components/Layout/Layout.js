import { Fragment } from "react";
import MainNav from "./MainNav";

const Layout = (props) =>{

    return(
        <Fragment>
            <MainNav/>
            <main>{props.children}</main>
        </Fragment>
    );
};

export default Layout;