const result = duressManager.verifyPin(hash(pin), config);

if (result === "INVALID") {
  showError();
} else {
  unlockApp(); // SAME for normal & duress
}