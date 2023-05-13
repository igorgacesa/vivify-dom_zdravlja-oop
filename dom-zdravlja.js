"use strict";
class Osoba {
    constructor(ime, prezime) {
        this.ime = ime;
        this.prezime = prezime;
        // if (Osoba.instance) {
        //   return Osoba.instance;
        // }
        // Osoba.instance = this;
    }
}
class Doktor extends Osoba {
    constructor(ime, prezime, specijalnost) {
        super(ime, prezime);
        this.specijalnost = specijalnost;
        Logger.logujBiranjeLekara.bind(this);
    }
    zakaziPregled(pregled) {
        console.log(`Zakazan je pregled ${pregled.tip} za pacijenta ${pregled.pacijent.ime} ${pregled.pacijent.prezime} kod doktora ${this.prezime}`);
    }
}
class Pacijent extends Osoba {
    constructor(ime, prezime, jmbg, brojKartona) {
        super(ime, prezime);
        this.jmbg = jmbg;
        this.brojKartona = brojKartona;
        Logger.logujKreiranjePacijenta.bind(this);
    }
    izaberiLekara(doktor) {
        this.doktor = doktor;
        Logger.logujBiranjeLekara.bind(this);
    }
}
// -----------------------------------------------------------------------------------------------------------------------
class Pregled {
    constructor(datum, vreme, pacijent, tip) {
        this.datum = datum;
        this.vreme = vreme;
        this.pacijent = pacijent;
        this.tip = tip;
    }
    obaviPregled() { }
}
class PregledKrvniPritisak extends Pregled {
    constructor(datum, vreme, pacijent) {
        super(datum, vreme, pacijent, "krvni pritisak");
        this.gornjaVrednost = this.obaviPregled;
        this.donjaVrednost = this.obaviPregled;
        this.puls = this.obaviPregled;
    }
    obaviPregled() {
        console.log(`Obavi pregled krvnog pritiska pacijenta ${this.pacijent.ime} ${this.pacijent.prezime}`);
        this.gornjaVrednost = 120;
        this.donjaVrednost = 80;
        this.puls = 60;
        console.log(`Rezultati pregleda: pritisak je ${this.gornjaVrednost}/${this.donjaVrednost}, puls je ${this.puls}`);
        Logger.logujObavljanjePregleda.bind(this);
    }
}
class PregledNivoSecera extends Pregled {
    constructor(datum, vreme, pacijent) {
        super(datum, vreme, pacijent, "nivo secera");
        this.vrednost = this.obaviPregled;
        this.vremePoslednjegObroka = this.obaviPregled;
    }
    obaviPregled() {
        console.log(`Obavi pregled nivoa secera u krvi za pacijenta ${this.pacijent.ime} ${this.pacijent.prezime}`);
        this.vrednost = 4;
        this.vremePoslednjegObroka = "09.13";
        console.log(`Rezultati pregleda: vrednost ${this.vrednost}, vreme poslednjeg obroka ${this.vremePoslednjegObroka}`);
        Logger.logujObavljanjePregleda.bind(this);
    }
}
class PregledHolesterola extends Pregled {
    constructor(datum, vreme, pacijent) {
        super(datum, vreme, pacijent, "nivo holesterola");
        this.vrednost = this.obaviPregled;
        this.vremePoslednjegObroka = this.obaviPregled;
    }
    obaviPregled() {
        console.log(`Obavi pregled holesterola za pacijenta ${this.pacijent.ime} ${this.pacijent.prezime}`);
        this.vrednost = 25;
        this.vremePoslednjegObroka = "08.26";
        console.log(`Rezultati pregleda: vrednost ${this.vrednost}, vreme poslednjeg obroka ${this.vremePoslednjegObroka}`);
        Logger.logujObavljanjePregleda.bind(this);
    }
}
// -----------------------------------------------------------------------------------------------------------------------
class Logger {
    static logujKreiranjeDoktora(doktor) {
        console.log(`${new Date().toLocaleString()} kreiran je doktor ${doktor.ime}`);
    }
    static logujKreiranjePacijenta(pacijent) {
        console.log(`${new Date().toLocaleString()} kreiran je pacijent ${pacijent.ime}`);
    }
    static logujBiranjeLekara(pacijent, doktor) {
        console.log(`${new Date().toLocaleString()} pacijent ${pacijent.ime} ${pacijent.prezime} je izabrao doktora ${doktor.prezime}`);
    }
    static logujObavljanjePregleda(pregled) {
        console.log(`${new Date().toLocaleString()} pacijent ${pregled.pacijent.ime} je izvrsio pregled ${pregled.tip}`);
    }
}
// -----------------------------------------------------------------------------------------------------------------------
const doktorMilan = new Doktor("Milan", "Milanovic", "internista");
const pacijentDragan = new Pacijent("Dragan", "Jovanovic", "29021945212303", "123456");
doktorMilan.zakaziPregled(new PregledHolesterola("18-3-2023", "16.18", pacijentDragan));
pacijentDragan.izaberiLekara(doktorMilan);
const pregled1 = new PregledKrvniPritisak("8-3-2023", "11.30", pacijentDragan);
const pregled2 = new PregledNivoSecera("9-3-2023", "10.07", pacijentDragan);
pregled1.obaviPregled();
pregled2.obaviPregled();
Logger.logujKreiranjeDoktora(doktorMilan);
Logger.logujKreiranjePacijenta(pacijentDragan);
Logger.logujBiranjeLekara(pacijentDragan, doktorMilan);
Logger.logujObavljanjePregleda(pregled2);
