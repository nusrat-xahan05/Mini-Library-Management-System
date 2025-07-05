import Banner from '@/components/ui/layout/Banner/Banner';
import { Outlet } from 'react-router';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;