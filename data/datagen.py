import json
import random
import math
import datetime

outputs = ['laater', 'innlegg', 'medlemmer']

vowels = "aaaaaaaaaaaeeeeeeeeiiiiiiiooouuyæøå"
consonants = "bddddfgghjkkkllllmmnnnnnprrrrrstttttv"
instruments = ["fele", "fløyte", "trekkspill",
               "hardingfele", "vaskebrett", "bass",
               "klarinett", "torader", "saxofon"]

laatnames1 = ["Berg", "Knert", "Hus", "Gamal",
              "Ring", "Stor", "Lys", "Kofte",
              "Snok", "Låk", "Vår", "Sommer"]
laatnames2 = ["råsa", "valsen", "lia", "polsen",
              "osten", "stugu", "hølet", "spranget",
              "heia", "fjorden", "låven", "bygda"]

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

def randVowel():
    randIndex = math.floor(random.random()*(len(vowels))) 
    return vowels[randIndex];

def randCons(probability=1):
    dieRoll = random.random()
    if(dieRoll > probability):
        return ""

    randIndex = math.floor(dieRoll*len(consonants))
    return consonants[randIndex];

def generateWord(maxLen):
    keepGoing = True;
    result = ""
    
    while(keepGoing and len(result) < maxLen-3):
        syllable = randCons(0.9) + randVowel() + randCons(0.5)
        result += syllable
        
        keepGoing = (True if (random.random() < ((maxLen-len(result))/maxLen)) else False)

    return result

def generateInstrument():
    randIndex = math.floor(random.random()*len(instruments))
    return instruments[randIndex]

def generateDate(startDate=""):
    result = ""
    now = datetime.date.today()
    
    
    curYear = now.year
    curMonth = now.month
    curDay = now.day
    
    startYear = 1967
    startMonth = 9
    startDay = 1

    if(startDate != ""):
        startYear = (int) (startDate[0:4])
        startMonth = (int) (startDate[5:7])
        startDay = (int) (startDate[8:10])
    
    year = curYear + math.ceil(random.random()*(startYear-curYear))
    month = math.ceil(random.random()*12)
    day = -1
    long_months = [1, 3, 5, 7, 8, 10, 12]
    short_months = [4, 6, 9, 11]
    if(month in long_months):
        day = math.ceil(random.random()*31)
    elif(month in short_months):
        day = math.ceil(random.random()*30)
    else:
        if(year % 4 != 0):
            day = math.ceil(random.random()*28)
        elif(year % 100 != 0):
            day = math.ceil(random.random()*29)
        elif(year % 400):
            day = math.ceil(random.random()*28)
        else:
            day = math.ceil(random.random()*29)

    result = "{:4d}-{:02d}-{:02d}".format(year, month, day)
    return result

def generateLaat():
    randIndex1 = math.floor(random.random()*len(laatnames1))
    randIndex2 = math.floor(random.random()*len(laatnames2))
    return laatnames1[randIndex1] + laatnames2[randIndex2]

def generateLaater(number):
    result=[]
    for i in range(1, number+1):
        newName = generateLaat()
        createdDate = generateDate();
        lastUpdated = generateDate(createdDate)
        
        newLaat = {
            "id": i,
            "tittel": newName,
            "pdfUrl": "/noter/" + newName + ".pdf",
            "lydUrl": "/opptak/" + newName + ".mp3",
            "kallenavn": [
                generateLaat() for i in range(0, math.floor(random.random()*3))
            ],
            "createdAt": createdDate,
            "updatedAt": lastUpdated
        }
        result.append(newLaat)

        
    return result

def generateInnlegg(number):
    return [testInnlegg, testInnlegg, testInnlegg]

def generateMedlemmer(number):
    result = []
    for i in range(1, number+1):
        createdDate = generateDate();
        lastUpdated = generateDate(createdDate)
        newMember = {
            "id": i,
            "fornavn": generateWord(10),
            "etternavn": generateWord(10),
            "instrument": generateInstrument(),
            "createdAt": createdDate,
            "updatedAt": lastUpdated
        }
        result.append(newMember)

    return result

def main():
    generateWord(10)

    file_objects=[]
    for name in outputs:
        file_objects.append(((open(name+".json", "w+")),(name)))

    for file in file_objects:
        if file[1] == 'laater':
            file[0].write(json.dumps(generateLaater(50)))

        elif file[1] == 'innlegg':
            file[0].write(json.dumps(generateInnlegg(20)))

        elif file[1] == 'medlemmer':
                file[0].write(json.dumps(generateMedlemmer(40)))
        else:
            print("unreconised data object type " + file[1])
        
        file[0].close()
main()
