export const shuttleData = {
  // 1. Satu daftar untuk dropdown "Dari" dan "Ke"
  locations: [
    "Bandara International Lombok (BIL)",
    "Pelabuhan Bangsal",
    "Pelabuhan Lembar",
    "Pelabuhan Gili Mas",
    "Pelabuhan Kayangan",
    "Senggigi",
    "Kuta Mandalika",
    "Mataram Kota",
    "Senaru"
  ],

  // 2. Harga cukup ditulis SATU KALI untuk setiap pasangan rute
  rates: {
    "Bandara International Lombok (BIL)-Senggigi": 100000,
    "Bandara International Lombok (BIL)-Kuta Mandalika": 75000,
    "Bandara International Lombok (BIL)-Pelabuhan Bangsal": 150000,
    "Pelabuhan Bangsal-Senggigi": 70000,
    "Pelabuhan Lembar-Mataram Kota": 60000
    // Tambahkan kombinasi lain yang tersedia
  }
};