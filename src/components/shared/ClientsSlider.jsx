import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import logo1 from "../../assets/client/logo1.png";
import logo2 from "../../assets/client/logo2.png";
import logo3 from "../../assets/client/logo3.png";
import logo4 from "../../assets/client/logo4.png";
import logo5 from "../../assets/client/logo5.png";
import logo6 from "../../assets/client/logo6.png";
import logo7 from "../../assets/client/logo7.png";
import logo8 from "../../assets/client/logo8.png";
import logo9 from "../../assets/client/logo9.png";

const clients = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9];

const ClientsSlider = ({
  headingSize = "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
}) => {
  return (
    <section className="my-12 md:my-16 lg:my-20">
      <div className="text-center mb-10 px-4">
        {/* RESPONSIVE HEADING */}
        <h3 className={`${headingSize} font-bold text-gray-900`}>
          Our Clients
        </h3>

        {/* RESPONSIVE SUBTEXT */}
        <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-600">
          Trusted by leading businesses and organizations.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{ delay: 1500 }}
          speed={1000}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 3 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          {clients.map((logo, i) => (
            <SwiperSlide key={i} className="flex justify-center">
              <img
                src={logo}
                alt={`client-logo-${i}`}
                className="h-8 sm:h-10 md:h-12 lg:h-14 object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ClientsSlider;
