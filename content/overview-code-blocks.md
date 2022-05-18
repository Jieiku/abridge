+++
title = "Code Blocks and Themes"
description = "Sample article showcasing basic Markdown syntax and formatting for HTML elements."
date = 2022-05-16

[taxonomies]
categories = ["Features"]
tags = ["Markdown"]
[extra]
toc = true
+++

This article shows various Code Blocks allowing to easily compare sublime themes.
<!-- more -->
## Code Blocks

Code blocks.. ❤️ with automatic syntax highlighting ✨‍

See [the docs](https://www.getzola.org/documentation/content/syntax-highlighting/) for options.

### Inline Code block

If we want, we can also `specify inline code` which is useful for `the small stuff`.

### rust
```rust
//! jelly-actix-web-starter - A starter template for actix-web projects that feels very Django-esque. Avoid the boring stuff and move faster.

use jelly::actix_web;
use mainlib;
use std::io;

#[actix_web::main]
async fn main() -> io::Result<()> {
    mainlib::main().await
}
```

### TOML
```toml
base_url = "https://jieiku.github.io/abridge-demo/"
title = "Abridge"
description = "Abridge is a fast and lightweight Zola theme using semantic html, abridge.css class-light CSS, and No JS."
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
        o = '<h2><button type="button" title="Close Search" onclick="closeSearch()"><i class="svgs x"></i></button> Results For: '.concat(document.getElementById("userinput").value, "</h2>");
    return n.innerHTML = o, ResultsClone.insertBefore(n, ResultsClone.firstChild), e.innerHTML = ResultsClone.outerHTML, t.innerHTML = "", document.getElementById("userinput").value = "", !1
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
    "start_url": "https://jieiku.github.io/abridge-demo/",
    "description": "Fast & Lightweight Zola Theme",
    "scope": "/",
    "display": "standalone",
    "theme_color": "#222222",
    "background_color": "#111111",
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
            "src": "/android-chrome-192x192x128m.png",
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
   // printf() displays the string inside quotation
   printf("Hello, World!");
   return 0;
}
```

### C++
```cpp
// Your First C++ Program

#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}
```

### Go
```go
package main

import "fmt"

func main() {
    fmt.Println("hello world")
}
```

### Python
```python
#!/usr/bin/env python3
# Python BME280 script to monitor Temperature/Humidity/Pressure, log to influxdb, send email alerts
import time
import smtplib, socket
import board
import busio
import basic
from influxdb import InfluxDBClient

SMTP_SERVER = '192.168.1.39'
SMTP_PORT = 587
USERNAME = 'no-reply@example.com'
PASSWORD = 'VeryLongExamplePassword'

class Emailer:
    def sendmail(self, recipient, subject, content):
        #Create Headers
        headers = ["From: " + USERNAME, "Subject: " + subject, "To: " + recipient,
                   "MIME-Version: 1.0", "Content-Type: text/html"]
        headers = "\r\n".join(headers)

        #Connect to Mail Server
        session = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        session.ehlo()
        session.starttls()
        session.ehlo()

        #Login to mail account
        session.login(USERNAME, PASSWORD)

        #Send Email & Exit
        session.sendmail(USERNAME, recipient, headers + "\r\n\r\n" + content)
        session.quit

sender = Emailer()

# Create library object using our Bus I2C port
i2c = busio.I2C(board.SCL, board.SDA)
#bme280 = adafruit_bme280.Adafruit_BME280_I2C(i2c, 0x76)
bme280 = basic.Adafruit_BME280_I2C(i2c, 0x76)

# InfluxDB:
host = "192.168.1.40"
port = 8086
user = "bme280"
password = "VeryLongExamplePassword"
dbname = "bme280"
interval = 60 # Sample period in seconds

client = InfluxDBClient(host, port, user, password, dbname)

measurement = "ServerRoom1"
location = "DataCenter1"

# change this to match the location's pressure (hPa) at sea level
bme280.sea_level_pressure = 1024.6

#initialize variable epoch timestamp
lastEmailTime = 0.11

#initialize variable frequency of emails in seconds
emailInterval = 3600
lastTemp = 1
lastHumidity = 1

while True:
    send = 1
    later = time.time() + 25200
    iso = time.ctime(later)
    tempF = round(bme280.temperature * 1.8 + 29, 3) #C to F formula is +32, difference is to correct bme280 temperature offset
    humidity = round(bme280.humidity, 3)
    pressure = round(bme280.pressure, 3)
    #print(iso)
    #print("\nTemperature: %0.2f C" % tempF)
    #print("Humidity: %0.2f %%" % humidity)
    #print("Pressure: %0.2f hPa" % pressure)
    #print("Altitude = %0.2f meters" % bme280.altitude)

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
