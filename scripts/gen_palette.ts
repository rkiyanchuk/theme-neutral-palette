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
        object: new Color("oklch", [0.440000, 0.020000, 256.000000]),
        accent: false,
      },
      subtext1: {
        name: "Subtext 1",
        object: new Color("oklch", [0.495000, 0.019000, 256.000000]),
        accent: false,
      },
      subtext0: {
        name: "Subtext 0",
        object: new Color("oklch", [0.550000, 0.018000, 256.000000]),
        accent: false,
      },
      overlay2: {
        name: "Overlay 2",
        object: new Color("oklch", [0.605000, 0.017000, 256.000000]),
        accent: false,
      },
      overlay1: {
        name: "Overlay 1",
        object: new Color("oklch", [0.660000, 0.016000, 256.000000]),
        accent: false,
      },
      overlay0: {
        name: "Overlay 0",
        object: new Color("oklch", [0.710000, 0.015000, 256.000000]),
        accent: false,
      },
      surface2: {
        name: "Surface 2",
        object: new Color("oklch", [0.760000, 0.014000, 256.000000]),
        accent: false,
      },
      surface1: {
        name: "Surface 1",
        object: new Color("oklch", [0.810000, 0.012000, 256.000000]),
        accent: false,
      },
      surface0: {
        name: "Surface 0",
        object: new Color("oklch", [0.860000, 0.010000, 256.000000]),
        accent: false,
      },
      base: {
        name: "Base",
        object: new Color("oklch", [0.960000, 0.006000, 256.000000]),
        accent: false,
      },
      mantle: {
        name: "Mantle",
        object: new Color("oklch", [0.935000, 0.007000, 256.000000]),
        accent: false,
      },
      crust: {
        name: "Crust",
        object: new Color("oklch", [0.910000, 0.008000, 256.000000]),
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
        object: new Color("oklch", [0.865000, 0.021000, 248.000000]),
        accent: false,
      },
      subtext1: {
        name: "Subtext 1",
        object: new Color("oklch", [0.810000, 0.022000, 248.000000]),
        accent: false,
      },
      subtext0: {
        name: "Subtext 0",
        object: new Color("oklch", [0.755000, 0.023000, 250.000000]),
        accent: false,
      },
      overlay2: {
        name: "Overlay 2",
        object: new Color("oklch", [0.700000, 0.024000, 249.000000]),
        accent: false,
      },
      overlay1: {
        name: "Overlay 1",
        object: new Color("oklch", [0.645000, 0.024000, 253.000000]),
        accent: false,
      },
      overlay0: {
        name: "Overlay 0",
        object: new Color("oklch", [0.585000, 0.023000, 253.000000]),
        accent: false,
      },
      surface2: {
        name: "Surface 2",
        object: new Color("oklch", [0.525000, 0.022000, 254.000000]),
        accent: false,
      },
      surface1: {
        name: "Surface 1",
        object: new Color("oklch", [0.465000, 0.021000, 255.000000]),
        accent: false,
      },
      surface0: {
        name: "Surface 0",
        object: new Color("oklch", [0.400000, 0.020000, 256.000000]),
        accent: false,
      },
      base: {
        name: "Base",
        object: new Color("oklch", [0.335000, 0.019000, 257.000000]),
        accent: false,
      },
      mantle: {
        name: "Mantle",
        object: new Color("oklch", [0.305000, 0.018000, 258.000000]),
        accent: false,
      },
      crust: {
        name: "Crust",
        object: new Color("oklch", [0.280000, 0.017000, 259.000000]),
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
        object: new Color("oklch", [0.880000, 0.021000, 248.000000]),
        accent: false,
      },
      subtext1: {
        name: "Subtext 1",
        object: new Color("oklch", [0.783000, 0.023000, 248.000000]),
        accent: false,
      },
      subtext0: {
        name: "Subtext 0",
        object: new Color("oklch", [0.690000, 0.025000, 250.000000]),
        accent: false,
      },
      overlay2: {
        name: "Overlay 2",
        object: new Color("oklch", [0.604000, 0.025000, 249.000000]),
        accent: false,
      },
      overlay1: {
        name: "Overlay 1",
        object: new Color("oklch", [0.534000, 0.024000, 253.000000]),
        accent: false,
      },
      overlay0: {
        name: "Overlay 0",
        object: new Color("oklch", [0.475000, 0.021000, 253.000000]),
        accent: false,
      },
      surface2: {
        name: "Surface 2",
        object: new Color("oklch", [0.413000, 0.020000, 254.000000]),
        accent: false,
      },
      surface1: {
        name: "Surface 1",
        object: new Color("oklch", [0.361000, 0.018000, 255.000000]),
        accent: false,
      },
      surface0: {
        name: "Surface 0",
        object: new Color("oklch", [0.319000, 0.017000, 256.000000]),
        accent: false,
      },
      base: {
        name: "Base",
        object: new Color("oklch", [0.245807, 0.015272, 256.805799]),
        accent: false,
      },
      mantle: {
        name: "Mantle",
        object: new Color("oklch", [0.246298, 0.016974, 259.764207]),
        accent: false,
      },
      crust: {
        name: "Crust",
        object: new Color("oklch", [0.190000, 0.014000, 258.000000]),
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
        object: new Color("oklch", [0.880000, 0.021000, 248.000000]),
        accent: false,
      },
      subtext1: {
        name: "Subtext 1",
        object: new Color("oklch", [0.820000, 0.023000, 248.000000]),
        accent: false,
      },
      subtext0: {
        name: "Subtext 0",
        object: new Color("oklch", [0.755000, 0.024000, 250.000000]),
        accent: false,
      },
      overlay2: {
        name: "Overlay 2",
        object: new Color("oklch", [0.690000, 0.024000, 249.000000]),
        accent: false,
      },
      overlay1: {
        name: "Overlay 1",
        object: new Color("oklch", [0.620000, 0.023000, 253.000000]),
        accent: false,
      },
      overlay0: {
        name: "Overlay 0",
        object: new Color("oklch", [0.555000, 0.022000, 253.000000]),
        accent: false,
      },
      surface2: {
        name: "Surface 2",
        object: new Color("oklch", [0.480000, 0.021000, 254.000000]),
        accent: false,
      },
      surface1: {
        name: "Surface 1",
        object: new Color("oklch", [0.410000, 0.020000, 255.000000]),
        accent: false,
      },
      surface0: {
        name: "Surface 0",
        object: new Color("oklch", [0.330000, 0.019000, 256.000000]),
        accent: false,
      },
      base: {
        name: "Base",
        object: new Color("oklch", [0.250000, 0.018000, 257.000000]),
        accent: false,
      },
      mantle: {
        name: "Mantle",
        object: new Color("oklch", [0.225000, 0.016000, 258.000000]),
        accent: false,
      },
      crust: {
        name: "Crust",
        object: new Color("oklch", [0.190000, 0.015000, 259.000000]),
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
