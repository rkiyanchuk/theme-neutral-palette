import { join } from "std/path/join.ts";
import tinycolor from "tinycolor2";
import Color from "colorjs";

import meta from "../deno.json" with { type: "json" };

import type {
  CatppuccinAnsiColors,
  CatppuccinColors,
  CatppuccinFlavor,
  ColorName,
  Flavors,
} from "@catppuccin/palette";

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const entriesFromObject = <T extends object>(obj: T): Entries<T> =>
  Object.entries(obj) as Entries<T>;

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

const definitions = {
  latte: {
    name: "Latte",
    emoji: "🌻",
    dark: false,
    colors: {
      rosewater: {
        name: "Rosewater",
        object: new Color("oklch", [0.714133, 0.104543, 33.096720]),
        accent: true,
      },
      flamingo: {
        name: "Flamingo",
        object: new Color("oklch", [0.685640, 0.125940, 20.867035]),
        accent: true,
      },
      pink: {
        name: "Pink",
        object: new Color("oklch", [0.725560, 0.173933, 338.433343]),
        accent: true,
      },
      mauve: {
        name: "Mauve",
        object: new Color("oklch", [0.554670, 0.250346, 297.015648]),
        accent: true,
      },
      red: {
        name: "Red",
        object: new Color("oklch", [0.550474, 0.215514, 19.809464]),
        accent: true,
      },
      maroon: {
        name: "Maroon",
        object: new Color("oklch", [0.625201, 0.196746, 20.272381]),
        accent: true,
      },
      peach: {
        name: "Peach",
        object: new Color("oklch", [0.691977, 0.204052, 42.429266]),
        accent: true,
      },
      yellow: {
        name: "Yellow",
        object: new Color("oklch", [0.713992, 0.149442, 67.776655]),
        accent: true,
      },
      green: {
        name: "Green",
        object: new Color("oklch", [0.625044, 0.177158, 140.444838]),
        accent: true,
      },
      teal: {
        name: "Teal",
        object: new Color("oklch", [0.602269, 0.098115, 201.104748]),
        accent: true,
      },
      sky: {
        name: "Sky",
        object: new Color("oklch", [0.682020, 0.144819, 235.382219]),
        accent: true,
      },
      sapphire: {
        name: "Sapphire",
        object: new Color("oklch", [0.647744, 0.106769, 212.889281]),
        accent: true,
      },
      blue: {
        name: "Blue",
        object: new Color("oklch", [0.558617, 0.225503, 262.086651]),
        accent: true,
      },
      lavender: {
        name: "Lavender",
        object: new Color("oklch", [0.663763, 0.175103, 273.134604]),
        accent: true,
      },
      text: {
        name: "Text",
        object: new Color("oklch", [0.435470, 0.023008, 259.325021]),
        accent: false,
      },
      subtext1: {
        name: "Subtext 1",
        object: new Color("oklch", [0.492003, 0.018491, 259.299161]),
        accent: false,
      },
      subtext0: {
        name: "Subtext 0",
        object: new Color("oklch", [0.547078, 0.014343, 259.083697]),
        accent: false,
      },
      overlay2: {
        name: "Overlay 2",
        object: new Color("oklch", [0.600878, 0.010490, 258.694364]),
        accent: false,
      },
      overlay1: {
        name: "Overlay 1",
        object: new Color("oklch", [0.653554, 0.006879, 258.120816]),
        accent: false,
      },
      overlay0: {
        name: "Overlay 0",
        object: new Color("oklch", [0.707668, 0.003670, 254.600835]),
        accent: false,
      },
      surface2: {
        name: "Surface 2",
        object: new Color("oklch", [0.758394, 0.000453, 253.153552]),
        accent: false,
      },
      surface1: {
        name: "Surface 1",
        object: new Color("oklch", [0.808307, 0.000000, 251.198155]),
        accent: false,
      },
      surface0: {
        name: "Surface 0",
        object: new Color("oklch", [0.857477, 0.000000, 248.475592]),
        accent: false,
      },
      base: {
        name: "Base",
        object: new Color("oklch", [0.957761, 0.000000, 244.532152]),
        accent: false,
      },
      mantle: {
        name: "Mantle",
        object: new Color("oklch", [0.933459, 0.000000, 244.520602]),
        accent: false,
      },
      crust: {
        name: "Crust",
        object: new Color("oklch", [0.905965, 0.000000, 244.507105]),
        accent: false,
      },
    },
  },
  frappe: {
    name: "Frappé",
    emoji: "🪴",
    dark: true,
    colors: {
      rosewater: {
        name: "Rosewater",
        object: new Color("oklch", [0.895452, 0.033549, 31.599560]),
        accent: true,
      },
      flamingo: {
        name: "Flamingo",
        object: new Color("oklch", [0.843940, 0.055309, 18.306648]),
        accent: true,
      },
      pink: {
        name: "Pink",
        object: new Color("oklch", [0.850369, 0.089242, 336.263305]),
        accent: true,
      },
      mauve: {
        name: "Mauve",
        object: new Color("oklch", [0.764753, 0.110771, 311.743605]),
        accent: true,
      },
      red: {
        name: "Red",
        object: new Color("oklch", [0.717099, 0.124368, 19.385905]),
        accent: true,
      },
      maroon: {
        name: "Maroon",
        object: new Color("oklch", [0.764639, 0.097560, 17.177052]),
        accent: true,
      },
      peach: {
        name: "Peach",
        object: new Color("oklch", [0.772722, 0.110572, 47.726382]),
        accent: true,
      },
      yellow: {
        name: "Yellow",
        object: new Color("oklch", [0.844316, 0.079543, 83.471650]),
        accent: true,
      },
      green: {
        name: "Green",
        object: new Color("oklch", [0.812374, 0.107061, 133.391921]),
        accent: true,
      },
      teal: {
        name: "Teal",
        object: new Color("oklch", [0.782980, 0.072961, 184.644973]),
        accent: true,
      },
      sky: {
        name: "Sky",
        object: new Color("oklch", [0.825502, 0.059160, 209.756111]),
        accent: true,
      },
      sapphire: {
        name: "Sapphire",
        object: new Color("oklch", [0.779553, 0.072675, 227.879689]),
        accent: true,
      },
      blue: {
        name: "Blue",
        object: new Color("oklch", [0.742010, 0.104444, 265.663193]),
        accent: true,
      },
      lavender: {
        name: "Lavender",
        object: new Color("oklch", [0.809899, 0.075883, 283.740494]),
        accent: true,
      },
      text: {
        name: "Text",
        object: new Color("oklch", [0.861916, 0.032553, 253.347361]),
        accent: false,
      },
      subtext1: {
        name: "Subtext 1",
        object: new Color("oklch", [0.808435, 0.030670, 252.677975]),
        accent: false,
      },
      subtext0: {
        name: "Subtext 0",
        object: new Color("oklch", [0.752384, 0.028283, 254.472593]),
        accent: false,
      },
      overlay2: {
        name: "Overlay 2",
        object: new Color("oklch", [0.696974, 0.026370, 253.776912]),
        accent: false,
      },
      overlay1: {
        name: "Overlay 1",
        object: new Color("oklch", [0.640055, 0.023000, 252.613701]),
        accent: false,
      },
      overlay0: {
        name: "Overlay 0",
        object: new Color("oklch", [0.580854, 0.022052, 255.198183]),
        accent: false,
      },
      surface2: {
        name: "Surface 2",
        object: new Color("oklch", [0.521117, 0.018590, 253.999202]),
        accent: false,
      },
      surface1: {
        name: "Surface 1",
        object: new Color("oklch", [0.460057, 0.016661, 252.965799]),
        accent: false,
      },
      surface0: {
        name: "Surface 0",
        object: new Color("oklch", [0.394919, 0.014239, 255.899927]),
        accent: false,
      },
      base: {
        name: "Base",
        object: new Color("oklch", [0.329074, 0.012391, 254.758046]),
        accent: false,
      },
      mantle: {
        name: "Mantle",
        object: new Color("oklch", [0.297342, 0.009378, 256.214395]),
        accent: false,
      },
      crust: {
        name: "Crust",
        object: new Color("oklch", [0.272002, 0.006387, 255.115405]),
        accent: false,
      },
    },
  },
  macchiato: {
    name: "Macchiato",
    emoji: "🌺",
    dark: true,
    colors: {
      rosewater: {
        name: "Rosewater",
        object: new Color("oklch", [0.910521, 0.028644, 31.132555]),
        accent: true,
      },
      flamingo: {
        name: "Flamingo",
        object: new Color("oklch", [0.862879, 0.047894, 18.120311]),
        accent: true,
      },
      pink: {
        name: "Pink",
        object: new Color("oklch", [0.860804, 0.083028, 336.179893]),
        accent: true,
      },
      mauve: {
        name: "Mauve",
        object: new Color("oklch", [0.771523, 0.125896, 303.898395]),
        accent: true,
      },
      red: {
        name: "Red",
        object: new Color("oklch", [0.737000, 0.125156, 11.194318]),
        accent: true,
      },
      maroon: {
        name: "Maroon",
        object: new Color("oklch", [0.770232, 0.102367, 14.370734]),
        accent: true,
      },
      peach: {
        name: "Peach",
        object: new Color("oklch", [0.798823, 0.106056, 49.637586]),
        accent: true,
      },
      yellow: {
        name: "Yellow",
        object: new Color("oklch", [0.878989, 0.074442, 84.750976]),
        accent: true,
      },
      green: {
        name: "Green",
        object: new Color("oklch", [0.834985, 0.107910, 138.150330]),
        accent: true,
      },
      teal: {
        name: "Teal",
        object: new Color("oklch", [0.821358, 0.075506, 184.100028]),
        accent: true,
      },
      sky: {
        name: "Sky",
        object: new Color("oklch", [0.836935, 0.071869, 209.365774]),
        accent: true,
      },
      sapphire: {
        name: "Sapphire",
        object: new Color("oklch", [0.785077, 0.084521, 228.377975]),
        accent: true,
      },
      blue: {
        name: "Blue",
        object: new Color("oklch", [0.749728, 0.110096, 263.810329]),
        accent: true,
      },
      lavender: {
        name: "Lavender",
        object: new Color("oklch", [0.814365, 0.083352, 279.853667]),
        accent: true,
      },
      text: {
        name: "Text",
        object: new Color("oklch", [0.870825, 0.028078, 253.665091]),
        accent: false,
      },
      subtext1: {
        name: "Subtext 1",
        object: new Color("oklch", [0.811977, 0.025942, 254.267185]),
        accent: false,
      },
      subtext0: {
        name: "Subtext 0",
        object: new Color("oklch", [0.751281, 0.024056, 253.532655]),
        accent: false,
      },
      overlay2: {
        name: "Overlay 2",
        object: new Color("oklch", [0.690488, 0.023335, 254.538771]),
        accent: false,
      },
      overlay1: {
        name: "Overlay 1",
        object: new Color("oklch", [0.627154, 0.021473, 253.732825]),
        accent: false,
      },
      overlay0: {
        name: "Overlay 0",
        object: new Color("oklch", [0.560792, 0.020672, 256.474753]),
        accent: false,
      },
      surface2: {
        name: "Surface 2",
        object: new Color("oklch", [0.493852, 0.018872, 255.683316]),
        accent: false,
      },
      surface1: {
        name: "Surface 1",
        object: new Color("oklch", [0.425904, 0.018509, 256.947676]),
        accent: false,
      },
      surface0: {
        name: "Surface 0",
        object: new Color("oklch", [0.353790, 0.016947, 255.985096]),
        accent: false,
      },
      base: {
        name: "Base",
        object: new Color("oklch", [0.278808, 0.015341, 256.936815]),
        accent: false,
      },
      mantle: {
        name: "Mantle",
        object: new Color("oklch", [0.249251, 0.010481, 258.435034]),
        accent: false,
      },
      crust: {
        name: "Crust",
        object: new Color("oklch", [0.218806, 0.005457, 260.657237]),
        accent: false,
      },
    },
  },
  mocha: {
    name: "Mocha",
    emoji: "🌿",
    dark: true,
    colors: {
      rosewater: {
        name: "Rosewater",
        object: new Color("oklch", [0.922570, 0.023835, 30.491855]),
        accent: true,
      },
      flamingo: {
        name: "Flamingo",
        object: new Color("oklch", [0.879744, 0.041813, 17.975025]),
        accent: true,
      },
      pink: {
        name: "Pink",
        object: new Color("oklch", [0.870033, 0.075158, 336.304085]),
        accent: true,
      },
      mauve: {
        name: "Mauve",
        object: new Color("oklch", [0.787146, 0.118670, 304.769304]),
        accent: true,
      },
      red: {
        name: "Red",
        object: new Color("oklch", [0.755592, 0.129702, 2.764165]),
        accent: true,
      },
      maroon: {
        name: "Maroon",
        object: new Color("oklch", [0.782050, 0.090330, 8.848165]),
        accent: true,
      },
      peach: {
        name: "Peach",
        object: new Color("oklch", [0.823678, 0.101460, 52.629417]),
        accent: true,
      },
      yellow: {
        name: "Yellow",
        object: new Color("oklch", [0.919303, 0.070415, 86.528082]),
        accent: true,
      },
      green: {
        name: "Green",
        object: new Color("oklch", [0.857704, 0.109229, 142.715289]),
        accent: true,
      },
      teal: {
        name: "Teal",
        object: new Color("oklch", [0.858489, 0.079207, 182.749513]),
        accent: true,
      },
      sky: {
        name: "Sky",
        object: new Color("oklch", [0.846711, 0.083336, 210.254541]),
        accent: true,
      },
      sapphire: {
        name: "Sapphire",
        object: new Color("oklch", [0.790650, 0.096490, 228.652679]),
        accent: true,
      },
      blue: {
        name: "Blue",
        object: new Color("oklch", [0.766420, 0.111344, 259.884976]),
        accent: true,
      },
      lavender: {
        name: "Lavender",
        object: new Color("oklch", [0.816596, 0.090952, 277.309243]),
        accent: true,
      },
      text: {
        name: "Text",
        object: new Color("oklch", [0.889296, 0.033254, 256.806]),
        accent: false,
      },
      subtext1: {
        name: "Subtext 1",
        object: new Color("oklch", [0.826710, 0.030000, 256.806]),
        accent: false,
      },
      subtext0: {
        name: "Subtext 0",
        object: new Color("oklch", [0.760051, 0.028850, 256.806]),
        accent: false,
      },
      overlay2: {
        name: "Overlay 2",
        object: new Color("oklch", [0.694831, 0.025591, 256.806]),
        accent: false,
      },
      overlay1: {
        name: "Overlay 1",
        object: new Color("oklch", [0.625042, 0.024581, 256.806]),
        accent: false,
      },
      overlay0: {
        name: "Overlay 0",
        object: new Color("oklch", [0.556345, 0.021372, 256.806]),
        accent: false,
      },
      surface2: {
        name: "Surface 2",
        object: new Color("oklch", [0.482274, 0.020635, 256.806]),
        accent: false,
      },
      surface1: {
        name: "Surface 1",
        object: new Color("oklch", [0.408577, 0.017628, 256.806]),
        accent: false,
      },
      surface0: {
        name: "Surface 0",
        object: new Color("oklch", [0.327944, 0.017525, 256.806]),
        accent: false,
      },
      base: {
        name: "Base",
        object: new Color("oklch", [0.245807, 0.015272, 256.806]),
        accent: false,
      },
      mantle: {
        name: "Mantle",
        object: new Color("oklch", [0.218131, 0.007988, 256.806]),
        accent: false,
      },
      crust: {
        name: "Crust",
        object: new Color("oklch", [0.184994, 0.000553, 256.806]),
        accent: false,
      },
    },
  },
};

