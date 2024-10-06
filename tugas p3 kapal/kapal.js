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
        if (this.kondisi = "baik"){
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
        this._status = "tersedia";
    }
    tersedia(){
        this._status = "tersedia";
        return `Tikel Kapal ${this.nama} jenis ${this.jenis} pada tanggal ${this.tanggal} untuk harga ${this.harga} masih tersedia`;
    }
    habis(){
        this._status = "habis"
        return `Tiket Kapal ${this.nama} jenis ${this.jenis} pada tanggal ${this.tanggal} untuk harga ${this.harga} sudah habis`;
    }
    getStatus (){
        return `Status tiket kapal ${this.nama} adalah ${this._status}`;
    }
}

let kapalPenumpang = new Kapal("Budiono Siregar", "Ferry", 500, 200, 100)
console.log(kapalPenumpang.infoKapal())
document.getElementById("object").innerHTML = kapalPenumpang.infoKapal()

let cekKondisi = new kondisiKapal("Budiono Siregar", "Ferry", "Pelabuhan Merak")
console.log(cekKondisi.kondisibudi())
document.getElementById("ofjek").innerHTML = cekKondisi.kondisibudi()

let pesanTiket = new TiketKapal("Budiono Siregar", "Ferry", "16 Maret", "RP. 9.999.999,-");
console.log(pesanTiket.tersedia())
console.log(pesanTiket.habis())
console.log(pesanTiket.getStatus())
document.getElementById("objek").innerHTML = pesanTiket.tersedia()

//ketika membuat sebuah kelas diawali dengan membuat nama kelas {..}, baru bikin constructor (..)yang diikitui dengan parameter{this..} setelah itu di buat methodnya. 