import { DefaultConfigOptions } from "@formkit/vue";
import { generateClasses } from "@formkit/themes";

const config: DefaultConfigOptions = {
  config: {
    classes: generateClasses({
      global: {
        input: "form__global__input",
        wrapper: "form__global__wrapper",
        fieldset: "form__global__fieldset",
      },
    }),
  },
};

export default config;
