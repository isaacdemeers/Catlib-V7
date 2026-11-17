const fs = require("fs");
const readme = fs.readFileSync("README.md", "utf8");
const rSpecial = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g;
function slug(s) {
  return s.toLowerCase().replace(rSpecial, "").replace(/ /g, "-");
}
const linkRe = /\[([^\]]+)\]\(<([^>]+)>\)|\[([^\]]+)\]\(([^)]+)\)/g;
let m;
let bad = 0;
while ((m = linkRe.exec(readme))) {
  const label = m[1] || m[3];
  const dest = m[2] || m[4];
  if (dest.startsWith("http")) continue;
  const hashIdx = dest.indexOf("#");
  const file = hashIdx === -1 ? dest : dest.slice(0, hashIdx);
  const hash = hashIdx === -1 ? "" : dest.slice(hashIdx + 1);
  const exists = fs.existsSync(file);
  let anchorOk = true;
  let expected = "";
  if (hash && exists) {
    const text = fs.readFileSync(file, "utf8");
    const heads = [...text.matchAll(/^#{1,6} +(.+)$/gm)].map((x) => x[1].trim());
    const slugs = heads.map(slug);
    anchorOk = slugs.includes(hash);
    if (!anchorOk) expected = slugs.join(" | ");
  }
  if (!exists || !anchorOk) {
    bad++;
    console.log((exists ? "ANCHOR" : "MISSING") + " | " + label + " -> " + dest);
    if (expected) console.log("  slugs: " + expected);
  } else {
    console.log("OK | " + dest);
  }
}
console.log("bad", bad);
