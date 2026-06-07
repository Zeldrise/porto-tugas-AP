let keranjang = []
function tambahBarang() {
  const namaInput = document.getElementById('nama');
  const hargaInput = document.getElementById('harga');
  const jumlahInput = document.getElementById('jumlah');
  const nama = namaInput.value;
  const harga = parseFloat(hargaInput.value);
  const jumlah = parseInt(jumlahInput.value);

  if(!nama || isNaN(harga) || isNaN(jumlah)){
    alert("Pesanan belum diisi ah elah, isi dulu napa!!")
    return;
  }
  const subtotal = harga * jumlah
  keranjang.push({nama, harga, jumlah,subtotal})
  renderTabel()
  namaInput.value = '';
  hargaInput.value = '';
  jumlahInput.value = '';
  namaInput.focus();
}

function renderTabel() {
  const tbody = document.querySelector('#tabelBarang tbody')
  tbody.innerHTML = '';

  keranjang.forEach((item) => {
    tbody.innerHTML += `
    <tr>
      <td>${item.nama}</td>
      <td>Rp ${item.harga.toLocaleString("id-ID")}</td>
      <td>${item.jumlah}</td>
      <td>Rp ${item.subtotal.toLocaleString("id-ID")}</td>
    </tr>
    `;
  });
}

function hitungFinal() {
  if(keranjang.length === 0) {
    alert('Keranjangnya masih kosong bang');
    return;
  }
  let totalBelanja = keranjang.reduce((sum, item) => sum + item.subtotal, 0);
  let diskon = totalBelanja > 200000 ? totalBelanja * 0.05 : 0;
  let setelahDiskon = totalBelanja - diskon;
  let pajak = setelahDiskon * 0.11;
  let totalAkhir = setelahDiskon + pajak;

  document.getElementById('hasil').style.display = 'block';
    document.getElementById('resTotal').innerText = "Rp " + totalBelanja.toLocaleString('id-ID');
    document.getElementById('resDiskon').innerText = "- Rp " + diskon.toLocaleString('id-ID');
    document.getElementById('resPajak').innerText = "Rp " + pajak.toLocaleString('id-ID');
    document.getElementById('resFinal').innerText = "Rp " + totalAkhir.toLocaleString('id-ID');
}