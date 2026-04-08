import { useTranslations } from "next-intl";
import React from "react";

export default function BannerMainPage() {
  const t = useTranslations("BannerMainPage");
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-10 mt-10 flex flex-col lg:flex-row items-center lg:items-start gap-10">
        <div className="lg:w-1/2 max-w-lg">
          
        </div>
        <div className="lg:w-1/2 relative max-w-lg">
          <div className="rounded-[50%_50%_50%_50%/40%_40%_60%_60%] border-8 border-[#c6d9e3] overflow-hidden">
            <img
              alt="Child wearing aviator hat playing with wooden toy plane on carpet in a bright room with bookshelf and globe"
              className="w-full h-auto object-cover"
              height="400"
              src="https://www.kbcc.cuny.edu/academicdepartments/alliedhealth/images/index-page/AddictionStudiesCertificate800x533Web.png"
              width="600"
            />
          </div>
        </div>
      </section>
    </>
  );
}
