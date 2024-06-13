import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const fancyOptions = {
  Toolbar: {
    display: {
      left: ["infobar"],
      middle: ["zoomIn", "zoomOut"],
      right: ["slideshow", "close"],
    },
  },
};

try {
  Fancybox.bind("[data-fancybox]", fancyOptions);
} catch (e) {
  console.log("Невозможно инициализировать Fancybox");
}
