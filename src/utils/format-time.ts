export function getWibDateTime() {
  const date = new Date()
  // Get WIB time parts
  const wib = date.toLocaleString("en-CA", {
    timeZone: "Asia/Jakarta",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  })
  // en-CA gives "yyyy-mm-dd, HH:MM:SS"
  return wib.replace(",", "")
}
