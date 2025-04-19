import { ensureDir } from "std/fs/ensure_dir.ts";

import { type CatppuccinFlavor, flavorEntries } from "@catppuccin/palette";

const combinedFile = () => {
  const flavors = flavorEntries.reduce(
    (acc, [flavorName, flavor]) => {
      const accents = flavor.accentColorEntries.reduce(
        (acc, [accentName, accentColor]) => {
          const tints = Object.values(flavor.tints[accentName]).map((color) =>
            color.hex
          );
          const shades = Object.values(flavor.shades[accentName]).map((color) =>
            color.hex
          );

          acc += `    "${accentName}": (
      ${accentColor.hex}, 
      (${tints}), 
      (${shades})
    ),\n`;

          return acc;
        },
        "",
      );

      const monochromaticColors = flavor.monochromaticColorEntries.reduce(
        (acc, [colorName, color]) => {
          acc += `    "${colorName}": (${color.hex}),\n`;
          return acc;
        },
        "",
      );

      acc += `  "${flavorName}": (\n${accents}${monochromaticColors}  ),\n`;

      return acc;
    },
    "",
  );

  return `@use "sass:map";
@use "sass:list";

$palette: (
${flavors}
);

@function get-color($flavor, $color, $variant: null, $index: 1) {
  $base: map.get($palette, $flavor, $color);

  @if $index < 1 or $index > 5 {
    @error "#{$variant} '#{$index}' is invalid. Must be between 1 and 5.";
  }
  
  @if $variant == null {
    @return list.nth($base, 1);
  } @else if $variant == 'tint' {
    @return list.nth(list.nth($base, 2), $index);
  } @else if $variant == 'shade' {
    @return list.nth(list.nth($base, 3), $index);
  } @else {
    @error "Invalid variant: '#{$variant}'. Use 'tint' or 'shade'.";
  }
}
`;
};

const individualFile = (flavor: CatppuccinFlavor) => {
  const accentLines = flavor.accentColorEntries.reduce(
    (acc, [accentName, accentColor]) => {
      const tintColor = flavor.tints[accentName];
      const shadeColor = flavor.shades[accentName];

      for (const [name, { hex }] of Object.entries(tintColor).reverse()) {
        acc += `$${accentName}-${name}: ${hex};\n`;
      }
      acc += `$${accentName}: ${accentColor.hex};\n`;
      for (const [name, { hex }] of Object.entries(shadeColor)) {
        acc += `$${accentName}-${name}: ${hex};\n`;
      }

      return acc;
    },
    "",
  );
  const monochromaticLines = flavor.monochromaticColorEntries.reduce(
    (acc, [colorName, color]) => {
      acc += `$${colorName}: ${color.hex};\n`;
      return acc;
    },
    "",
  );
  return accentLines + monochromaticLines;
};

export const compileScss = async (outDir: string) => {
  await ensureDir(`${outDir}/scss`);

  // write each flavor to its own file
  flavorEntries.map(([flavorName, flavor]) =>
    Deno.writeTextFile(
      `${outDir}/scss/_${flavorName}.scss`,
      individualFile(flavor),
    )
  );

  // and a combined map of all flavors
  Deno.writeTextFile(`${outDir}/scss/_catppuccin.scss`, combinedFile());
};
