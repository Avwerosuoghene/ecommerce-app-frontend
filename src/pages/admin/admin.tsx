import { Outlet } from "react-router-dom";
import AdminHeader from "./admin_header/admin-header";
import AdminSideBar from "./admin_sidebar/admin-sidebar";
import classes from './admin.module.scss';

const Admin = () => {

    return (
        <section className={classes.admin_container}>
            <AdminSideBar/>
            <section className={classes.main_content}>
                <AdminHeader/>
                <Outlet  />
            </section>
        </section>
    )
};

export default Admin;