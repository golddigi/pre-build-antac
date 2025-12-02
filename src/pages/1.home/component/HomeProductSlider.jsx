// HomeProductsSlider.jsx
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { products } from "../../../data/products";
import ProductCard from "../../3.products/components/ProductCard";

const categories = {
  "solar-light": "Solar Lights",
  "led-light": "LED Lights",
  poles: "Lighting Poles",
  "solar-power-plant": "Solar Power Plants",
  services: "Our Services",
};

// --- Lazy wrapper: mounts children only when near viewport ---
const LazyMount = ({
  children,
  rootMargin = "300px",
  placeholderHeight = 260,
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // If running in SSR (no window), mount immediately to avoid mismatch
  const isSSR = typeof window === "undefined";
  useEffect(() => {
    if (isSSR) {
      setIsVisible(true);
      return;
    }

    if (isVisible) return; // already visible, no need to observe

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            obs.disconnect();
          }
        });
      },
      { root: null, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isVisible, rootMargin, isSSR]);

  return (
    <div ref={ref} aria-busy={!isVisible} className="w-full">
      {isVisible ? (
        children
      ) : (
        // Simple skeleton placeholder — tweak to match your design system
        <div
          style={{ height: placeholderHeight }}
          className="w-full rounded-md bg-white/60 border border-gray-100 shadow-sm flex items-center justify-center animate-pulse"
        >
          <div className="text-sm text-gray-400">Loading product…</div>
        </div>
      )}
    </div>
  );
};

// Slider for each category
const CategorySlider = ({ title, items }) => {
  const prevBtn = useRef(null);
  const nextBtn = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="mb-20 relative">
      {/* Category Title */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 border-l-4 border-green-600 pl-4">
          {title}
        </h3>
      </div>

      {/* Navigation Buttons */}
      <button
        ref={prevBtn}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-4 md:-translate-x-6 
        z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
        flex items-center justify-center hover:opacity-70 transition-all 
        ${isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        aria-label={`Previous ${title}`}
      >
        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-700">
          &lsaquo;
        </span>
      </button>

      <button
        ref={nextBtn}
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-4 md:translate-x-6 
        z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
        flex items-center justify-center hover:opacity-70 transition-all 
        ${isEnd ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        aria-label={`Next ${title}`}
      >
        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-700">
          &rsaquo;
        </span>
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        loop={false}
        speed={400}
        allowTouchMove={true}
        navigation={{
          prevEl: prevBtn.current,
          nextEl: nextBtn.current,
        }}
        onBeforeInit={(swiper) => {
          // safe way to attach navigation refs
          swiper.params.navigation.prevEl = prevBtn.current;
          swiper.params.navigation.nextEl = nextBtn.current;
        }}
        onInit={handleSlideChange}
        onSlideChange={handleSlideChange}
        spaceBetween={15}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 10 },
          380: { slidesPerView: 2.2 },
          480: { slidesPerView: 2.4 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {items.map((product) => (
          <SwiperSlide key={product.id}>
            {/* Lazy-mount the ProductCard when the slide is near viewport */}
            <LazyMount rootMargin="400px" placeholderHeight={280}>
              <ProductCard id={product.id} />
            </LazyMount>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const HomeProductsSlider = () => {
  const getProductsByCategory = (category) =>
    products.filter((p) => p.category === category);

  return (
    <section className="mt-32 sm:mt-40 mb-24 px-4 sm:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Main Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          Our Products
        </h2>

        {/* 🌟 NEW SUBTITLE (matches your design system) */}
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of solar, LED, and lighting solutions crafted
          for performance and reliability.
        </p>
      </div>

      {Object.entries(categories).map(([key, title]) => {
        const items = getProductsByCategory(key);
        if (!items.length) return null;

        return <CategorySlider key={key} title={title} items={items} />;
      })}
    </section>
  );
};

export default HomeProductsSlider;
