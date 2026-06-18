import poster1 from './images/poster1.png';
import poster2 from './images/poster2.png';
import poster3 from './images/poster3.png';
import poster4 from './images/poster4.png';
import poster5 from './images/poster5.png';
import poster6 from './images/poster6.png';

const itemBase = 'inline-flex flex-col items-center justify-center p-4 text-center';

const Poster: React.FC = () => (
  <div className="grid grid-cols-[repeat(6,minmax(120px,auto))] gap-4 overflow-x-auto md:grid-cols-[repeat(3,minmax(auto,200px))]">
    <div className={`${itemBase} bg-blue`}>
      <img src={poster1} alt="" />
    </div>
    <div className={`${itemBase} bg-green`}>
      <img src={poster2} alt="" />
    </div>
    <div className={`${itemBase} bg-orange`}>
      <img src={poster3} alt="" />
    </div>
    <div className={`${itemBase} bg-orange`}>
      <img src={poster4} alt="" />
    </div>
    <div className={`${itemBase} bg-purple`}>
      <img src={poster5} alt="" />
    </div>
    <div className={`${itemBase} bg-pink`}>
      <img src={poster6} alt="" />
    </div>
  </div>
);

export default Poster;
