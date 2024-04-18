/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('./src/img/ZeroAnonymityHeroText.svg')",
        hindi: "url('./src/img/Namaste.svg')",
        russian: "url('./src/img/RussianMeKuchKuch.svg')",
        spanish: "url('./src/img/Hola.svg')",
        japnese: "url('./src/img/Konichiwa.svg')",
        trail: "url('./src/img/Trail.svg')",
        trailExtended: "url('./src/img/TrailExtended.svg')",
        trailExtended2: "url('./src/img/TrailExtended2.svg')",
        chatBG:"url('./src/img/chatBG.svg')",
        sendBtn:"url('./src/img/SendButton.svg')",
        purpleBig:"url('./src/img/PurpleBigBg.svg')",
        blueBig:"url('./src/img/ChatBGBlue.svg')",
        blueSmall:"url('./src/img/ChatBGL.svg')"

      },
      boxShadow: {
        "3xl": "0px 5px rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};
