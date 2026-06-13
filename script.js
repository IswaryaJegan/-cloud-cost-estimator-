// Pricing data (illustrative, realistic ranges)
const pricing = {
  aws: {
    instance: { nano: 4.5, small: 12, medium: 35, large: 70, xlarge: 140 },
    storagePerGB: 0.10,
    transferPerGB: 0.09
  },
  azure: {
    instance: { nano: 5, small: 13, medium: 38, large: 75, xlarge: 150 },
    storagePerGB: 0.09,
    transferPerGB: 0.087
  },
  gcp: {
    instance: { nano: 4, small: 11, medium: 33, large: 68, xlarge: 135 },
    storagePerGB: 0.08,
    transferPerGB: 0.08
  }
};

function updateCost() {
  const provider = document.getElementById('provider').value;
  const instanceType = document.getElementById('instanceType').value;
  const storageGB = parseInt(document.getElementById('storage').value);
  const transferGB = parseInt(document.getElementById('dataTransfer').value);

  const instCost = pricing[provider].instance[instanceType];
  const storageCost = storageGB * pricing[provider].storagePerGB;
  const transferCost = transferGB * pricing[provider].transferPerGB;
  
  const total = instCost + storageCost + transferCost;
  
  document.getElementById('totalCost').innerHTML = `$${total.toFixed(2)} / month`;
  document.getElementById('breakdown').innerHTML = `
    <div>💻 Instance: $${instCost.toFixed(2)}</div>
    <div>💾 Storage (${storageGB} GB): $${storageCost.toFixed(2)}</div>
    <div>🌐 Data Transfer (${transferGB} GB): $${transferCost.toFixed(2)}</div>
    <hr style="border-color:#1e293b; margin:8px 0">
    <div><strong>Total: $${total.toFixed(2)}</strong></div>
  `;
}

// Update display labels
document.getElementById('storage').addEventListener('input', (e) => {
  document.getElementById('storageValue').innerText = e.target.value + ' GB';
  updateCost();
});
document.getElementById('dataTransfer').addEventListener('input', (e) => {
  document.getElementById('transferValue').innerText = e.target.value + ' GB';
  updateCost();
});
document.getElementById('provider').addEventListener('change', updateCost);
document.getElementById('instanceType').addEventListener('change', updateCost);

// Initialize
updateCost();