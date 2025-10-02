import React from 'react';
import { Heart, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="-m-6 left-0 h-15 bg-white/5 backdrop-blur-md border-t-3 border-cyan-400/20 text-cyan-100 text-sm flex flex-col sm:flex-row items-center justify-between px-6 py-3">

      {/* Left: Credit Line */}
      <p className="flex items-center gap-1 mb-2 sm:mb-0">
        Made with <Heart size={14} className="text-cyan-200" /> by 
        <span className="text-cyan-300 font-medium ml-1">Abhay Chauhan</span>
      </p>

      {/* Center: Copyright */}
      <p className="text-xs text-cyan-200">
        © {new Date().getFullYear()} Employee Management System. All rights reserved.
      </p>

      {/* Right: Icons */}
      <div className="flex gap-4 mt-2 sm:mt-0">
        <a
          href="https://github.com/git8abhay"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-400 transition"
        >
          <Github size={18} />
        </a>
        <a
          href="https://www.linkedin.com/in/abhay-chauhan29/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-400 transition"
        >
          <Linkedin size={18} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
