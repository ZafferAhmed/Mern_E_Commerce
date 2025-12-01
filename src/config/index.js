export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
    cols: 50,
    maxLength: 500,
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    placeholder: "Select product category",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
      { id: "electronics", label: "Electronics" },
      { id: "jewellery", label: "Jewellery" },
      { id: "other", label: "Other" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    placeholder: "Select product brand",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "reebok", label: "Reebok" },
      { id: "levis", label: "Levis" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
      { id: "samsung", label: "Samsung" },
      { id: "other", label: "Other" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter product sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter product total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shopping/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shopping/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shopping/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shopping/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shopping/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shopping/listing",
  },
  {
    id: "electronics",
    label: "Electronics",
    path: "/shopping/listing",
  },
  {
    id: "jewellery",
    label: "Jewellery",
    path: "/shopping/listing",
  },
];

export const filterOptions = {
  category: [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "kids", label: "Kids" },
    { value: "accessories", label: "Accessories" },
    { value: "footwear", label: "Footwear" },
    { value: "electronics", label: "Electronics" },
    { value: "jewellery", label: "Jewellery" },
    { value: "other", label: "Other" },
  ],
  brand: [
    { value: "nike", label: "Nike" },
    { value: "adidas", label: "Adidas" },
    { value: "puma", label: "Puma" },
    { value: "reebok", label: "Reebok" },
    { value: "levis", label: "Levis" },
    { value: "zara", label: "Zara" },
    { value: "h&m", label: "H&M" },
    { value: "samsung", label: "Samsung" },
    { value: "other", label: "Other" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const CarousalImages = [
  {
    id: 1,
    src: "https://plus.unsplash.com/premium_photo-1760559944817-ae2ae2027be1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "New Collections",
    buttonText: "Explore Now",
    link: "/shopping/listing",
  },
  {
    id: 2,
    src: "https://framerusercontent.com/assets/2EbnvZVNnHTIVEBqbfTLJWRsyWA.mp4",
    alt: "Summer Sale Video",
    buttonText: "Shop Now",
    link: "/shopping/listing",
  },
  {
    id: 3,
    src: "https://plus.unsplash.com/premium_photo-1672883552013-506440b2f11c?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "SALE UP TO 70% OFF",
    buttonText: "Shop Now",
    link: "/shopping/listing",
  },
  {
    id: 4,
    src: "https://plus.unsplash.com/premium_photo-1760531114812-970ed2f93f98?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "New Arrivals",
    buttonText: "Shop Now",
    link: "/shopping/listing",
  },
  {
    id: 5,
    src: "https://fiverr-res.cloudinary.com/images/q_auto%2Cf_auto/gigs/99235753/original/db9bf5cc3855d76d7af92a4d9c43e8cea5f75a34/design-creative-web-banners-sliders-carousel.jpg",
    alt: "FLAT 50% OFF",
    buttonText: "Shop Now",
    link: "/shopping/listing",
  },
  {
    id: 6,
    src: "https://i.pinimg.com/736x/b6/89/96/b68996b0aeb13339740f961ada455a77.jpg",
    alt: "Free Shipping Worldwide",
    buttonText: "Shop Now",
    link: "/shopping/listing",
  },
  {
    id: 7,
    src: "https://images.vexels.com/media/users/3/194698/raw/34d9aa618f832510ce7290b4f183484a-shop-online-slider-template.jpg",
    alt: "Online Shopping Sale",
    buttonText: "Buy Now",
    link: "/shopping/listing",
  },
  {
    id: 8,
    src: "https://cdn.pixabay.com/video/2022/04/25/115069-703067905_large.mp4",
    alt: "Exclusive Offers Video",
    buttonText: "Shop Now",
    link: "/shopping/listing",
  },
  {
    id: 9,
    src: "https://cdn.pixabay.com/video/2022/10/31/137242-766338209_large.mp4",
    alt: "Best Deals Video",
    buttonText: "Shop Now",
    link: "/shopping/listing",
  },
];
