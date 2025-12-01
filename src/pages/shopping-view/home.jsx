import React, { useState, useEffect, useRef } from "react";
import { CarousalImages } from "@/config";
import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  FootprintsIcon,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilteredProducts } from "@/store/shop/productSlice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  { id: "electronics", label: "Electronics", icon: CloudLightning },
  { id: "jewellery", label: "Jewellery", icon: WatchIcon },
  { id: "other", label: "Other", icon: CloudLightning },
];

const BrandsWithImages = [
  {
    id: "nike",
    label: "Nike",
    imageSrc:
      "https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo-1971-now.png",
  },
  {
    id: "adidas",
    label: "Adidas",
    imageSrc:
      "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg",
  },
  {
    id: "puma",
    label: "Puma",
    imageSrc:
      "https://images.seeklogo.com/logo-png/11/2/puma-logo-png_seeklogo-113797.png",
  },
  {
    id: "reebok",
    label: "Reebok",
    imageSrc:
      "https://images.seeklogo.com/logo-png/27/2/reebok-logo-png_seeklogo-272433.png",
  },
  {
    id: "levis",
    label: "Levis",
    imageSrc:
      "https://static.vecteezy.com/system/resources/previews/023/869/043/non_2x/levis-brand-clothes-logo-black-symbol-design-fashion-illustration-free-vector.jpg",
  },
  {
    id: "zara",
    label: "Zara",
    imageSrc:
      "https://static.vecteezy.com/system/resources/thumbnails/024/131/336/small/zara-brand-logo-symbol-clothes-black-design-icon-abstract-illustration-free-vector.jpg",
  },
  {
    id: "h&m",
    label: "H&M",
    imageSrc:
      "https://static.vecteezy.com/system/resources/previews/023/871/762/non_2x/hm-brand-logo-symbol-black-design-hennes-and-mauritz-clothes-fashion-illustration-free-vector.jpg",
  },
  {
    id: "samsung",
    label: "Samsung",
    imageSrc:
      "https://images.seeklogo.com/logo-png/12/2/samsung-logo-png_seeklogo-122019.png",
  },
  {
    id: "other",
    label: "Other",
    imageSrc:
      "https://thumbs.dreamstime.com/b/popular-clothing-brands-logos-280619223.jpg",
  },
];

const ShoppingViewHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const { ProductDetails } = useSelector((state) => state.shopProducts);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === CarousalImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? CarousalImages.length - 1 : prev - 1
    );
  };

  const isVideo = (src) => src.endsWith(".mp4") || src.includes(".mp4");

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === CarousalImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(
      getAllFilteredProducts({
        filteredParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log("ProductDetails", ProductDetails);

  return (
    <div className="flex flex-col justify-center items-center w-full h-auto">
      <div className="relative w-full min-h-[250px] md:min-h-[350px] lg:min-h-[450px] overflow-hidden">
        {CarousalImages.map((item, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 rounded-lg ease-in-out
              ${index === currentIndex ? "opacity-100" : "opacity-0"}
            `}
          >
            {isVideo(item.src) ? (
              <video
                ref={index === currentIndex ? videoRef : null}
                key={`video-${index}`}
                src={item.src}
                muted
                loop
                playsInline
                className="w-full h-full object-fill rounded-lg"
              />
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            <div>
              <Button
                variant="outline"
                className="absolute border-none bottom-10 left-10 text-black -translate-y-1/2 bg-white hover:bg-black hover:text-white/90"
                onClick={() => {
                  item?.link && window.location.replace(item?.link);
                }}
              >
                {item?.buttonText}
                <ChevronRightIcon className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        ))}

        <Button
          onClick={prevSlide}
          variant="outline"
          size="icon"
          className="absolute border-none top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white/60"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </Button>

        <Button
          onClick={nextSlide}
          variant="outline"
          size="icon"
          className="absolute border-none top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white/60"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex justify-center items-center gap-3 mt-4">
        {CarousalImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === currentIndex ? "bg-black" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {categoriesWithIcon &&
            categoriesWithIcon.map((categories) => (
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={categories.id}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categories.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categories.label}</span>
                </CardContent>
              </Card>
            ))}
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {BrandsWithImages.map((brand) => (
            <Card
              key={brand.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardContent className="flex flex-col items-center justify-center p-4 h-40">
                <img
                  src={brand.imageSrc}
                  className="h-24 object-contain mb-4"
                  alt={brand.label}
                />
                <span className="font-semibold text-center">{brand.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ShoppingViewHome;
