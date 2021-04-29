import json

outputs = ['laater', 'innlegg', 'medlemmer']
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

def generateLaater():
    return [testLaat, testLaat, testLaat]

def generateInnlegg():
    return [testInnlegg, testInnlegg, testInnlegg]

def generateMedlemmer():
    return [testMedlem, testMedlem, testMedlem]


def main():
    file_objects=[]
    for name in outputs:
        file_objects.append(((open(name+".json", "w+")),(name)))

    for file in file_objects:
        print(file[1])
        if file[1] == 'laater':
            file[0].write(json.dumps(generateLaater()))

        elif file[1] == 'innlegg':
            file[0].write(json.dumps(generateInnlegg()))

        elif file[1] == 'medlemmer':
                file[0].write(json.dumps(generateInnlegg()))
        else:
            print("unreconised data object type " + file[1])
        
        file[0].close()
main()
