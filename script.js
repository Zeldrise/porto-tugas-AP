// Fungsi untuk Mengatur Perpindahan Tab Menu
function openTab(evt, tabName) {
    let i, tabContent, tabButtons;
    
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].classList.remove("active");
    }
    
    tabButtons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }
    
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Logika Tugas 2: Hitung Gaji Sekuensial
function hitungGajiSekuensial() {
    let gapok = parseFloat(document.getElementById('gajiPokokInput').value);
    
    if (isNaN(gapok) || gapok <= 0) {
        document.getElementById('gajiOutput').innerText = "ERROR: Masukkan besaran Gaji Pokok yang valid!";
        return;
    }

    let pajak = gapok * 0.10;
    let tunjangan = 500000;
    let gajiBersih = gapok - pajak + tunjangan;

    let hasil = `=== SISTEM PERHITUNGAN GAJI ===\n`;
    hasil += `Masukkan Gaji Pokok: ${gapok}\n`;
    hasil += `Pajak (10%)        : ${pajak}\n`;
    hasil += `Tunjangan          : ${tunjangan}\n`;
    hasil += `------------------------------\n`;
    hasil += `Gaji Bersih        : Rp ${gajiBersih.toLocaleString('id-ID')}`;

    document.getElementById('gajiOutput').innerText = hasil;
}

