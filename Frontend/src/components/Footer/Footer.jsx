import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const pagesLinks = [
    { to: "/", text: "Home" },
    { to: "/about", text: "About" },
    { to: "/shop", text: "Shop" },
    { to: "/blog", text: "Blog" },
    { to: "/contact", text: "Contact" },
  ];

  return (
    <footer className="bg-[#212823] text-white py-10">
      <div className="container mx-auto px-3 md:px-8">
        {/* Content container */}
        <div className="flex flex-row items-start justify-between space-y-0">
          {/* PlantWorld Section */}
          <div className="w-1/3 text-left md:text-center">
            <h3 className="text-left md:text-center text-base md:text-xl lg:text-2xl font-semibold mb-2">
              PlantWorld
            </h3>
            <p className="text-[0.7rem] md:text-sm lg:text-base mb-1">
              123 Bang Street, Ahmedabad
            </p>
            <p className="text-[0.7rem] md:text-sm lg:text-base mb-1">
              +911776438935
            </p>
            <p className="text-[0.7rem] md:text-sm lg:text-base">
              info@plantworld.com
            </p>
          </div>

          {/* PlantWorld Section */}
          <div className="w-1/3 text-center">
            <h2 className="text-left md:text-center text-base md:text-xl lg:text-2xl font-semibold mb-2">
              PlantWorld
            </h2>
            <p className="text-center text-[0.7rem] w-[6rem] md:w-auto md:text-sm lg:text-lg">
              The seed of gardening is a love that never dies, but it never
              grows to the enduring happiness that the love of gardening
              provides to nature.
            </p>
          </div>

          {/* Pages Links Section */}
          <div className="sm:w-1/3 text-center sm:text-left">
            <h3 className="text-center text-base md:text-xl lg:text-2xl font-semibold mb-2">
              Pages
            </h3>
            <FooterLinks links={pagesLinks} />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-[#555] pt-4 text-center text-xs md:text-base lg:text-lg">
          <p>Copyright ©2024 PlantWorld. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ links }) {
  const location = useLocation();

  const handleClick = (e, to) => {
    if (location.pathname === to) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <ul className="md:space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            to={link.to}
            onClick={(e) => handleClick(e, link.to)}
            className="text-xs md:text-base text-white hover:underline transition-colors"
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// import React from "react";
// import styles from "./Footer.module.css";

// const Footer = () => {
//   return (
//     <footer className={styles.footer}>
//       <div className={`${styles.footerContent} container`}>
//         <div className={styles.footerSection}>
//           <h3>Garden Care</h3>
//           <p>123 Bang Street, CA 8034, Ahmedabad</p>
//           <p>+911776438935</p>
//           <p>info@plantworld.com</p>
//         </div>

//         <div className={styles.footerSection}>
//           <h2>PlantWorld</h2>
//           <br />
//           <p>
//             The seed of gardening is a love that never dies, but it never grows
//             to the enduring happiness that the love of gardening provides to
//             nature.
//           </p>
//           {/* <div className={styles.socialIcons}>
//             <a href="#"><i className="fab fa-instagram"></i></a>
//             <a href="#"><i className="fab fa-x-twitter"></i></a>
//             <a href="#"><i className="fab fa-facebook"></i></a>
//           </div> */}
//         </div>

//         <div className={styles.footerSection}>
//           <div>
//             <h3 className="text-center">Pages</h3>
//             <ul>
//               <li>
//                 <a href="#">Home</a>
//               </li>
//               <li>
//                 <a href="#">About</a>
//               </li>
//               <li>
//                 <a href="#">Blog</a>
//               </li>
//               <li>
//                 <a href="#">Team</a>
//               </li>
//               <li>
//                 <a href="#">Contact</a>
//               </li>
//               <li>
//                 <a href="#">Services</a>
//               </li>
//             </ul>
//           </div>

//           {/* <div className={styles.footerSection}> */}
//           {/* <div>
//           <h3>Utility Pages</h3>
//           <ul>
//             <li><a href="#">Style Guide</a></li>
//             <li><a href="#">Not Found</a></li>
//             <li><a href="#">Protected</a></li>
//             <li><a href="#">Licenses</a></li>
//             <li><a href="#">Changelog</a></li>
//           </ul>
//         </div> */}
//         </div>
//       </div>

//       <div className={styles.footerBottom}>
//         <p>Copyright © 2024 PlantWorld. All Rights Reserved</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
