"use client";

const HungerMeter = ({ hunger }: any) => {
  const maxHunger = 10;
  const meterWidth = 121;
  const meterHeight = 24;
  const barWidth = 8;
  const barHeight = 10;
  const barGap = 3;
  const barStartX = 7;
  const barStartY = 7;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="z-[103]"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 121 24"
      width={meterWidth}
      height={meterHeight}
    >
      <rect
        width={meterWidth}
        height={meterHeight}
        fill="url(#pattern0_535_3808)"
      />
      {[...Array(maxHunger)].map((_, index) => (
        <rect
          key={index}
          x={barStartX + index * (barWidth + barGap)}
          y={barStartY}
          width={barWidth}
          height={barHeight}
          fill={index < hunger ? `url(#pattern${index + 1}_535_3808)` : "none"}
        />
      ))}
      <defs xmlns="http://www.w3.org/2000/svg">
        <pattern
          id="pattern0_535_3808"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref="#image0_535_3808"
            transform="scale(0.00826446 0.0416667)"
          />
        </pattern>
        <pattern
          id="pattern1_535_3808"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref="#image1_535_3808"
            transform="scale(0.125 0.1)"
          />
        </pattern>
        <pattern
          id="pattern2_535_3808"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref="#image1_535_3808"
            transform="scale(0.125 0.1)"
          />
        </pattern>
        <pattern
          id="pattern3_535_3808"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref="#image2_535_3808"
            transform="scale(0.125 0.1)"
          />
        </pattern>
        <pattern
          id="pattern4_535_3808"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref="#image2_535_3808"
            transform="scale(0.125 0.1)"
          />
        </pattern>
        <pattern
          id="pattern5_535_3808"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref="#image3_535_3808"
            transform="scale(0.125 0.1)"
          />
        </pattern>
        <pattern
          id="pattern6_535_3808"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref="#image3_535_3808"
            transform="scale(0.125 0.1)"
          />
        </pattern>
        <pattern
          id="pattern7_535_3808"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref="#image4_535_3808"
            transform="scale(0.125 0.1)"
          />
        </pattern>
        <pattern
          id="pattern8_535_3808"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref="#image4_535_3808"
            transform="scale(0.125 0.1)"
          />
        </pattern>
        <pattern
          id="pattern9_535_3808"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref="#image5_535_3808"
            transform="scale(0.125 0.1)"
          />
        </pattern>
        <pattern
          id="pattern10_535_3808"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref="#image5_535_3808"
            transform="scale(0.125 0.1)"
          />
        </pattern>
        <image
          id="image0_535_3808"
          width="121"
          height="24"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAAYCAYAAADeUlK2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAu0lEQVRoge3asQoCMRCE4V25PFfSiSDa+KJWYpd7rititcJ52AgqyfxfdVyawDApsvHWmmFsu39vAN83xYe7rxZyzlS8M/M8r0KMU5omC5hef0SDr7f773eDjy3LYpfTsZltG02TB5FServmcW6XUmjwIM6HvZmZ1VrdjCZLIGQBhCyAkAUQsgBCFkDIAghZACELIGQBhCzgeXcd82SmUP2KO+uYQjFPFrJpcuBlSH94GSLMea05Ppos4AHyIjkv3Pe7IAAAAABJRU5ErkJggg=="
        />
        <image
          id="image1_535_3808"
          width="8"
          height="10"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAF0lEQVQYlWP8NLvsPwMewIRPclQBAgAA52kDFhoy8r8AAAAASUVORK5CYII="
        />
        <image
          id="image2_535_3808"
          width="8"
          height="10"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAF0lEQVQYlWP8dbbzPwMewIRPclQBAgAAShUDY2AlLtMAAAAASUVORK5CYII="
        />
        <image
          id="image3_535_3808"
          width="8"
          height="10"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAF0lEQVQYlWM883DGfwY8gAmf5KgCBAAAO8ADWCuMsCAAAAAASUVORK5CYII="
        />
        <image
          id="image4_535_3808"
          width="8"
          height="10"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAF0lEQVQYlWPsPDn9PwMewIRPclQBAgAAxY8C/DaNaqMAAAAASUVORK5CYII="
        />
        <image
          id="image5_535_3808"
          width="8"
          height="10"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAF0lEQVQYlWNsOXPyPwMewIRPclQBAgAAAucDLD/qjr0AAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};

export default HungerMeter;
