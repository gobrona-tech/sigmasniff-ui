function checkContract() {
  const input = document.getElementById("contractInput").value.trim();
  const result = document.getElementById("result");

  if (!input || input.length < 20) {
    result.innerText = "❌ Invalid contract address.";
    result.style.color = "red";
    return;
  }

  // Simulated logic
  if (input.toLowerCase().includes("pump") || input.length > 30) {
    result.innerText = "✅ This contract passed initial sniff!";
    result.style.color = "limegreen";
  } else {
    result.innerText = "⚠️ Low TrustScore - Sniff with caution!";
    result.style.color = "orange";
  }
}
