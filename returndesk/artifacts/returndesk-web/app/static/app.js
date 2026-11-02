async function refreshStatus() {
  const marker = document.querySelector("#build-status");
  if (!marker) return;

  try {
    await fetch("/api/status");
    marker.textContent = "Available";
  } catch {
    marker.textContent = "unavailable";
  }
}

refreshStatus();
