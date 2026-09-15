## 1. Jak uruchomić

Po sklonowaniu repozytorium, wejdź w terminalu do głównego folderu aplikacji a następnie wykonaj poniższe komendy:
```
npm install
npm run build
npm run preview
```
Aplikacja powinna wystartować na porcie `4173`. Otwórz ją w przeglądarce, wpisując `http://localhost:4173` w adresie.

## 2. Co zrobiłeś, a czego nie

Wymagane rzeczy, które zrobiłem, tj. kaskada, flagi, warunki wygranej/przegranej, wybór planszy, licznik min, chording, style oraz testy. Wymagane funkcje i typy są eksportowane z pliku `src/logic/board.ts`.

Z rzeczy wymaganych nie zrobiłem jednego - pierwszego bezpiecznego odkrycia. Obecnie, użytkownik może przegrać już na samym początku. Za tym idzie również brak jednego testu na ten przypadek. Nie zrobiłem tego ze względu na ograniczenie czasowe. Zdecydowałem że poświęcę tą funkcjonalność, ponieważ nie jest ona niezbędna do działania gry.

## 3. Co znalazłeś w danych

W danych w pliku `saper-plansze.json` znalazłem kilka rzeczy, które są sprzeczne lub po prostu nie powinny się tam znaleźć. Oto lista rzeczy, które znalazłem oraz jak je obsłużyłem.

-Poziom "Pomyłka rachmistrza" ma `mineCount` ale jest on niezgodny z faktyczną ilością min w danym poziomie. Zdecydowałem się całkowicie pominąć `mineCount` i opierać się wyłącznie na faktycznej ilości min na planszy.

- W poziomie "Bliźnięta", są dwie miny o takich samych koordynatach. Nie filtrowałem min po unikalności. Sąsiednie komórki posiadają wartość `adjacent` równe 2 zamiast 1. Jest to błąd, którego nie naprawiłem z uwagi na brak czasu. Nie powoduje on jednak że gra się wysypuje. W tym przypadku jedynie chording nie będzie mógł być wykonany.

- W poziomie "Za płotem" jedna z min ma koordynaty poza planszą. Nie jest ona wliczana do warunków wygranej. Warunki wygranej są liczone tylko z min, które są na planszy.

- W poziomie "Łąka" nie ma ani jednej miny. Kliknięcie w jakiekolwiek pole powoduje wygraną, ponieważ kaskadowo wszystkie pola zostają odkryte.

- W poziomie "Ciasno" wszystkie pola mają miny. Powoduje to natychmiastową wygraną, ponieważ został spełniony warunek, odsłonięcia wszystkich pól bez miny, który w tym przypadku wynosi 0. Specjalnie dla tego przypadku dopisałem sprawdzenie czy gra jest wygrana w funkcji `createBoard`.

- W poziomach "Rozgrzewka" oraz "Spacer" nie znalazłem żadnych nieprawidłowości.

## 4. Co było najtrudniejsze

Najtrudniejsze do implementacji były kaskadowość odkrywanych pól oraz chording, ponieważ zawierały one wiele przypadków do obsłużenia. Najbardziej uporczywym przypadkiem w kaskadzie była obsługa klikania w komórki w skrajnie lewej lub skrajnie prawej kolumnie, ponieważ sposób w jaki na początku to zaimplementowałem powodował, że odkrywały się pola po przeciwległej stronie planszy.

## 5. Jakich bibliotek użyłeś i po co

- vitest - biblioteka do testów jednostkowych. Wybrałem ją ponieważ jest rekomendowana w projekcie postawionym na Vite.

## 6. Co zrobiłbyś dalej 

Z rzeczy oczywistych, to UI wymaga wielu ulepszeń. Oczywiście dodałbym warunek pierwszego odkrycia oraz obsługę filtrowania powtarzających się min. Myślę, że sposób implementacji logiki jest do poprawy. Mnóstowo tam warunków a miejscami kod się powtarza. Wymaga to sporej refaktoryzacji. 

## 7. Gdzie korzystałeś z AI

Tak, do zrobienia testów jednostkowych w pliku `src/logic/board.test.ts`.