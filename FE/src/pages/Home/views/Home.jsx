import React from 'react';
import '../styles/Home.scss';
import ItemCard from '../../../components/ItemCard/ItemCard';

const ronaldo = require('../../../assets/images/ronaldo.jpg');
const messi = require('../../../assets/images/messi.jpg');
const neymar = require('../../../assets/images/neymar.jpg');
const bellingham = require('../../../assets/images/bellingham.jpg');
const deJong = require('../../../assets/images/deJong.jpg');
const ramous = require('../../../assets/images/ramous.jpg');
const mbappe = require('../../../assets/images/mbappe.jpg');

const ITEMS_DATA = [
  {
    src: bellingham,
    title: 'Vật tư 1',
    quantity: 20
},
{
    src: ronaldo,
    title: 'Vật tư 2',
    quantity: 30
},
{
    src: messi,
    title: 'Vật tư 3',
    quantity: 30
},
{
    src: neymar,
    title: 'Vật tư 4',
    quantity: 30
},
{
  src: deJong,
  title: 'Vật tư 5',
  quantity: 30
},
{
  src: ramous,
  title: 'Vật tư 6',
  quantity: 30
},
{
  src: mbappe,
  title: 'Vật tư 7',
  quantity: 30
},
]

const Home = () => {
  return (
    <div className="Home">
      <div className="container">
        <h1 className='heading'>Trang Chủ</h1>
        <div className="Home__body">
          <div className="grid flex-wrap grid-cols-1 sd:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5 sm:gap-10 mb-12 xl:grid-cols-3 2xl:grid-cols-4">
            {ITEMS_DATA.map((movie, index) => (
              <ItemCard key={index} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home
