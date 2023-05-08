+++
title = "Blocs de code et thèmes"
description = "Exemple d'article présentant la coloration syntaxique et la mise en forme des blocs de code avec un thème personnalisé."
date = 2022-05-16
draft = false

[taxonomies]
categories = ["Features"]
tags = ["Markdown"]
[extra]
toc = true
keywords = "Code, Code Blocks, Syntax, Syntax Highlighting, Theme"
+++

Cet article présente différents Code Blocks permettant de comparer facilement des thèmes sublimes.
<!-- more -->
## Blocs de codes

Blocs de code.. ❤️ avec coloration syntaxique automatique ✨‍

Voir [les docs](https://www.getzola.org/documentation/content/syntax-highlighting/) pour les options.

### Bloc de code en ligne

Si nous voulons, nous pouvons aussi `spécifier le code en ligne` ce qui est utile pour `les petites choses`.

### rust
```rust
fn main() {
    let greetings = ["Hello", "Hola", "Bonjour",
                     "Ciao", "こんにちは", "안녕하세요",
                     "Cześć", "Olá", "Здравствуйте",
                     "Chào bạn", "您好", "Hallo",
                     "Hej", "Ahoj", "سلام",
                     "Hej", "Hallo", "Hei",
                     "Helló", "Hallo", "Buna ziua",
                     "Merhaba"];

    for (num, greeting) in greetings.iter().enumerate() {
        print!("{} : ", greeting);
        match num {
            0 =>  println!("This code is editable and runnable!"),//en English
            1 =>  println!("¡Este código es editable y ejecutable!"),//es Spanish
            2 =>  println!("Ce code est modifiable et exécutable !"),//fr French
            3 =>  println!("Questo codice è modificabile ed eseguibile!"),//it Italian
            4 =>  println!("このコードは編集して実行出来ます！"),//jp Japanese
            5 =>  println!("여기에서 코드를 수정하고 실행할 수 있습니다!"),//ko Korean
            6 =>  println!("Ten kod można edytować oraz uruchomić!"),//pl Polish
            7 =>  println!("Este código é editável e executável!"),//pt Portuguese
            8 =>  println!("Этот код можно отредактировать и запустить!"),//ru Russian
            9 =>  println!("Bạn có thể edit và run code trực tiếp!"),//vi Vietnamese
            10 => println!("这段代码是可以编辑并且能够运行的！"),//zh Chinese
            11 => println!("Dieser Code kann bearbeitet und ausgeführt werden!"),//de German
            12 => println!("Den här koden kan redigeras och köras!"),//sv Swedish
            13 => println!("Tento kód můžete upravit a spustit"),//cs Czech
            14 => println!("این کد قابلیت ویرایش و اجرا دارد!"),//fa Persian
            15 => println!("Denne kode kan redigeres og køres!"),//da Danish
            16 => println!("Deze code is bewerkbaar en uitvoerbaar!"),//du Dutch
            17 => println!("Tämä koodi on muokattavissa ja ajettavissa!"),//fi Finnish
            18 => println!("Ez a kód szerkeszthető és futtatható!"),//hu Hungarian
            19 => println!("Denne koden er redigerbar og kjørbar!"),//no Norwegian
            20 => println!("Acest cod este editabil și rulabil!"),//ro Romanian
            21 => println!("Bu kod düzenlenebilir ve çalıştırılabilir!"),//tr Turkish
            _ =>  {},
        }
    }
}
```

### TOML
```toml,linenos,hl_lines=3
base_url = "https://abridge.netlify.app/"
title = "Abridge"
description = "Abridge est un thème Zola rapide et léger utilisant le HTML sémantique, le CSS abridge.css class-light et aucun JS obligatoire."
default_language = "en"
#theme = "abridge"

build_search_index = true
minify_html = false
feed_filename = "atom.xml"
taxonomies = [
    {name = "categories", feed = true},
    {name = "tags", feed = true},
]
```

### html
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Example HTML5 Document</title>
</head>
<body>
  <!--Main Content Area-->
  <p>Test</p>
</body>
</html>
```

### javascript
```javascript
function closeSearch() {//close the search displaying the regular page.
    const e = document.querySelector("main");
    e.innerHTML = window.main
}

function goSearch() {// on enter key or search icon click display results to the page.
    const e = document.querySelector("main");
    window.main || (window.main = e.innerHTML);
    var t = document.getElementById("suggestions"),
        n = ((ResultsClone = t.cloneNode(!0)).id = "results", document.createElement("div")),
        o = '<h2><button type="button" title="Close Search" onclick="closeSearch()"><i class="svgs x"></i></button> Results For: '.concat(document.getElementById("searchinput").value, "</h2>");
    return n.innerHTML = o, ResultsClone.insertBefore(n, ResultsClone.firstChild), e.innerHTML = ResultsClone.outerHTML, t.innerHTML = "", document.getElementById("searchinput").value = "", !1
}! function() {
  // search function code goes here
}
```

### php
```php
<?php
/**
 * Postfix Admin
 */
require_once('common.php');
$CONF = Config::getInstance()->getAll();

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (!isset($_SESSION['PFA_token'])) {
        die("Invalid token (session timeout; refresh the page and try again?)");
    }
    $fUsername = trim(safepost('fUsername'));
    if ($lang != check_language(false)) { # only set cookie if language selection was changed
        setcookie('lang', $lang, time() + 60*60*24*30); # language cookie, lifetime 30 days
    }
}

