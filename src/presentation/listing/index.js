import React from "react";
import './listing.scss';

const Listing = ({ data, tabIndex }) => {
    
  const renderList = () => {
    return data.map((list) => {
      return <li key={list.id} tabIndex={tabIndex}>{list.name}</li>;
    });
  };
  return (
    <div className="c-listing">
      <ul>{renderList()}</ul>
    </div>
  );
};

export default Listing;
