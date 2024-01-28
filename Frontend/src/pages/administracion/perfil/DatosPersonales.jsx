import React from "react";

// components

import CardProfile from "./components/Cards/CardProfile";
import CardSettings from "./components/Cards/CardSettings";

export default function DatosPersonales() {
  return (
    <>
      <div className="flex flex-wrap md:ml-64">
        <div className="w-full">
          <CardSettings />
        </div>
        
      </div>
    </>
  );
}
