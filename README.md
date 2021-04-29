# Test API for Snaustrindas ekstremt kule nettside
Server som simulerer et API til en backend for læring av vev-programmering
Skal være RESTful, hvem vet? https://restfulapi.net/

## Bygging

Innstaller node og npm
Klon prosjektet

```
git clone https://github.com/Snauweb/testAPI.git
cd testAPI
```
Innstaller avhengigheter
```
npm install
```
Kjør
```
npm start
```
Serveren serves på http://localhost:5000
<!--info-->
## Bruke API
Du kan nå gjøre kall til disse endepunktene med 
```
http://localhost:5000/<endepunkt>
```
```
/medlemmer
/innlegg
/laater
/info
```
Du kan legge til søkeparametre med
```
http://localhost:5000/<endepunkt>?[<nøkkel>=<verdi>]*
```
Mulige nøkler er
```
antall          //Antall objekter du får tilbake
foerDato        //YYYY-MM-DD
etterDato       //YYYY-MM-DD
sorter          //felt-retning
<felt>          //eks. fornavn=Magnus
```
### /medlemmer
Medlem har feltene
```
{
    id: Number,
    fornavn: String,
    etternavn: String,
    instrument: String,
    createdAt: Date,
    updatedAt: Date
}
```

### /innlegg
Nyhetssaker har feltene
```
{
    id: Number,
    overskrift: String,
    tekst: String,
    forfatterId: Number,
    type: String, 
    createdAt: Date,
    updatedAt: Date
}
```
Egne søkenøkler for /innlegg
```
type            //referat eller nyhetssak
```

### /laater
Låter har feltene 
```
{
    id: Number,
    tittel: String,
    pdfUrl: String,
    lydUrl: String,
    kallenavn: String[],
    createdAt: Date,
    updatedAt: Date
}
```

### /info
Returnerer informasjonen fra seksjonen Bruke API