
async function sniff() {
  const address = document.getElementById("contractInput").value.trim();
  const panel = document.getElementById("resultPanel");
  panel.innerHTML = "🔍 Sniffing... Please wait...";

  if (!address) {
    panel.innerHTML = "❌ Please enter a contract address.";
    return;
  }

  try {
    const dexscreener = await fetch(`https://api.dexscreener.io/latest/dex/pairs/solana/${address}`);
    const dexData = await dexscreener.json();

    if (dexData.pair) {
      const info = dexData.pair;
      panel.innerHTML = `
        ✅ <strong>Name:</strong> ${info.baseToken.name}<br>
        🔗 <strong>Pair Address:</strong> ${info.pairAddress}<br>
        💧 <strong>Liquidity (USD):</strong> $${info.liquidity.usd}<br>
        💰 <strong>Price:</strong> $${info.priceUsd}<br>
        📈 <strong>Volume 24h:</strong> $${info.volume.h24}<br>
      `;
      return;
    }
  } catch (err) {
    console.warn("DexScreener failed, trying Axiom API...");
  }

  try {
    const axiom = await fetch(`https://api.axiom.com/v1/sniff/${address}`);
    const axiomData = await axiom.json();

    if (axiomData && axiomData.name) {
      panel.innerHTML = `
        🧠 <strong>Name:</strong> ${axiomData.name}<br>
        💧 <strong>Liquidity:</strong> $${axiomData.liquidity}<br>
        📈 <strong>Volume:</strong> $${axiomData.volume}<br>
        🔍 <strong>Status:</strong> ${axiomData.status}<br>
      `;
      return;
    }
  } catch (err) {
    console.error("Error fetching data from Axiom API", err);
  }

  panel.innerHTML = "❌ Could not retrieve data. Try another address.";
}
