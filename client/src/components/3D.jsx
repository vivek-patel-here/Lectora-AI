import React from "react";
import Spline from '@splinetool/react-spline';

function D3() {
  return (
    <div>
      {" "}
      <Spline
        scene="https://prod.spline.design/yutmRTIfIvCG9NyL/scene.splinecode"
        className="h-full w-full absolute left-1/4"
      />
    </div>
  );
}

export default D3;
