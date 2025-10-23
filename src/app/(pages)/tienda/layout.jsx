// Components
import Menu from "./components/Menu";
import SecondMenu from "./components/SecondMenu";

export default function DashboardLayout({ children }) {
    return (
        <>
            <Menu />
            <SecondMenu />
            <main>{children}</main>
        </>
    );
}
