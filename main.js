console.log("cryptip Running!");

import qr from "https://cdn.jsdelivr.net/npm/qr-code-styling@1.6.0-rc.1/+esm";

console.log("Thanks for using CrypTip Version: 0.0.9");

//check if there's a div with id="cryptip"
const cryptipDiv = document.getElementById("cryptip");
if (cryptipDiv) {
  console.log("Cryptip Div Found");
} else {
  console.log("Cryptip Div Not Found");
}

// Get the script tag reference
const scripts = document.getElementsByTagName("script");
const scriptTag = scripts[scripts.length - 1]; // Last script tag
console.log("Script Tag Found:", scriptTag);

const destination = cryptipDiv ? cryptipDiv : scriptTag;

// Get query parameters
const urlParams = new URLSearchParams(scriptTag.src.split("?")[1]);
const address =
  urlParams.get("address") ||
  "bc1q6z4nspyadq0sdq3vkcdtxxzwlywfva557wfqsm0h5g5xnnzrmpdq4cmhe6";
const containerId = urlParams.get("container"); // Optional custom placement

// Determine where to insert the widget
const container = containerId
  ? document.getElementById(containerId)
  : destination.parentNode;

// Create main wrapper
const btcContainer = document.createElement("div");
btcContainer.style.position = "relative";
btcContainer.style.display = "inline-block";
btcContainer.style.cursor = "pointer";
btcContainer.style.color = "gold";
btcContainer.style.margin = ".5rem 1rem";

// Create Bitcoin icon
const btcIcon = document.createElement("span");
btcIcon.textContent = "₿";
btcIcon.style.fontSize = "44px";

// Create popover
const popover = document.createElement("div");
popover.style.position = "fixed";
popover.style.top = "50%";
popover.style.left = "50%";
popover.style.transform = "translate(-50%, -50%)";
popover.style.display = "flex";
popover.style.flexDirection = "column";
popover.style.width = "200px";
popover.style.background = "#444444";
popover.style.border = "1px solid white";
popover.style.borderRadius = "1rem";
popover.style.padding = "10px";
popover.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
popover.style.alignItems = "center";
popover.style.zIndex = "100";
popover.style.display = "none"; // Initially hidden

// Create QR code container
const qrCodeElem = document.createElement("div");

// Create Copy button
const copyBtn = document.createElement("button");
copyBtn.textContent = "Copy Address";
copyBtn.classList.add("hidden");
copyBtn.style.background = "none";
copyBtn.style.color = "white";
copyBtn.style.padding = "1rem 2rem";
copyBtn.style.border = "1px solid white";
copyBtn.style.borderRadius = "1rem";
copyBtn.style.cursor = "pointer";
// copyBtn.style.marginTop = "10px";
copyBtn.style.position = "absolute";
copyBtn.style.left = "0";
copyBtn.style.top = "0";
copyBtn.style.background = "#444444";

// Append elements
popover.appendChild(btcIcon.cloneNode(true));
popover.appendChild(qrCodeElem);
btcContainer.appendChild(copyBtn);
btcContainer.appendChild(btcIcon);
btcContainer.appendChild(popover);
container.insertBefore(btcContainer, destination);

// Generate QR code
const qrCode = new qr({
  width: 150,
  height: 150,
  type: "svg",
  data: address,
  dotsOptions: { color: "#FF9900", type: "dots" },
  cornersSquareOptions: { type: "dot" },
  cornersDotOptions: { type: "dot" },
  backgroundOptions: { color: null },
});
qrCode.append(qrCodeElem);

// Show/hide popover on hover
btcContainer.addEventListener("mouseover", () => {
  popover.style.display = "flex";
  copyBtn.classList.remove("hidden");
});
btcContainer.addEventListener("mouseleave", () => {
  popover.style.display = "none";
  copyBtn.classList.add("hidden");
});

// Copy address function
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(address).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy Address"), 2000);
  });
});

const style = document.createElement("style");
style.textContent = `.hidden {  display: none;}`;
document.head.appendChild(style);
