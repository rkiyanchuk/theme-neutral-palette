import { ensureDir } from "std/fs/mod.ts";
import palette from "../palette.json" with { type: "json" };

type FlavorName = "latte" | "frappe" | "macchiato" | "mocha";

const flavors: FlavorName[] = ["latte", "frappe", "macchiato", "mocha"];

interface Colors {
  [key: string]: { hex: string };
}

interface Flavor {
  name: string;
  dark: boolean;
  colors: Colors;
}

const uuids: Record<FlavorName, string> = {
  latte: "90f0f3b0-5e74-4d6a-b69d-d4a3b6c8e1f5",
  frappe: "b8c3d1e2-4a5b-4c6d-8e9f-1a2b3c4d5e6f",
  macchiato: "c7d8e9fa-5b6c-4d7e-9f0a-2b3c4d5e6f7a",
  mocha: "627ce890-fabb-4d39-9819-7be71f4bdca7",
};

const escapeXml = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

interface ScopeRule {
  name?: string;
  scope: string;
  foreground?: string;
  fontStyle?: string;
}

const generateTheme = (flavorName: FlavorName, flavor: Flavor): string => {
  const { colors } = flavor;
  const isDark = flavor.dark;

  // Define scope rules with color mappings
  const scopeRules: ScopeRule[] = [
    // Basic text
    {
      name: "Basic text & variable names",
      scope: "text, source, variable.other.readwrite, punctuation.definition.variable",
      foreground: colors.text.hex,
    },
    // Punctuation
    {
      name: "Parentheses, Brackets, Braces",
      scope: "punctuation",
      foreground: colors.overlay2.hex,
    },
    // Comments
    {
      name: "Comments",
      scope: "comment, punctuation.definition.comment",
      foreground: colors.overlay2.hex,
      fontStyle: "italic",
    },
    // Strings
    {
      scope: "string, punctuation.definition.string",
      foreground: colors.green.hex,
    },
    // Escape characters
    {
      scope: "constant.character.escape",
      foreground: colors.pink.hex,
    },
    // Numbers and constants
    {
      name: "Booleans, constants, numbers",
      scope: "constant.numeric, variable.other.constant, entity.name.constant, constant.language",
      foreground: colors.peach.hex,
    },
    // Keywords
    {
      scope: "keyword, storage.type, storage.modifier",
      foreground: colors.mauve.hex,
    },
    // Operators
    {
      name: "Operators",
      scope: "keyword.operator, punctuation.accessor",
      foreground: colors.sky.hex,
    },
    // Functions
    {
      scope: "entity.name.function, meta.function-call, support.function, variable.function",
      foreground: colors.blue.hex,
      fontStyle: "italic",
    },
    // Classes
    {
      name: "Classes",
      scope: "entity.name.class, entity.other.inherited-class, support.class",
      foreground: colors.yellow.hex,
      fontStyle: "italic",
    },
    // Types
    {
      name: "Types",
      scope: "entity.name.type, support.type",
      foreground: colors.yellow.hex,
      fontStyle: "italic",
    },
    // Parameters
    {
      name: "Function parameters",
      scope: "variable.parameter",
      foreground: colors.maroon.hex,
      fontStyle: "italic",
    },
    // Tags (HTML/XML)
    {
      name: "Tags",
      scope: "entity.name.tag",
      foreground: colors.mauve.hex,
    },
    // Tag attributes
    {
      name: "Tag attributes",
      scope: "entity.other.attribute-name",
      foreground: colors.yellow.hex,
      fontStyle: "italic",
    },
    // Properties
    {
      name: "Object properties",
      scope: "meta.property.object, variable.other.property",
      foreground: colors.teal.hex,
    },
    // Markup bold
    {
      name: "Markup bold",
      scope: "markup.bold",
      foreground: colors.red.hex,
      fontStyle: "bold",
    },
    // Markup italic
    {
      name: "Markup italic",
      scope: "markup.italic",
      foreground: colors.red.hex,
      fontStyle: "italic",
    },
    // Markup headings
    {
      name: "Markup headings",
      scope: "markup.heading",
      foreground: colors.blue.hex,
      fontStyle: "bold",
    },
    // Markup links
    {
      name: "Markup links",
      scope: "markup.underline.link, string.other.link",
      foreground: colors.blue.hex,
      fontStyle: "underline",
    },
    // Markup code
    {
      name: "Markup code",
      scope: "markup.inline.raw, markup.fenced_code",
      foreground: colors.green.hex,
    },
    // Diff inserted
    {
      name: "Diff inserted",
      scope: "markup.inserted",
      foreground: colors.green.hex,
    },
    // Diff deleted
    {
      name: "Diff deleted",
      scope: "markup.deleted",
      foreground: colors.red.hex,
    },
    // Diff changed
    {
      name: "Diff changed",
      scope: "markup.changed",
      foreground: colors.yellow.hex,
    },
    // Invalid
    {
      name: "Invalid",
      scope: "invalid, invalid.illegal",
      foreground: colors.red.hex,
    },
  ];

  // Generate XML
  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
    '<plist version="1.0">',
    '  <dict>',
    '    <key>name</key>',
    `    <string>Catppuccin ${flavor.name}</string>`,
    '    <key>semanticClass</key>',
    `    <string>theme.${isDark ? "dark" : "light"}.catppuccin-${flavorName}</string>`,
    '    <key>uuid</key>',
    `    <string>${uuids[flavorName]}</string>`,
    '    <key>author</key>',
    '    <string>Catppuccin Org</string>',
    '    <key>colorSpaceName</key>',
    '    <string>sRGB</string>',
    '    <key>settings</key>',
    '    <array>',
    // Global settings
    '      <dict>',
    '        <key>settings</key>',
    '        <dict>',
    '          <key>background</key>',
    `          <string>${colors.base.hex}</string>`,
    '          <key>foreground</key>',
    `          <string>${colors.text.hex}</string>`,
    '          <key>caret</key>',
    `          <string>${colors.rosewater.hex}</string>`,
    '          <key>lineHighlight</key>',
    `          <string>${colors.surface0.hex}</string>`,
    '          <key>misspelling</key>',
    `          <string>${colors.red.hex}</string>`,
    '          <key>accent</key>',
    `          <string>${colors.mauve.hex}</string>`,
    '          <key>selection</key>',
    `          <string>${colors.surface2.hex}</string>`,
    '          <key>activeGuide</key>',
    `          <string>${colors.surface2.hex}</string>`,
    '          <key>findHighlight</key>',
    `          <string>${colors.surface1.hex}</string>`,
    '          <key>gutterForeground</key>',
    `          <string>${colors.overlay0.hex}</string>`,
    '        </dict>',
    '      </dict>',
  ];

  // Add scope rules
  for (const rule of scopeRules) {
    lines.push('      <dict>');

    if (rule.name) {
      lines.push('        <key>name</key>');
      lines.push(`        <string>${escapeXml(rule.name)}</string>`);
    }

    lines.push('        <key>scope</key>');
    lines.push(`        <string>${escapeXml(rule.scope)}</string>`);
    lines.push('        <key>settings</key>');
    lines.push('        <dict>');

    if (rule.foreground) {
      lines.push('          <key>foreground</key>');
      lines.push(`          <string>${rule.foreground}</string>`);
    }

    if (rule.fontStyle) {
      lines.push('          <key>fontStyle</key>');
      lines.push(`          <string>${rule.fontStyle}</string>`);
    }

    lines.push('        </dict>');
    lines.push('      </dict>');
  }

  // Close the XML
  lines.push('    </array>');
  lines.push('  </dict>');
  lines.push('</plist>');

  return lines.join("\n") + "\n";
};

