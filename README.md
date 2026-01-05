<h1>Inventory API - Node.js</h1>

<h3>Założenia i uproszczenia</h3>
<p>Aplikacja jest backendowym API, napisanym w Node.js (Express, lowdb, Jest)</p>
<p>Elementy celowo pominięte to np. autoryzacja i uwierzytelnianie, o których nie było wspomniane w zadaniu. Wykorzystana baza danych to najprostsza i najszybsza w implementacji lowdb, 
  choć przy prawdziwym, większym projekcie prawdopodobnie korzystałbym z MongoDb lub MySQL. Dodatkowo warto byłoby dodać transakcje na zapytaniach do bazy.</p>
<p>Zniżki nie są łączone, a stosowana jest tylko najwyższa możliwa zniżka z perspektywy klienta. Samego klienta rozpoznajemy poprzez przekazanie customerId.</p>
<br>
<h3>Technologie</h3>
<p>Wybrałem lowdb czyli lekką bazę plikową, ponieważ oferuje szybki start i brak konfiguracji środowiska co przyspieszyło mi zadanie. 
  Zastosowałem modułową strukturę plików gdzie w każdym module (products, orders) znajdują się routes, controller, commands, queries.
W folderach commands znajdują się komponenty modyfikujące stan aplikacji, a w queries komponenty tylko do odczytu danych</p>

System rabatów:
<ol>
  <li>Obliczana jest ilość wszystkich zakupionych produktów</li>
  <li>Sprawdzane są dostępne rabaty (ilościowe (volume-based), sezonowe (Black Friday, święta), lokalizacyjne)</li>
  <li>Zastosowany zostaje tylko najwyższy rabat, a rabaty nie są łączone</li>
</ol>

<p>Przed złożeniem zamówienia sprawdzany jest stock każdego produktu, jeśli któregoś brakuje zamówienie jest odrzucane - 409 Conflict.
Stock nigdy nie spadnie poniżej zera.</p>
<br>
<h3>Testowanie</h3>
<p>Testy jednostkowe - testowanie pricingCalculator, czyli logiki obliczania ceny, rabatów i zaokrąglanie ceny.</p>
<p>Testy integracyjne - wykonane na endpointach /products i /orders czy poparawnie działają i zwracają dane. Przy orders jest sprawdzane zamówienie i wielkość stocku produktu</p>
<br>
<h3>Alternatywy</h3>
<p>Na produkcji powinno się przetestować równoległe zamówienia, testy wydajnościowe oraz testy bezpieczeństwa aplikacji.</p>
<p>Gdybym miał więcej czasu użyłbym bazy MongoDB + mongoose, która realnie mogłaby być zastosowana w prawdziwych komercyjnych projektach.</p>
