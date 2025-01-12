export default function Footer() {
  const pagesLinks = [
    { href: "#", text: "Home" },
    { href: "#", text: "About" },
    { href: "#", text: "Blog" },
    { href: "#", text: "Contact" },
  ];

  return (
    <footer className="bg-[#212823] text-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content container */}
        <div className="flex flex-col items-center sm:items-start sm:flex-row justify-between space-y-10 sm:space-y-0">
          {/* Garden Care Section */}
          <div className="w-full sm:w-1/3 text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-2">Garden Care</h3>
            <p className="text-sm mb-1">123 Bang Street, Ahmedabad</p>
            <p className="text-sm mb-1">+911776438935</p>
            <p className="text-sm">info@plantworld.com</p>
          </div>

          {/* PlantWorld Section */}
          <div className="w-full sm:w-1/3 text-center">
            <h2 className="text-2xl font-bold mb-2">PlantWorld</h2>
            <p className="text-sm">
              The seed of gardening is a love that never dies, but it never
              grows to the enduring happiness that the love of gardening
              provides to nature.
            </p>
          </div>

          {/* Pages Links Section */}
          <div className="w-full sm:w-1/3 text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-2">Pages</h3>
            <FooterLinks links={pagesLinks} />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-[#555] pt-4 text-center text-sm">
          <p>Copyright ©2024 PlantWorld. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ links }) {
  return (
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.href}
            className="text-sm text-white hover:underline transition-colors"
          >
            {link.text}
          </a>
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