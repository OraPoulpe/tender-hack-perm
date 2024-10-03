import { ThemeConfig } from "antd";

export const themeAntd: ThemeConfig = {
  token: {
    // colorPrimary: '#3B4365',
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    fontSizeHeading3: 26,
  },

  components: {
    Slider: {},

    Layout: {
      siderBg: "#fff",
      lightTriggerBg: "rgb(226 232 240 )",
      // bodyBg: "#rgb(241 245 249",
    },
    Button: {
      defaultShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    },
  },
};
