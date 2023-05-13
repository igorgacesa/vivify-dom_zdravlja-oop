abstract class Osoba {
  // static instance: Osoba;
  public ime: string;
  public prezime: string;

  constructor(ime: string, prezime: string) {
    this.ime = ime;
    this.prezime = prezime;
    
    // if (Osoba.instance) {
    //   return Osoba.instance;
    // }
    // Osoba.instance = this;
  }
}

class Doktor extends Osoba {
  public specijalnost: string;

  constructor(ime: string, prezime: string, specijalnost: string) {
    super(ime, prezime);
    this.specijalnost = specijalnost;
    Logger.logujBiranjeLekara.bind(this);
  }

  zakaziPregled(pregled: Pregled) {
    console.log(
      `Zakazan je pregled ${pregled.tip} za pacijenta ${pregled.pacijent.ime} ${pregled.pacijent.prezime} kod doktora ${this.prezime}`
    );
  }
}

class Pacijent extends Osoba {
  public jmbg: string;
  public brojKartona: string;
  public doktor: any;

  constructor(ime: string, prezime: string, jmbg: string, brojKartona: string) {
    super(ime, prezime);
    this.jmbg = jmbg;
    this.brojKartona = brojKartona;
    Logger.logujKreiranjePacijenta.bind(this);
  }

  izaberiLekara(doktor: Doktor) {
    this.doktor = doktor;
    Logger.logujBiranjeLekara.bind(this);
  }
}

// -----------------------------------------------------------------------------------------------------------------------

abstract class Pregled {
  public datum: string;
  public vreme: string;
  public pacijent: any;
  public tip: string;

  constructor(datum: string, vreme: string, pacijent: Pacijent, tip: string) {
    this.datum = datum;
    this.vreme = vreme;
    this.pacijent = pacijent;
    this.tip = tip;
  }

  public obaviPregled() {}
}

class PregledKrvniPritisak extends Pregled {
  public gornjaVrednost: any;
  public donjaVrednost: any;
  public puls: any;

  constructor(datum: string, vreme: string, pacijent: Pacijent) {
    super(datum, vreme, pacijent, "krvni pritisak");
    this.gornjaVrednost = this.obaviPregled;
    this.donjaVrednost = this.obaviPregled;
    this.puls = this.obaviPregled;
  }

  public obaviPregled(): void {
    console.log(
      `Obavi pregled krvnog pritiska pacijenta ${this.pacijent.ime} ${this.pacijent.prezime}`
    );

    this.gornjaVrednost = 120;
    this.donjaVrednost = 80;
    this.puls = 60;

    console.log(
      `Rezultati pregleda: pritisak je ${this.gornjaVrednost}/${this.donjaVrednost}, puls je ${this.puls}`
    );

    Logger.logujObavljanjePregleda.bind(this);
  }
}

class PregledNivoSecera extends Pregled {
  public vrednost: any;
  public vremePoslednjegObroka: any;

  constructor(datum: string, vreme: string, pacijent: Pacijent) {
    super(datum, vreme, pacijent, "nivo secera");
    this.vrednost = this.obaviPregled;
    this.vremePoslednjegObroka = this.obaviPregled;
  }

  public obaviPregled(): void {
    console.log(
      `Obavi pregled nivoa secera u krvi za pacijenta ${this.pacijent.ime} ${this.pacijent.prezime}`
    );

    this.vrednost = 4;
    this.vremePoslednjegObroka = "09.13";

    console.log(
      `Rezultati pregleda: vrednost ${this.vrednost}, vreme poslednjeg obroka ${this.vremePoslednjegObroka}`
    );

    Logger.logujObavljanjePregleda.bind(this);
  }
}

class PregledHolesterola extends Pregled {
  public vrednost: any;
  public vremePoslednjegObroka: any;

  constructor(datum: string, vreme: string, pacijent: Pacijent) {
    super(datum, vreme, pacijent, "nivo holesterola");
    this.vrednost = this.obaviPregled;
    this.vremePoslednjegObroka = this.obaviPregled;
  }

  public obaviPregled(): void {
    console.log(
      `Obavi pregled holesterola za pacijenta ${this.pacijent.ime} ${this.pacijent.prezime}`
    );

    this.vrednost = 25;
    this.vremePoslednjegObroka = "08.26";

    console.log(
      `Rezultati pregleda: vrednost ${this.vrednost}, vreme poslednjeg obroka ${this.vremePoslednjegObroka}`
    );

    Logger.logujObavljanjePregleda.bind(this);
  }
}

// -----------------------------------------------------------------------------------------------------------------------

class Logger {
  public static logujKreiranjeDoktora(doktor: Doktor) {
    console.log(
      `${new Date().toLocaleString()} kreiran je doktor ${doktor.ime}`
    );
  }

  public static logujKreiranjePacijenta(pacijent: Pacijent) {
    console.log(
      `${new Date().toLocaleString()} kreiran je pacijent ${pacijent.ime}`
    );
  }

  public static logujBiranjeLekara(pacijent: Pacijent, doktor: Doktor) {
    console.log(
      `${new Date().toLocaleString()} pacijent ${pacijent.ime} ${
        pacijent.prezime
      } je izabrao doktora ${doktor.prezime}`
    );
  }

  public static logujObavljanjePregleda(pregled: Pregled) {
    console.log(
      `${new Date().toLocaleString()} pacijent ${
        pregled.pacijent.ime
      } je izvrsio pregled ${pregled.tip}`
    );
  }
}

// -----------------------------------------------------------------------------------------------------------------------

const doktorMilan = new Doktor("Milan", "Milanovic", "internista");

const pacijentDragan = new Pacijent(
  "Dragan",
  "Jovanovic",
  "29021945212303",
  "123456"
);

doktorMilan.zakaziPregled(
  new PregledHolesterola("18-3-2023", "16.18", pacijentDragan)
);

pacijentDragan.izaberiLekara(doktorMilan);

const pregled1 = new PregledKrvniPritisak("8-3-2023", "11.30", pacijentDragan);
const pregled2 = new PregledNivoSecera("9-3-2023", "10.07", pacijentDragan);

pregled1.obaviPregled();
pregled2.obaviPregled();

Logger.logujKreiranjeDoktora(doktorMilan);
Logger.logujKreiranjePacijenta(pacijentDragan);
Logger.logujBiranjeLekara(pacijentDragan, doktorMilan);
Logger.logujObavljanjePregleda(pregled2);
