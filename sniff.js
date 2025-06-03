
// sniff.js - Updated for universal contract support via Axiom API

async function sniff() {
  const address = document.getElementById("contractInput").value.trim();
  const panel = document.getElementById("resultPanel");

  panel.innerHTML = "🔍 Sniffing... Please wait...";

  if (!address || address.length < 20) {
    panel.innerHTML = "❌ Invalid contract address.";
    return;
  }

  try {
    const response = await fetch(`https://api.axiom.com/v1/contracts/${address}`);
    const data = await response.json();

    if (!data || !data.name || !data.liquidity_usd) {
      panel.innerHTML = "❌ No relevant data found for this contract.";
      return;
    }

    panel.innerHTML = `
      ✅ <strong>Name:</strong> ${data.name}<br>
      🔗 <strong>Contract:</strong> ${address}<br>
      💧 <strong>Liquidity (USD):</strong> $${data.liquidity_usd}<br>
      💰 <strong>Price:</strong> $${data.price_usd}<br>
      📈 <strong>Volume 24h:</strong> $${data.volume_24h}<br>
      🛡️ <strong>Honeypot:</strong> ${data.honeypot ? "⚠️ Yes" : "✅ No"}<br>
    `;
  } catch (error) {
    console.error(error);
    panel.innerHTML = "❌ Error fetching data from Axiom API.";
  }
}
