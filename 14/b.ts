export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");
const [polymer, lines] = results.split("\n\n");
const rules = new Map<string, string>(
  lines.split("\n").map((r) => r.split(" -> ") as [string, string])
);

const counts = new Map<string, number>();
polymer.split("").forEach((char) => {
  counts.set(char, (counts.get(char) ?? 0) + 1);
});

let pairs = new Map<string, number>();
for (let x = 1; x < polymer.length; x++) {
  const pair = polymer[x - 1] + polymer[x];
  pairs.set(pair, (pairs.get(pair) ?? 0) + 1);
}

let steps = 0;
while (steps < 40) {
  const newPairs = new Map<string, number>();
  pairs.forEach((count, pair) => {
    const rule = rules.get(pair);
    if (!rule) return;

    counts.set(rule, (counts.get(rule) ?? 0) + count);

    newPairs.set(pair[0] + rule, (newPairs.get(pair[0] + rule) ?? 0) + count);
    newPairs.set(rule + pair[1], (newPairs.get(rule + pair[1]) ?? 0) + count);
  });
  pairs = newPairs;
  steps++;
}

let min = Infinity;
let max = 0;

counts.forEach((val) => {
  if (val < min) min = val;
  if (val > max) max = val;
});

console.log(max - min);
