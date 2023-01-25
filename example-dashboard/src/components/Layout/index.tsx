import Header from './Header'
import NavBar from './NavBar';

type DashboardLayoutProps = {
    children: React.ReactNode,
};

export default function Layout({ children }: DashboardLayoutProps) {
    return (
        <>
            <Header />
            <NavBar >
                <main>{children}</main>
            </NavBar>
        </>
    )
}