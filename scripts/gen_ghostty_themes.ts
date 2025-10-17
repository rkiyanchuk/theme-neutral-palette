import { ensureDir } from "std/fs/mod.ts";
import palette from "../palette.json" with { type: "json" };

type FlavorName = "latte" | "frappe" | "macchiato" | "mocha";

const flavors: FlavorName[] = ["latte", "frappe", "macchiato", "mocha"];

interface AnsiColor {
  normal: { hex: string; code: number };
  bright: { hex: string; code: number };
}

interface Colors {
  [key: string]: { hex: string };
}

interface AnsiColors {
  black: AnsiColor;
  red: AnsiColor;
  green: AnsiColor;
  yellow: AnsiColor;
  blue: AnsiColor;
  magenta: AnsiColor;
  cyan: AnsiColor;
  white: AnsiColor;
}

interface Flavor {
  dark: boolean;
  colors: Colors;
  ansiColors: AnsiColors;
}

const generateTheme = (flavorName: FlavorName, flavor: Flavor): string => {
  const { colors, ansiColors } = flavor;

  // Build the 16-color palette from ANSI colors
  const paletteEntries: string[] = [];

  // Map ANSI colors to palette indices (0-15)
  const ansiColorOrder = [
    "black", "red", "green", "yellow", "blue", "magenta", "cyan", "white",
  ];

  ansiColorOrder.forEach((colorName, index) => {
    const ansiColor = ansiColors[colorName as keyof AnsiColors];
    // Normal colors: 0-7
    paletteEntries.push(`palette = ${index}=${ansiColor.normal.hex}`);
  });

  ansiColorOrder.forEach((colorName, index) => {
    const ansiColor = ansiColors[colorName as keyof AnsiColors];
    // Bright colors: 8-15
    paletteEntries.push(`palette = ${index + 8}=${ansiColor.bright.hex}`);
  });

  // Use overlay0 for selection background
  const selectionBg = colors.surface2.hex;

  // Build the theme file
  const lines = [
    "# Catppuccin " + flavorName.charAt(0).toUpperCase() + flavorName.slice(1),
    "",
    ...paletteEntries,
    "",
    `background = ${colors.base.hex.replace('#', '')}`,
    `foreground = ${colors.text.hex.replace('#', '')}`,
    "",
    `cursor-color = ${colors.rosewater.hex.replace('#', '')}`,
    `cursor-text = ${colors.crust.hex.replace('#', '')}`,
    "",
    `selection-background = ${selectionBg.replace('#', '')}`,
    `selection-foreground = ${colors.text.hex.replace('#', '')}`,
    "",
    `split-divider-color = ${colors.surface0.hex.replace('#', '')}`,
  ];

  return lines.join("\n") + "\n";
};

const main = async () => {
  const outDir = "./dist/ghostty/themes";
  await ensureDir(outDir);

  console.log("🎨 Generating Ghostty themes...\n");

  for (const flavorName of flavors) {
    const flavor = palette[flavorName] as Flavor;
    const themeContent = generateTheme(flavorName, flavor);
    const filename = `${outDir}/catppuccin-${flavorName}.conf`;

    await Deno.writeTextFile(filename, themeContent);

    const emoji =
      flavorName === "latte" ? "🌻" :
      flavorName === "frappe" ? "🪴" :
      flavorName === "macchiato" ? "🌺" :
      "🌿";

    console.log(`${emoji} Generated: ${filename}`);
  }

  console.log("\n✨ All Ghostty themes generated successfully!");
  console.log("\n📋 Usage:");
  console.log("  1. Copy a theme file to ~/.config/ghostty/themes/");
  console.log('  2. Add to your ghostty config: theme = catppuccin-<flavor>');
  console.log("\n💡 Example:");
  console.log("  cp themes/catppuccin-mocha.conf ~/.config/ghostty/themes/");
  console.log("  echo 'theme = catppuccin-mocha' >> ~/.config/ghostty/config");
};

main();
