import React from "react";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { getRandomInt } from "../utls";
import { SpinnerWrapper } from "../components/Spinner/SpinnerWrapper";
import { Layout } from "../components/Layout";

export const Spin = () => {
  return (
    <Layout>
      <SpinnerWrapper />
    </Layout>
  );
};
