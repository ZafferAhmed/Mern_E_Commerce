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