const main = async () => {
  const outDir = "./dist/bat/themes";
  await ensureDir(outDir);

  console.log("🦇 Generating bat themes...\n");

  for (const flavorName of flavors) {
    const flavor = palette[flavorName] as Flavor;
    const themeContent = generateTheme(flavorName, flavor);
    const filename = `${outDir}/Catppuccin ${flavor.name}.tmTheme`;

    await Deno.writeTextFile(filename, themeContent);

    const emoji =
      flavorName === "latte" ? "🌻" :
      flavorName === "frappe" ? "🪴" :
      flavorName === "macchiato" ? "🌺" :
      "🌿";

    console.log(`${emoji} Generated: ${filename}`);
  }

  console.log("\n✨ All bat themes generated successfully!");
  console.log("\n📋 Usage:");
  console.log("  1. Copy theme files to $(bat --config-dir)/themes/");
  console.log("  2. Run: bat cache --build");
  console.log('  3. Use: bat --theme="Catppuccin Mocha" <file>');
  console.log("\n💡 Example:");
  console.log('  mkdir -p "$(bat --config-dir)/themes"');
  console.log('  cp dist/bat/themes/*.tmTheme "$(bat --config-dir)/themes/"');
  console.log("  bat cache --build");
  console.log('  bat --theme="Catppuccin Mocha" README.md');
};

main();
