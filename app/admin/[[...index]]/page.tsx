"use client";

import React from "react";
import { NextStudio } from "next-sanity/studio";
import { config } from "@/sanity.config";
const Admin = () => {
  return <NextStudio config={config} />;
};

export default Admin;
