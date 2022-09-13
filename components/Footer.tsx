import React from 'react';
import { footerLinks as Links } from '../utils/constants';

const FooterLinks = ({ items }: { items: string[] }) => {
  return (
    <div className="flex  gap-3 flex-wrap">
      {items.map((item) => (
        <p
          className="text-sm text-gray-600 cursor-pointer hover:underline"
          key={item}
        >
          {item}
        </p>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="mt-5 hidden xl:block overflow-hidden">
      <FooterLinks items={Links} />
      <p className="text-sm  text-gray-700 mt-2">2020 &copy; Kamil Ertekin</p>
    </footer>
  );
};

export default Footer;
