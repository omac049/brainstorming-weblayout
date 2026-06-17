#!/usr/bin/env node
/** Batch re-capture all organic wireframes with image-load fixes */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url));
const script = path.join(root, "figma-organic-capture.mjs");

const captures = [
  ["76afc64d-14ab-436b-bc14-b481c27a58ab", "http://localhost:3000/organic/homepage", "1440", "900"],
  ["94433536-eb6e-4ec5-bebb-f9b20a26b338", "http://localhost:3000/organic/homepage", "375", "812"],
  ["b1125797-552e-4c17-b940-b76eff9bf270", "http://localhost:3000/organic/online-degrees", "1440", "900"],
  ["14c149fa-e4ad-4749-96b0-9f1e0de2e2b5", "http://localhost:3000/organic/online-degrees", "375", "812"],
  ["88ecae2a-5330-4b49-a8c5-00154e20e462", "http://localhost:3000/organic/blog/what-difference-between-phd-and-doctorate", "1440", "900"],
  ["7472b506-ac67-40b1-943d-ce51b0c0fc3b", "http://localhost:3000/organic/blog/what-difference-between-phd-and-doctorate", "375", "812"],
  ["19caf21f-481b-4f24-b406-515d9ac82a89", "http://localhost:3000/organic/request-information/thank-you", "1440", "900"],
  ["e816df08-4a9d-4d67-9ecd-0f41d8aa33e9", "http://localhost:3000/organic/request-information/thank-you", "375", "812"],
];

function runCapture(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("node", [script, ...args], { stdio: "inherit" });
    child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`exit ${code}`))));
  });
}

for (const args of captures) {
  console.log(`\n=== Capturing ${args[1]} @ ${args[2]}px ===`);
  await runCapture(args);
}

console.log("\nAll captures submitted. Poll Figma for completion.");
