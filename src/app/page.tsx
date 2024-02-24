"use client"

import { useEffect, useState } from "react";
import { Treatment } from "../models/Treatment";
import { getAllTreatments } from "../controllers/treatmentController";

const Home = () => {
  const [data, setData] = useState<Treatment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const treatments = await getAllTreatments();
      setData(treatments);
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((treatment) => (
        <div key={treatment.id}>
          <h1>{treatment.treatment}</h1>
        </div>
      ))}
    </div>
  );
};

export default Home;