$_SESSION['PFA_token'] = md5(uniqid("pfa" . rand(), true));

/* vim: set expandtab softtabstop=4 tabstop=4 shiftwidth=4: */
```


### json
```json
{
    "name": "Abridge Zola Theme",
    "short_name": "Abridge",
    "description": "Fast & Lightweight Zola Theme",
    "start_url": "/index.html",
    "scope": "/",
    "background_color": "#111111",
    "theme_color": "#222222",
    "display": "standalone",
    "icons": [
        {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-192x192m.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
        }
    ]
}
```

### SQL
```sql
-- jelly-actix-web-starter - Creates an accounts table, along with some associated helpers.

create or replace function update_timestamp() returns trigger as $$
begin
    new.updated = now();
    return new;
end;
$$ language 'plpgsql';

create table if not exists accounts (
    id serial primary key,
    name text not null,
    email text not null unique,
    password text not null,
    profile jsonb not null default '{}',
    plan integer not null default 0,
    is_active boolean not null default true,
    is_admin boolean not null default false,
    has_verified_email boolean not null default false,
    last_login timestamp with time zone,
    created timestamp with time zone not null default now(),
    updated timestamp with time zone not null default now()
);

create unique index accounts_unique_lower_email_idx on accounts (lower(email));

create trigger user_updated before insert or update on accounts
for each row execute procedure update_timestamp();
```

### Lua
```lua
function square(x)
    return x * x
end

print(square(2)) -- prints '4'

function getPlayerInformation()
   playerName = UnitName("player")
   playerLevel = UnitLevel("player")
   specId, specName = GetSpecializationInfo(GetSpecialization())

   return "Hey, I'm " .. playerName .. " (Level " .. playerLevel .. "). I'm currently in spec " .. specName .. "."
end

print(getPlayerInformation())
```

### C
```c
#include <stdio.h>
int main() {
    int a;
    /* actual initialization */
    a = 10;
    printf("Hello, World!");
    return 0;
}
```

### C++
```cpp
// Your First C++ Program

#include <iostream>

int main() {
    int a;
    /* actual initialization */
    a = 10;
    std::cout << "Hello World!";
    return 0;
}
```

### Go
```go
package main

import "fmt"

func main() {
    var myvariable1 = 20
    var myvariable2 = "hello world"
    fmt.Println("hello world")
}
```

### Python
```python
#!/usr/bin/env python3
import smtplib, socket
from influxdb import InfluxDBClient

while True:
    send = 1
    later = time.time() + 25200
    iso = time.ctime(later)
    tempF = round(bme280.temperature * 1.8 + 29, 3) #C to F formula is +32, difference is to correct bme280 temperature offset
    humidity = round(bme280.humidity, 3)
    pressure = round(bme280.pressure, 3)
    # serialize data as JSON
    data = [
        {
          "measurement": measurement,
              "tags": {
                  "location": location,
              },
              "time": iso,
              "fields": {
                  "temperature" : tempF,
                  "humidity": humidity,
                  "pressure": pressure
                               }
          }
        ]
    # Send the JSON data to InfluxDB
    try:
      client.write_points(data)
    except socket.error as e:
      print("Could Not Connect to InfluxDB!")
    if tempF > 90 and humidity > 55:
      emailSubject = "Humidity>55:  " + str(int(humidity)) + "%H  , Temperature>90:  " + str(int(tempF)) + "F"
      emailContent = 'Humidity:  ' + str(int(humidity)) + '%H  , Temperature:  ' + str(int(tempF)) + 'F  <a href="https://metrics.example.com">Dashboard</a>'
    elif humidity > 55:
      emailSubject = "Humidity>55:  " + str(int(humidity)) + "%H"
      emailContent = 'Humidity:  ' + str(int(humidity)) + '%H  , Temperature:  ' + str(int(tempF)) + 'F  <a href="https://metrics.example.com">Dashboard</a>'
    elif tempF > 90:
      emailSubject = "Temperature>90:  " + str(int(tempF)) + "F"
      emailContent = 'Humidity:  ' + str(int(humidity)) + '%H  , Temperature:  ' + str(int(tempF)) + 'F  <a href="https://metrics.example.com">Dashboard</a>'
    else:
      send = 0
    if send == 1:
      try:
        if time.time() > lastEmailTime or abs(lastTemp-int(tempF)) > 1:
          lastEmailTime = time.time()+emailInterval
          lastTemp = int(tempF)
          sender.sendmail('jake@example.com', emailSubject, emailContent)
      except socket.error as e:
        print("Could Not Connect to SMTP server!")
    time.sleep(interval)
```