const ansiMappings = {
  black: {
    normal: {
      mapping: "", // superfluous, exists to make TypeScript happy
      code: 0,
    },
    bright: {
      code: 8,
    },
  },
  red: {
    normal: {
      mapping: "red",
      code: 1,
    },
    bright: {
      code: 9,
    },
  },
  green: {
    normal: {
      mapping: "green",
      code: 2,
    },
    bright: {
      code: 10,
    },
  },
  yellow: {
    normal: {
      mapping: "yellow",
      code: 3,
    },
    bright: {
      code: 11,
    },
  },
  blue: {
    normal: {
      mapping: "blue",
      code: 4,
    },
    bright: {
      code: 12,
    },
  },
  magenta: {
    normal: {
      mapping: "pink",
      code: 5,
    },
    bright: {
      code: 13,
    },
  },
  cyan: {
    normal: {
      mapping: "teal",
      code: 6,
    },
    bright: {
      code: 14,
    },
  },
  white: {
    normal: {
      mapping: "", // superfluous, exists to make TypeScript happy
      code: 7,
    },
    bright: {
      code: 15,
    },
  },
};

const toHex = (color: Color): string => {
  return color.to("srgb").toString({ format: "hex" });
};

const toRgb = (color: Color): { r: number; g: number; b: number } => {
  const coords = color.to("srgb").toGamut().coords.map((i) =>
    Math.round(i * 255)
  );
  return {
    r: coords[0],
    g: coords[1],
    b: coords[2],
  };
};

