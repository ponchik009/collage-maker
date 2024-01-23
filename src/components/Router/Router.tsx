import React from "react";
import { Route, Routes } from "react-router-dom";

import { Main } from "../../pages/Main";
import { Collage } from "../../pages/Collage";
import { NotFound } from "../../pages/404";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:name" element={<Collage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