// Fungsi 1: Membuat Form Input Dinamis Berdasarkan Jumlah Barang (Looping Terlihat Nyata)
function generateFormBarang() {
    const jumlah = parseInt(document.getElementById('jumlahJenisBarang').value) || 1;
    const container = document.getElementById('containerFormLooping');
    const tombolHitung = document.getElementById('wrapperTombolHitung');
    
    container.innerHTML = ""; // Bersihkan form lama jika ada
    
    let htmlForm = `<h4 style="margin-bottom: 10px; color: #334155;">Silakan Isi Data untuk ${jumlah} Barang:</h4>`;
    
    // Melakukan perulangan di HTML untuk menggambar form input sebanyak keinginan user
    for (let i = 1; i <= jumlah; i++) {
        htmlForm += `
            <div class="app-box" style="background-color: #fff; margin-bottom: 15px; border-left: 4px solid #2a5298;">
                <strong style="color: #2a5298; display:block; margin-bottom: 10px;">--- Data Barang ke-${i} ---</strong>
                <div class="grid-2">
                    <div class="input-group">
                        <label>Nama Barang:</label>
                        <input type="text" class="input-nama-loop" placeholder="Contoh: Pisang" value="${i===1?'pisang':i===2?'keju':'coklat'}">
                    </div>
                    <div class="input-group">
                        <label>Harga Satuan (Rp):</label>
                        <input type="number" class="input-harga-loop" placeholder="Harga" value="${i===1?2000:i===2?4000:5000}">
                    </div>
                    <div class="input-group">
                        <label>Jumlah Beli:</label>
                        <input type="number" class="input-jumlah-loop" placeholder="Jumlah" value="${i===1?5:i===2?5:6}">
                    </div>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = htmlForm;
    tombolHitung.style.display = "block"; // Munculkan tombol hitung akhir
}

// Fungsi 2: Memproses Data Seluruh Barang Menggunakan Perulangan Asli
function prosesKasirLooping() {
    const namaInputs = document.getElementsByClassName('input-nama-loop');
    const hargaInputs = document.getElementsByClassName('input-harga-loop');
    const jumlahInputs = document.getElementsByClassName('input-jumlah-loop');
    const statusValidasi = document.getElementById('kasirValidasiFinal').value.trim().toLowerCase();
    
    const banyakBarang = namaInputs.length;
    
    let totalBelanjaSemua = 0;
    let logTerminal = "=======================================\n";
    logTerminal += "       SISTEM KASIR SWALAYAN SEDERHANA\n";
    logTerminal += "=======================================\n";
    logTerminal += "1. Mulai Transaksi Belanja\n2. Keluar dari Program\n\nPilih menu (1/2): 1\n";
    logTerminal += `Masukkan berapa banyak jenis barang yang dibeli: ${banyakBarang}\n\n`;

    // Penampung HTML untuk tampilan User-Friendly
    let htmlUserFriendly = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 15px;">
            <h4 style="color: #1e3c72; margin:0;">Struk Belanja Digital</h4>
            <span style="background: ${statusValidasi==='lunas'?'#d1fae5':'#fee2e2'}; color: ${statusValidasi==='lunas'?'#065f46':'#991b1b'}; padding: 4px 10px; border-radius: 20px; font-weight: bold; font-size: 0.8rem;">
                ${statusValidasi==='lunas'?'PAID / LUNAS':'UNPAID / BELUM LUNAS'}
            </span>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
            <thead>
                <tr style="background-color: #f8fafc; text-align: left; border-bottom: 2px solid #cbd5e1;">
                    <th style="padding: 8px;">Nama Barang</th>
                    <th style="padding: 8px;">Harga Satuan</th>
                    <th style="padding: 8px; text-align: center;">Qty</th>
                    <th style="padding: 8px; text-align: right;">Total Harga</th>
                    <th style="padding: 8px; text-align: center;">Visual Grafik</th>
                </tr>
            </thead>
            <tbody>
    `;

    // --- PROSES PERULANGAN (LOOPING) ASLI DIMULAI DI SINI ---
    for (let i = 0; i < banyakBarang; i++) {
        let nama = namaInputs[i].value || `Barang ${i+1}`;
        let harga = parseInt(hargaInputs[i].value) || 0;
        let qty = parseInt(jumlahInputs[i].value) || 0;
        
        let totalHargaBarang = harga * qty;
        totalBelanjaSemua += totalHargaBarang;
        
        // Membuat grafik bintang (*)
        let bintang = "";
        for (let j = 0; j < qty; j++) {
            bintang += "*";
        }
        
        // 1. Menyusun Log Output Terminal Simulator
        logTerminal += `--- Data Barang ke-${i+1} ---\n`;
        logTerminal += `[Barang ke-${i+1}] Masukkan Nama Barang: ${nama}\n`;
        logTerminal += `[Barang ke-${i+1}] Masukkan Harga Satuan: ${harga}\n`;
        logTerminal += `[Barang ke-${i+1}] Masukkan Jumlah Beli: ${qty}\n`;
        logTerminal += `Nama Barang   : ${nama}\n`;
        logTerminal += `Harga Satuan  : Rp ${harga}\n`;
        logTerminal += `Jumlah Beli   : ${qty}\n`;
        logTerminal += `Total Harga   : Rp ${totalHargaBarang}\n`;
        logTerminal += `Grafik Jumlah : ${bintang} (${qty} pcs)\n\n`;

        // 2. Menyusun Baris Tabel User Friendly
        htmlUserFriendly += `
            <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px; font-weight: 600; color:#1e293b;">${nama}</td>
                <td style="padding: 10px;">Rp ${harga.toLocaleString('id-ID')}</td>
                <td style="padding: 10px; text-align: center;">${qty}</td>
                <td style="padding: 10px; text-align: right; font-weight: bold; color: #0f172a;">Rp ${totalHargaBarang.toLocaleString('id-ID')}</td>
                <td style="padding: 10px; text-align: center; color: #f59e0b; font-size: 1.1rem; letter-spacing: 2px;">${bintang}</td>
            </tr>
        `;
    }

    logTerminal += `[VALIDASI] Ketik 'LUNAS' untuk menyelesaikan pembayaran: ${document.getElementById('kasirValidasiFinal').value}\n\n`;

    // Cek Status Pembayaran
    if (statusValidasi === "lunas") {
        logTerminal += "Terima kasih! Pembayaran berhasil diverifikasi.\nStatus Pembayaran: LUNAS\n\n";
        logTerminal += "Kembali ke menu utama? (y/n): n\nProgram selesai. Terima kasih!";
    } else {
        logTerminal += "❌ ERROR: Teks Konfirmasi Tidak Sesuai!\nStatus Pembayaran: PENDING";
    }

    // Penyelesaian Tabel User Friendly
    htmlUserFriendly += `
            </tbody>
        </table>
        <div style="margin-top: 15px; text-align: right; font-size: 1.05rem;">
            <strong>Grand Total Belanja: <span style="color: #10b981; font-size: 1.2rem;">Rp ${totalBelanjaSemua.toLocaleString('id-ID')}</span></strong>
        </div>
    `;

    // Tampilkan seluruh data ke Halaman Web
    document.getElementById('outputUserFriendly').innerHTML = htmlUserFriendly;
    document.getElementById('kasirOutputLooping').textContent = logTerminal;
    
    // Munculkan area output pembungkus secara lembut
    document.getElementById('areaOutputKasir').style.display = "block";
}

// Otomatis jalankan form pertama kali saat halaman di-load agar tidak kosong
window.onload = function() {
    if(document.getElementById('jumlahJenisBarang')) {
        generateFormBarang();
    }
};