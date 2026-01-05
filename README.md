<h1>Inventory API - Node.js</h1>
<h3><i>PL</i></h3>
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

<p>Przed złożeniem zamówienia sprawdzany jest stock każdego produktu, jeśli któregoś brakuje zamówienie jest odrzucane - <strong>409 Conflict</strong>.
Stock nigdy nie spadnie poniżej zera.</p>
<br>
<h3>Testowanie</h3>
<p>Testy jednostkowe - testowanie pricingCalculator, czyli logiki obliczania ceny, rabatów i zaokrąglanie ceny.</p>
<p>Testy integracyjne - wykonane na endpointach /products i /orders czy poparawnie działają i zwracają dane. Przy orders jest sprawdzane zamówienie i wielkość stocku produktu</p>
<br>
<h3>Alternatywy</h3>
<p>Na produkcji powinno się przetestować równoległe zamówienia, testy wydajnościowe oraz testy bezpieczeństwa aplikacji.</p>
<p>Gdybym miał więcej czasu użyłbym bazy MongoDB + mongoose, która realnie mogłaby być zastosowana w prawdziwych komercyjnych projektach.</p>
<br><br>
<h3><i>ENG</i></h3>

<h3>Assumptions and Simplifications</h3>
<p>The application is a backend API written in Node.js (Express, lowdb, Jest).</p>
<p>Elements intentionally omitted include authorization and authentication, as they were not mentioned in the task requirements. 
The database used is lowdb, which is the simplest and fastest to implement. 
However, in a real-world, larger project, I would most likely use MongoDB or MySQL. 
Additionally, database transactions would be required for production usage.</p>
<p>Discounts are not combined - only the highest possible discount from the customer’s perspective is applied. 
The customer is identified by passing a customerId.</p>
<br>

<h3>Technologies</h3>
<p>I chose lowdb, a lightweight file-based database, because it offers a fast setup and requires no environment configuration, 
which significantly sped up the development process. 
A modular project structure was applied, where each module (products, orders) contains routes, controllers, commands, and queries.
The commands directory contains components responsible for modifying the application state, 
while the queries directory contains components used only for data retrieval.</p>

<p>Discount system:</p>
<ol>
  <li>The total quantity of all purchased products is calculated</li>
  <li>Available discounts are evaluated (volume-based, seasonal such as Black Friday and holidays, and location-based)</li>
  <li>Only the highest applicable discount is applied - discounts are not combined</li>
</ol>

<p>Before placing an order, the stock level of each product is validated. 
If any product has insufficient stock, the order is rejected with a <strong>409 Conflict</strong> response.
Stock levels can never drop below zero.</p>
<br>

<h3>Testing</h3>
<p>Unit tests focus on the pricingCalculator, which contains the core business logic responsible for price calculation, 
discount application, and monetary value rounding.</p>
<p>Integration tests are implemented for the /products and /orders endpoints to verify that they behave correctly 
and return expected responses. 
For orders, both successful order placement and product stock level updates are validated.</p>
<br>

<h3>Alternatives</h3>
<p>In a production environment, additional tests should be implemented, including concurrent order handling, 
performance testing, and application security testing.</p>
<p>If more time were available, I would choose MongoDB with Mongoose, 
as it is a more realistic choice for real-world commercial projects.</p>
