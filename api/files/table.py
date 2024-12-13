import random
import datetime

def generate_random_date(start_date, end_date):
    # start_date und end_date sind datetime.date Objekte
    # Erzeugt ein zufälliges Datum zwischen start_date und end_date
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    return start_date + datetime.timedelta(days=random_days)

def generate_random_time():
    # Erzeugt eine zufällige Uhrzeit im Format HH:MM
    hour = random.randint(8, 17)     # Beispielsweise zwischen 08:00 und 17:59
    minute = random.choice([0,15,30,45])  # Wähle z.B. 15-Minuten-Intervalle
    return f"{hour:02d}:{minute:02d}"

def generate_random_id(start_id, count):
    # Erzeugt eine fortlaufende ID im Format 6-stellig mit führenden Nullen
    return f"{start_id + count:06d}"

def main():
    # Konfigurierbare Parameter
    num_rows = random.randint(10, 100)  # Anzahl der zu generierenden Zeilen
    start_id = random.randint(100000, 999999)  # Startwert für die ID
    start_date = datetime.date(2024, 12, 1)
    end_date = datetime.date(2024, 12, 12)  # Datumsspanne, aus der zufällig gewählt wird
    first_names = ["Hans", "Anna", "Michael", "Sarah", "Thomas", "Julia", "Peter", "Lisa", "Karl", "Erika"]
    last_names = ["Müller", "Schmidt", "Fischer", "Meier", "Braun", "Weber", "Kühn", "Huber", "Schäfer", "Wagner"]
    request_types = [
        "Terminbuchung", "Allgemeine Anfrage", "Dringender Anruf", 
        "Terminänderung", "Rechnungsanfrage"
    ]
    cost_options = [2.50, 3.00]

    rows = []
    for i in range(num_rows):
        # Zufällige Werte generieren
        date = generate_random_date(start_date, end_date).strftime("%Y-%m-%d")
        call_id = generate_random_id(start_id, i)
        name = random.choice(first_names) + " " + random.choice(last_names)
        req_type = random.choice(request_types)
        duration = random.randint(5, 25)  # z.B. Anrufdauer in Minuten
        cost_per_unit = random.choice(cost_options)
        total_cost = duration * cost_per_unit
        call_time = generate_random_time()
        
        # CSV-Zeile erstellen
        row = f"{date},{call_id},{name},{req_type},{duration},{cost_per_unit:.2f},{total_cost:.2f},{call_time}"
        rows.append(row)
    
    # Ausgabe des CSV auf dem Bildschirm
    for r in rows:
        print(r)

if __name__ == "__main__":
    main()
