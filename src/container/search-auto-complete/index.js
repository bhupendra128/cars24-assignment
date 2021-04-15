import React, { useState, useCallback } from "react";
import Input from "../../presentation/input";
import Listing from "../../presentation/listing";
import SearchIcon from "../../assets/image/search-icon.svg";
import { throttle } from "../../util";
import axios from "axios";
import "./search-auto-complete.scss";

const SearchAutoComplete = () => {
  const [searchInput, setSearchInput] = useState("");
  const [listingData, setListingData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const callSearchThrottle = throttle((val) => getSearchAPIData(val), 1000);


  const handleOnChange = useCallback(
    (value) => {
      if (value) {
        callSearchThrottle(value);
      } else {
        setListingData([]);
        setErrorMessage("");
      }
      setSearchInput(value);
    },
    [callSearchThrottle]
  );

  const getSearchAPIData = (val) => {
    const endpoint = "https://rickandmortyapi.com/api/character/";
    setIsLoading(true);
    axios
      .get(`${endpoint}?name=${val}`)
      .then((res) => {
        const data = res.data;
        if (data && data.results && data.results.length) {
          setListingData(data.results);
          errorMessage && setErrorMessage("");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setErrorMessage("No Result found");
        setListingData([]);
        setIsLoading(false);
      });
  };


  return (
    <div className="c-search-auto-complete">
      <Input
        handleOnChange={handleOnChange}
        value={searchInput}
        icon={SearchIcon}
        placeHolder="Search...."
      />
      <div className={`${isLoading ? "loading" : ""}`} />
      {errorMessage && !listingData.length ? (
        <div className="error">
          <p>{errorMessage}</p>
        </div>
      ) : null}
      {listingData.length ? <Listing data={listingData} tabIndex={0} /> : null}
    </div>
  );
};

export default SearchAutoComplete;
