import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className='  bg-tertiary h-10 '>
      <div className='flex flex-col p-2 gap-4 md:flex-row items-center max-w-[1200px] mx-auto justify-between'>
        <div className='items-center justify-center w-full  text-white text-xs font-bold  md:text-sm md:w-auto'>
          © Copyright 2025 BikeMeNow.
        </div>

        <div className='flex gap-4 pr-4 justify-center text-[20px] text-white'>
          <Link
            href='https://www.facebook.com/'
            target='_blank'
            className='hover:text-gray-400 duration-500'
          >
            <FaFacebookF />
          </Link>
          <Link
            href='https://www.instagram.com/'
            target='_blank'
            className='hover:text-gray-400 duration-500'
          >
            <FaInstagram />
          </Link>
          <Link
            href='https://www.youtube.com/'
            target='_blank'
            className='hover:text-gray-400 duration-500'
          >
            <FaYoutube />
          </Link>
          <Link
            href='https://www.tiktok.com/'
            target='_blank'
            className='hover:text-gray-400 duration-500'
          >
            <FaTiktok />
          </Link>
        </div>
      </div>
    </footer>
  );
};