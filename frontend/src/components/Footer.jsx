import React from 'react';
import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#17203D] text-white py-6 border-t border-[#2d3c66]">
      <div className="container mx-auto px-4">
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="mb-4 md:mb-0 text-sm text-white/70">
            &copy; {currentYear} TaskMaster. All Rights Reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex gap-4 mb-4 md:mb-0">
            <a 
              href="https://github.com/rajarnav0906" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 bg-[#283862] hover:bg-[#b6d07a] rounded-full flex items-center justify-center transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="text-white" />
            </a>
            <a 
              href="https://www.linkedin.com/in/arnav-raj-04211a216/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 bg-[#283862] hover:bg-[#b6d07a] rounded-full flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="text-white" />
            </a>
            <a 
              href="mailto:quantumtide8090@gmail.com" 
              className="w-8 h-8 bg-[#283862] hover:bg-[#b6d07a] rounded-full flex items-center justify-center transition-colors"
              aria-label="Email"
            >
              <FaEnvelope className="text-white" />
            </a>
          </div>
        </div>
        
        {/* Made with love */}
        <div className="text-center mt-4 text-sm text-white/60">
          Made with ❤️ by Arnav Raj
        </div>
      </div>
    </footer>
  );
};

export default Footer;