import React from "react";
import { EventCategories } from "../components/EventCategories";
import { RecommendedMovies } from "../components/RecommendedMovies";
import { BestOfLiveEvents } from "../components/BestOfLiveEvents";

export const HomePage = () => {
  return (
    <div>
      {/* You can add hero banner or other home elements here later */}
      <RecommendedMovies />
      <BestOfLiveEvents />
      <EventCategories />
    </div>
  );
};