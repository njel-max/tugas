class Kapal {
    constructor(nama, jenis, kapasitas, panjang, lebar){
        this.nama = nama,
        this.jenis = jenis,
        this.kapasitas = kapasitas,
        this.panjang = panjang,
        this.lebar = lebar
    }

    infoKapal(){
        return `Kapal ini bernama ${this.nama} yang berjenis ${this.jenis} dengan kapasitas ${this.kapasitas} yang memili dimensi ${this.panjang} x ${this.lebar}`
    }
}

class kondisiKapal extends Kapal {
    constructor (nama, jenis, lokasi){
        super (nama,jenis)
        this.lokasi = lokasi;
        this.kondisi = "baik";
    }

    kondisibudi(){
        if (this.kondisi === "baik"){
            return `Kondisi kapal ${this.nama} jenis ${this.jenis} yang berada di ${this.lokasi} berfungsi dengan baik dan dapat berlayar`
        } else {
            return `Kondidsi kapal ${this.nama} jenis ${this.jenis} yang berada di ${this.lokasi} sedang dalam perbaikan dan tidak dapat berlayar`
        }
    }
}

class TiketKapal extends Kapal{
    constructor (nama, jenis, tanggal, harga){
        super (nama, jenis);
        this.tanggal = tanggal;
        this.harga = harga;
        this._status = "habis";
    }
    tersedia(){
        this._status = "tersedia";
        return `Tiket Kapal ${this.nama} jenis ${this.jenis} pada tanggal ${this.tanggal} untuk harga ${this.harga} masih tersedia`;
    }
    habis(){
        this._status = "habis"
        return `Tiket Kapal ${this.nama} jenis ${this.jenis} pada tanggal ${this.tanggal} untuk harga ${this.harga} sudah habis`;
    }
    getStatus (){
        return `Status tiket kapal ${this.nama} adalah ${this._status}`;
    }
}

class tiketKendaraan extends TiketKapal{
    constructor (nama, jenis, jeniskendaraan, tanggal, harga,){
        super (nama, jenis, tanggal, harga)
        this.jeniskendaraan = jeniskendaraan;
    }
    tersedia(){
        this._status = "tersedia";
        return `Tiket Kapal ${this.nama} jenis ${this.jenis} untuk kendaraan berjenis ${this.jeniskendaraan} pada tanggal ${this.tanggal} dengan harga ${this.harga} masih tersedia`;
    }
    habis(){
        this._status = "habis"
        return `Tiket Kapal ${this.nama} jenis ${this.jenis} untuk kendaraan berjenis ${this.jeniskendaraan}  pada tanggal ${this.tanggal} untuk harga ${this.harga} sudah habis`;
    }
}

class rute extends Kapal{
    constructor(nama, jenis, keberangkatan, pemberhentian, durasiPerjalanan){
        super (nama, jenis)
        this.keberangkatan = keberangkatan;
        this.pemberhentian = pemberhentian;
        this.durasiPerjalanan = durasiPerjalanan;
    }
    infoKapal(){
         return `Kapal ini bernama ${this.nama} yang berjenis ${this.jenis} akan berangkat dari pelabuhan ${this.keberangkatan} dan berhenti pada pelabuhan ${this.pemberhentian} dengan estimasi perjalanan yaitu selama ${this.durasiPerjalanan} jam`
    }
}


let kapalPenumpang = new Kapal("Budiono Siregar", "Ferry", 500, 200, 100)
console.log(kapalPenumpang.infoKapal())
document.getElementById("object").innerHTML = kapalPenumpang.infoKapal()

let cekKondisi = new kondisiKapal("Budiono Siregar", "Ferry", "Pelabuhan Merak")
console.log(cekKondisi.kondisibudi())
document.getElementById("ofjek").innerHTML = cekKondisi.kondisibudi()

let pesanTiket = new TiketKapal("Budiono Siregar", "Ferry", "16 Maret", "RP. 9.999.999,-");
console.log(pesanTiket.infoKapal());
console.log(pesanTiket.getStatus());
document.getElementById("objek").innerHTML = pesanTiket.getStatus()

let pesanTiketK = new tiketKendaraan("Monty Hutabarat", "Cargo", "Mobil trek", "5 Juli", "Rp. 1 Miliyar" )
console.log(pesanTiketK.tersedia());

let perjalanan = new rute("Freddy Simbolon", "Ferry", "Merak", "Bakauheni", "5")
console.log(perjalanan.infoKapal())

//ketika membuat sebuah kelas diawali dengan membuat nama kelas {..}, baru bikin constructor (..)yang diikitui dengan parameter{this..} setelah itu di buat methodnya. 