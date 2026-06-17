import { Link } from 'react-router-dom';

import fon1 from './images/sale1.jpg';
import fon1Mob from './images/sale1_mob.jpg';
import fon2 from './images/sale2.jpg';
import fon2Mob from './images/sale2_mob.jpg';

import { RoutePaths } from '../../routes/routes.enum';
import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { GiftsAndPromoCodes } from '../../components/GiftsAndPromoCodes';
import { PageContainer } from '../../components/baseComponents/PageContainer';

const Sale: React.FC = () => {
  const breadcrumbItems = [
    { text: 'Home', path: RoutePaths.MAIN },
    { text: 'Sale', path: `${RoutePaths.SALE}` },
  ];

  return (
    <PageContainer>
      <div className="pb-[60px] md:px-20 md:pt-[60px]">
        <Breadcrumbs items={breadcrumbItems} />
        <h2 className="text-[color:var(--red)]">Prime Monthly Deals & Discounts</h2>
        <p>
          Discover our curated collection of IT-themed merchandise this month. Dive into exclusive discounts on t-shirts
          and mugs featuring unique prints. Whether you&apos;re a coding aficionado or a tech enthusiast, our
          limited-time offers are tailored just for you. Don&apos;t miss out – elevate your tech style today
        </p>
        <Link to="/category/clothes/t-shirts">
          <picture>
            <source media="(max-width: 1023px)" srcSet={fon1Mob} />
            <img className="mx-auto mb-5 block" src={fon1} alt="T-Shirt sale" />
          </picture>
        </Link>
        <Link to="/category/drinkware/mugs">
          <picture>
            <source media="(max-width: 1023px)" srcSet={fon2Mob} />
            <img className="mx-auto mb-5 block" src={fon2} alt="Drinkware sale" />
          </picture>
        </Link>
        <GiftsAndPromoCodes />
      </div>
    </PageContainer>
  );
};

export default Sale;
