import { Link } from 'react-router-dom';

import racon from './images/imgEmptyCart.png';

const EmptyCart: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center">
    <img src={racon} alt="racon" />
    <h2 className="m-0 text-content">Hey,</h2>
    <h2 className="m-0 text-content">The cart feels light !</h2>
    <h4 className="m-0 text-content">Explore products and add your favorite items</h4>
    <Link
      to="/category/clothes/t-shirts"
      className="m-[34px] w-[340px] rounded bg-primary py-2 text-center text-2xl text-white transition-colors hover:bg-orange-light"
    >
      Explore
    </Link>
  </div>
);

export default EmptyCart;
