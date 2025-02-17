import ServiceCategory from "@/components/house-holder/ServiceCategory";
import ServicesList from "@/components/house-holder/ServicesList";
import CategoryHeader from "@/components/house-holder/CategoryHeader";
import React from "react";

function HomeHouseHolder() {
  return (
    <div>
      <CategoryHeader name="All" />
      <ServiceCategory />
      <ServicesList />
    </div>
  );
}

export default HomeHouseHolder;
