import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { setArray } from "../../../../features/visualizer/arrays/arrayVisualizerSlice";

const ArrayVisualizer = () => {
  const dispatch = useDispatch();
  const { array } = useSelector((state) => state.arrayVisualizer);

  useEffect(() => {
    if (array.length === 0) {
      dispatch(setArray([52, 2, 5, 11, 10, 3]));
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-8 ">
      <div className=" h-fit w-full  flex items-center justify-center">
        {array.length === 0 ? (
          <div className="text-center">Array is empty</div>
        ) : (
          <div className="flex flex-wrap  gap-4">
            {array.map((value, index) => (
              <div key={index} className=" flex items-center  h-full w-fit ">
                <motion.div
                  className="  flex flex-col items-center justify-center h-fit"
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                  }}
                >
                  {/* Box containing the value */}
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white text-xl font-bold">
                      {value}
                    </span>
                  </div>
                  {/* Index label */}
                  <div className="text-center  font-medium">{index}</div>
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrayVisualizer;
