/* eslint-disable @next/next/no-img-element */
"use client";

export default function GochiModal({ text, setModal, coin }: any) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-[190] flex justify-center items-center"
      onClick={() => setModal(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="330"
        height="160"
        viewBox="0 0 330 160"
        fill="none"
      >
        <rect width="330" height="160" fill="url(#pattern0_539_13958)" />
        <defs>
          <pattern
            id="pattern0_539_13958"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_539_13958"
              transform="scale(0.0030303 0.00625)"
            />
          </pattern>
          <image
            id="image0_539_13958"
            width="330"
            height="160"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUoAAACgCAYAAABqgSVVAAAACXBIWXMAAAsTAAALEwEAmpwYAAACsElEQVR4nO3ZsXEaURhG0X89dEQhCqQE2qAO2oBEClQINeFAXs8IW3MzY5tzop1H8qI73y7LfOF0Ol2/+g3gf7Tf75ffnX/70xcB+Nds1ofr9WNAns/n68zMy/PTna4EcCc/3qR3u90yM7MsHwPTogQIPxelJQk8urV/aw9nZpmxKAHSsv67bUkCfPb69j4zFiVAEkqAIJQAQSgBglACBKEECEIJEIQSIAglQBBKgCCUAEEoAYJQAgShBAhCCRCEEiAIJUAQSoAglABBKAGCUAIEoQQIQgkQhBIgCCVAEEqAIJQAQSgBglACBKEECEIJEIQSIAglQBBKgCCUAEEoAYJQAgShBAhCCRCEEiAIJUAQSoAglABBKAGCUAIEoQQIQgkQhBIgCCVAEEqAIJQAQSgBglACBKEECEIJEIQSIAglQBBKgCCUAEEoAYJQAgShBAhCCRCEEiAIJUAQSoAglABBKAGCUAIEoQQIQgkQhBIgCCVAEEqAIJQAQSgBglACBKEECEIJEIQSIAglQBBKgCCUAEEoAYJQAgShBAhCCRCEEiAIJUAQSoAglABBKAGCUAIEoQQIQgkQhBIgCCVAEEqAIJQAQSgBglACBKEECEIJEIQSIAglQBBKgCCUAEEoAYJQAgShBAhCCRCEEiAIJUAQSoAglABBKAGCUAIEoQQIQgkQhBIgCCVAEEqAIJQAQSgBglACBKEECEIJEIQSIAglQBBKgCCUAEEoAYJQAgShBAhCCRCEEiAIJUAQSoAglABBKAGCUAIEoQQIQgkQNpfL5dPBy/PTna4C8Hd4fXufmZm1jxYlQFjWh8PhcJ2Z2W63M2NZAo/ndkkej8dlxqIESJvbg9tvlgCP4qv+WZQAYbk9WL9VAjyq9dvkyqIECL8sypVlCTya2yW5sigBwnfhZDvng8Gd6QAAAABJRU5ErkJggg=="
          />
        </defs>
      </svg>
      <div className="font-neodunggeunmo">{text}</div>
      {coin > 0 && (
        <div className="flex">
          <img src="coin.svg" alt="coin" />
          <div>{coin}</div>
        </div>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="280"
        height="35"
        viewBox="0 0 280 35"
        fill="none"
      >
        <path
          d="M276 0H4V1H2V2H1V4H0V31H1V33H2V34H4V35H276V34H278V33H279V31H280V4H279V2H278V1H276V0Z"
          fill="#3F3F3F"
        />
      </svg>
    </div>
  );
}
