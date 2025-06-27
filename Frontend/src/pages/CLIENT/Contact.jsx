import LeftSection from "../../components/CLIENT/ContactUsPage/LeftSection";
import RightSection from "../../components/CLIENT/ContactUsPage/RightSection";

export default function Contact() {
  return (
    <div className="relative flex justify-center items-center bg-[#ecffed]">
      <div className="flex w-[90%] md:w-[80%] max-w-[1200px] bg-white/80 rounded-[10px] shadow-lg flex-col sm:flex-row mt-7 md:mt-10 mb-5">
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
}
