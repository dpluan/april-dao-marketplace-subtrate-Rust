import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const navbars = [
    {
      url: '/',
      title: 'Home',
    },
    {
      url: '/collections',
      title: 'Collections',
    },
    {
      url: '/launchpad',
      title: 'Launchpad',
    },
    {
      url: 'admin/apply',
      title: 'Review collection',
    },
    {
      url: '/apply',
      title: 'Apply for launchpad',
    },
  ];

  return (
    <nav aria-label="alternative nav">
      <div className="bg-gray-800 shadow-xl h-20 fixed bottom-0 md:relative md:h-screen z-10 w-full md:w-48 content-center">
        <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
          <ul className="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
            {navbars.map((nav, index) => {
              return (
                <li className="mr-3 flex-1" key={index}>
                  <Link
                    to={nav.url}
                    className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
                  >
                    <i className="fas fa-tasks pr-0 md:pr-3"></i>
                    <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">
                      {nav.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
