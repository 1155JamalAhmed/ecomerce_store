import React, { useState } from "react";
import { Input } from "../../../components/forms/Input";
import TextArea from "../../../components/forms/TextArea";
import Select from "../../../components/forms/Select";
import { categoriesData } from "../../../static/data";
import { MultiFileUpload } from "../../../components/forms/FileUpload";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import store from "../../../redux/store";
import { createProduct } from "../../../redux/actions/productActions";

const ShopCreateProduct = () => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      return toast.warn("Please select atleast one image");
    }

    setSubmitting(true);
    const productForm = new FormData();
    productForm.append("name", name);
    productForm.append("description", description);
    productForm.append("category", category);
    productForm.append("tags", tags);
    productForm.append("originalPrice", originalPrice);
    productForm.append("discountPrice", discountPrice);
    productForm.append("stock", stock);
    images.forEach((image) => {
      productForm.append("images", image);
    });
    try {
      await store.dispatch(createProduct(productForm));
      setImages([]);
      setName("");
      setDescription("");
      setCategory("");
      setTags("");
      setOriginalPrice("");
      setDiscountPrice("");
      setStock("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h5 className="text-[30px] font-Poppins text-center mb-4">
        Create Product
      </h5>
      {/* Create Product Form */}
      <form onSubmit={formSubmitHandler} className="space-y-4">
        <Input
          label="Name"
          name="name"
          type="text"
          isRequired={true}
          value={name}
          onChange={(value) => setName(value)}
          autoComplete={true}
          placeholder="Enter your product name..."
        />
        <TextArea
          label="Description"
          name="description"
          type="text"
          isRequired={true}
          value={description}
          onChange={(value) => setDescription(value)}
          autoComplete={true}
          placeholder="Enter your product description..."
        />
        <Select
          label="Category"
          name="category"
          isRequired={true}
          value={category}
          onChange={(value) => setCategory(value)}
          options={categoriesData}
        />
        <Input
          label="Tags"
          name="tags"
          type="text"
          value={tags}
          onChange={(value) => setTags(value)}
          autoComplete={true}
          placeholder="Enter your product tags..."
        />
        <Input
          label="Original Price"
          name="originalPrice"
          type="number"
          value={originalPrice}
          onChange={(value) => setOriginalPrice(value)}
          autoComplete={true}
          placeholder="Enter your product original price..."
        />
        <Input
          label="Price (After Discount)"
          name="discountPrice"
          type="number"
          isRequired={true}
          value={discountPrice}
          onChange={(value) => setDiscountPrice(value)}
          autoComplete={true}
          placeholder="Enter your product price after discount..."
        />
        <Input
          label="Stock"
          name="stock"
          type="number"
          isRequired={true}
          value={stock}
          onChange={(value) => setStock(value)}
          autoComplete={true}
          placeholder="Enter total qauntity of product..."
        />
        <MultiFileUpload
          label="Select Product Images"
          setFilesUpload={setImages}
          filesUpload={images}
          id="product_images"
          isRequired={true}
          totalImagesAllowed={3}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          size="large"
          endIcon={submitting && <CircularProgress color="inherit" size={20} />}
          disabled={submitting}
        >
          {submitting ? "Creating Product" : "Create Product"}
        </Button>
      </form>
    </>
  );
};

export default ShopCreateProduct;
