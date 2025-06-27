import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="relative bg-[#d4f8d8a8] flex">
        {/* Left side */}

        <div>
          {/* Quote */}

          <div className="mx-[10%] mt-[15%] md:mt-[7%] w-[40%] md:w-auto">
            <div
              className="text-green-700 md:font-bold text-sm md:text-xl lg:text-3xl font-serif italic 
                              lg:mb-6"
            >
              " Plants are not just decoration,
            </div>

            <div
              className="text-green-700 md:font-bold text-sm md:text-xl lg:text-3xl font-serif italic 
                              lg:mb-6"
            >
              they are life-givers,
            </div>

            <div
              className="text-green-700 md:font-bold text-sm md:text-xl lg:text-3xl font-serif italic      
                            md:mb-3"
            >
              healers, and friends! "
            </div>
          </div>

          {/* Shop Button */}

          <Link to="/shop">
            <button className="btn btn-success text-xs md:text-base lg:text-lg mx-[10%] mt-[10%] md:mt-[3%]">
              Shop Now
            </button>
          </Link>

          {/* Text Box */}

          <div
            className="container flex flex-col bg-stone-100 rounded-4 p-3 max-w-none mx-[7%]
                        mb-[8%] mt-[20%] w-[130%]    
                        md:mb-[3%] md:mt-[6%] md:max-w-[60%] 
                        lg:mt-[4%] lg:max-w-[47%] "
          >
            <p className="text-xs md:text-sm lg:text-base">
              Plants are nature’s masterpieces, bringing beauty, serenity, and
              fresh air into our homes. They do more than just decorate — they
              heal, calm, and inspire. With every leaf and blossom, plants
              remind us of the resilience and growth found in nature, offering a
              peaceful escape and a deeper connection to the earth.
            </p>
            <div className="flex flex-row mt-4">
              <div className="text-center text-xs md:text-sm lg:text-base pl-[2%]">
                <h5>
                  <b>200+</b>
                </h5>
                <p>Plant Species</p>
              </div>
              <div className="text-center text-xs md:text-sm lg:text-base pl-[9%]">
                <h5>
                  <b>1.2K+</b>
                </h5>
                <p>Members Joined</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Images */}
        <div className="text-white text-xl md:text-2xl font-serif text-center flex lg:gap-16">
          {/* Image 1 Show on large screen only*/}
          <img
            src="/frontend/Home Page/landingImage.webp"
            alt="Plant"
            className="shadow-lg hidden lg:block object-fill
                        rounded-tl-[15%] rounded-tr-[15%] mt-auto w-[70%] h-[75%] mx-[-55%]
                        md:rounded-tl-[45%] md:rounded-tr-[45%] lg:mx-[-70%]"
          />

          {/* Image 2 - Always show */}
          <img
            src="/frontend/Home Page/header 2.jpg"
            alt="Plant"
            className=" shadow-lg max-w-none object-fill mr-[5%]
                        rounded-tl-[40%] rounded-tr-[40%] w-[180%] h-[50%] ml-[-95%] mt-[15%]
                        md:rounded-tl-[40%] md:rounded-tr-[40%] md:mt-auto md:ml-[-65%] 
                          md:w-[150%] md:h-[92%]   
                        lg:rounded-tl-[45%] lg:rounded-tr-[45%] lg:ml-auto lg:w-[85%] lg:h-[95%] "
          />
        </div>
      </div>
    </>
  );
}