const toHsl = (hex: string): { h: number; s: number; l: number } => {
  const { h, s, l } = tinycolor(hex).toHsl();
  return {
    h,
    s,
    l,
  };
};

const toOklch = (color: Color): { l: number; c: number; h: number } => {
  const oklch = color.oklch;
  return {
    l: oklch.l,
    c: oklch.c,
    h: oklch.h,
  };
};

const formatted = entriesFromObject(definitions).reduce(
  (acc, [flavorName, flavor], currentIndex) => {
    acc[flavorName] = {
      name: flavor.name,
      emoji: flavor.emoji,
      order: currentIndex,
      dark: flavor.dark,
      colors: entriesFromObject(flavor.colors).reduce(
        (acc, [colorName, color], currentIndex) => {
          acc[colorName] = {
            name: color.name,
            order: currentIndex,
            hex: toHex(color.object),
            rgb: toRgb(color.object),
            hsl: toHsl(toHex(color.object)),
            oklch: toOklch(color.object),
            accent: color.accent,
          };
          return acc;
        },
        {} as Writeable<CatppuccinColors>,
      ),
      ansiColors: entriesFromObject(ansiMappings).reduce(
        (acc, [name, props], currentIndex) => {
          const mapping = props.normal.mapping as ColorName;
          const normalName = name[0].toUpperCase() +
            name.substring(1).toLowerCase();
          const brightName = `Bright ${normalName}`;
          let normalColor: Color;
          let brightColor: Color;

          if (name == "black") {
            normalColor = flavor.dark
              ? flavor.colors["surface1"].object
              : flavor.colors["subtext1"].object;
            brightColor = flavor.dark
              ? flavor.colors["surface2"].object
              : flavor.colors["subtext0"].object;
          } else if (name == "white") {
            normalColor = flavor.dark
              ? flavor.colors["subtext0"].object
              : flavor.colors["surface2"].object;
            brightColor = flavor.dark
              ? flavor.colors["subtext1"].object
              : flavor.colors["surface1"].object;
          } else {
            normalColor = flavor.colors[mapping].object;
            brightColor = new Color(normalColor);
            brightColor.oklch.l *= flavor.dark ? 0.94 : 1.09;
            brightColor.oklch.c += flavor.dark ? 0.08 : 0;
            brightColor.oklch.h += 2;
          }

          acc[name] = {
            name: normalName,
            order: currentIndex,
            normal: {
              name: normalName,
              hex: toHex(normalColor),
              rgb: toRgb(normalColor),
              hsl: toHsl(toHex(normalColor)),
              code: props.normal.code,
            },
            bright: {
              name: brightName,
              hex: toHex(brightColor),
              rgb: toRgb(brightColor),
              hsl: toHsl(toHex(brightColor)),
              code: props.bright.code,
            },
          };

          return acc;
        },
        {} as Writeable<CatppuccinAnsiColors>,
      ),
    };
    return acc;
  },
  {} as Flavors<Omit<CatppuccinFlavor, "colorEntries" | "ansiColorEntries">>,
);

const __dirname = new URL(".", import.meta.url).pathname;

const result = {
  version: meta.version,
  ...formatted,
};

Deno.writeTextFileSync(
  join(__dirname, "../palette.json"),
  JSON.stringify(result, null, 2),
);
