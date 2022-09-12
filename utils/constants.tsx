import {
  MdFastfood,
  MdOutlineAirplanemodeActive,
  MdSportsFootball,
  MdMovie,
} from 'react-icons/md';
import { GiClothes, GiSmartphone } from 'react-icons/gi';
import { ImBooks, ImNewspaper } from 'react-icons/im';
import { IoMusicalNotes, IoGameController } from 'react-icons/io5';

export const topics = [
  {
    name: 'food',
    icon: <MdFastfood />,
  },
  {
    name: 'travel',
    icon: <MdOutlineAirplanemodeActive />,
  },
  {
    name: 'music',
    icon: <IoMusicalNotes />,
  },
  {
    name: 'sports',
    icon: <MdSportsFootball />,
  },
  {
    name: 'movies',
    icon: <MdMovie />,
  },
  {
    name: 'books',
    icon: <ImBooks />,
  },
  {
    name: 'fashion',
    icon: <GiClothes />,
  },
  {
    name: 'tech',
    icon: <GiSmartphone />,
  },
  {
    name: 'gaming',
    icon: <IoGameController />,
  },
  {
    name: 'news',
    icon: <ImNewspaper />,
  },
];
