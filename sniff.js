async function sniff() {
  const address = document.getElementById("contractInput").value.trim();
  const panel = document.getElementById("resultPanel");
  panel.innerHTML = "🔍 Sniffing... Please wait...";

  try {
    const response = await fetch('https://api.dexscreener.io/latest/dex/pairs/solana/${address}');
    const data = await response.json();

    if (!data.pairs || data.pairs.length === 0) {
      panel.innerHTML = "❌ Could not retrieve data. Try another address.";
      return;
    }

    const info = data.pairs[0];

    panel.innerHTML = `
      ✅ <strong>Name:</strong> ${info.baseToken.name}<br>
      🔗 <strong>Pair Address:</strong> ${info.pairAddress}<br>
      💧 <strong>Liquidity (USD):</strong> $${info.liquidity.usd}<br>
      💰 <strong>Price:</strong> $${info.priceUsd}<br>
      📈 <strong>Volume 24h:</strong> $${info.volume.h24}<br>
    `;
  } catch (err) {
    panel.innerHTML = "❌ Error fetching data.";
    console.error(err);
  }
}
