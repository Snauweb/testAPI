outputs = ['laater', 'innlegg', 'medlemer']
testLaat = {
    "id": 10,
    "tittel": "Bergrosa",
    "pdfUrl": "/noter/bergrosa.pdf",
    "lydUrl": "/opptak/bergrosa.mp3",
    "kallenavn": [
        "Neeei",
        "Ikke bergrosa stopp"
        ],
    "createdAt": "2013-05-17",
    "updatedAt": "2021-04-29"
}

testInnlegg = {
    "id": 2,
    "overskrift": "100 elger, på en gang",
    "tekst": "Løp!",
    "forfatterId": 1,
    "type": "nyhetssak",
    "createdAt": "2013-05-17",
    "updatedAt": "2021-04-29"
}

testMedlem = {
    "id": 5,
    "fornavn": "Johan",
    "etternavn": "van Laaft",
    "instrument": "fele",
    "createdAt": "1970-01-01",
    "updatedAt": "2001-11-23"
}

def main():
    print(testLaat)
    print(testInnlegg)
    print(testMedlem)

main()
