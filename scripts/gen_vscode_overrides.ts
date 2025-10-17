import palette from "../palette.json" with { type: "json" };

type FlavorName = "latte" | "frappe" | "macchiato" | "mocha";

const flavors: FlavorName[] = ["latte", "frappe", "macchiato", "mocha"];

console.log("VS Code Color Override Settings:");
console.log("");
console.log('"catppuccin.colorOverrides": {');

flavors.forEach((flavorName, idx) => {
  const flavor = palette[flavorName];
  console.log(`  "${flavorName}": {`);

  const colors = flavor.colors;
  const colorNames = Object.keys(colors).filter((name) => !colors[name].accent);

  colorNames.forEach((colorName, i) => {
    const hex = colors[colorName].hex;
    const comma = i < colorNames.length - 1 ? "," : "";
    console.log(`    "${colorName}": "${hex}"${comma}`);
  });

  const comma = idx < flavors.length - 1 ? "," : "";
  console.log(`  }${comma}`);
});

console.log("}");
console.log("");
console.log("// Copy the above configuration into your VS Code settings.json file");
