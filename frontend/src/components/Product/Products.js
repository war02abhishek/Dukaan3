import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../Layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Checkbox from "@mui/material/Checkbox";

const categories = [
  "Laptop",
  "Mobile",
  "Tablet",
  "TV",
  "Camera",
  "Speaker",
  "Headphone",
  "Attire",
  "Watch",
  "Other",
  "AC",
  "Refrigerator",
];

const Products = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [state, setState] = React.useState({
    Laptop: false,
    Mobile: false,
    Tablet: false,
    TV: false,
    Camera: false,
    Speaker: false,
    Headphone: false,
    Attire: false,
    Watch: false,
    Other: false,
    AC: false,
    Refrigerator: false,
  });

  function useQuery() {
    return new URLSearchParams(useLocation().search); //this allow us to use simply as a Hook
  }

  const query = useQuery();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([0, 55000]);

  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);
  const searchQuery = query.get("searchQuery");
  console.log(searchQuery);
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,

  } = useSelector((state) => state.products);
    const [checkboxes, setCheckboxes] = useState([
      { id: 1, checked: false },
      { id: 2, checked: false },
      { id: 3, checked: false },
      { id: 4, checked: false },
      { id: 5, checked: false },
      { id: 6, checked: false },
      { id: 7, checked: false },
      { id: 8, checked: false },
      { id: 9, checked: false },
      { id: 10, checked: false },
      { id: 11, checked: false },
      { id: 12, checked: false },
    ]);

  // const keyword = re;
  // console.log(keyword);
  const handleChangeC = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.checked,
    });
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const handleChange = (category) => {
    setCategory(category);
  };
  const handleCheckboxClick = (id) => {
    setCheckboxes(
      checkboxes.map((checkbox) => {
        if (checkbox.id === id) {
          return { ...checkbox, checked: !checkbox.checked };
        }
        return checkbox;
      })
    );
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    console.log(ratings);
    dispatch(getProduct(searchQuery, currentPage, price, category, ratings));
  }, [
    dispatch,
    searchQuery,
    currentPage,
    price,
    category,
    ratings,
    alert,
    error,
  ]);

  // let count = (filteredProductsCount < productsCount)? productsCount:filteredProductsCount;
  let count =filteredProductsCount;

  console.log(count);
  console.log(resultPerPage);

  // const {
  //   Laptop,
  //   Mobile,
  //   Tablet,
  //   TV,
  //   Camera,
  //   Speaker,
  //   Headphone,
  //   Attire,
  //   Watch,
  //   Other,
  //   AC,
  //   Refrigerator,
  // } = state;


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS--SHOPSTUDIO" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div>No products found</div>
            )}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <hr className="ProductLine" />
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={3550}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category,id) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => {
                    setCategory(category);
                  }}
                >
                  <Checkbox
                    sx={{ "& .MuiSvgIcon-root": { padding: 0.1 } }}
                    checked={checkboxes[id].checked}
                    onClick={() => handleCheckboxClick(checkboxes[id].id)}
                  />

                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage <= count && (
            <div className="paginationBox">
              <Pagination
                default
                classsName="pagination"
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText=">>"
                prevPageText="<<"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
