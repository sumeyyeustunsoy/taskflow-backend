# TASKFLOW — Proje Tanıtımı

## Amaç ve senaryo

TASKFLOW, bir yazılım ekibinin görevlerini, sorumlularını ve önceliklerini takip etmesi için geliştirilen bir REST API'dir. Kullanıcılar görev oluşturabilir, görevleri listeleyebilir, ayrıntı görüntüleyebilir, güncelleyebilir ve silebilir.

## Veri modeli

Her görev şu alanlardan oluşur:

| Alan | Tür | Açıklama |
|---|---|---|
| id | Sayı | Otomatik oluşturulan benzersiz kimlik |
| title | Metin | Zorunlu görev başlığı |
| description | Metin | Görev açıklaması |
| status | Metin | pending veya completed; varsayılan pending |
| priority | Metin | low, medium veya high; varsayılan medium |
| assignee | Metin | Sorumlu kişi |
| project | Metin | İlişkili proje |
| createdAt | ISO tarih | Oluşturulma zamanı |
| updatedAt | ISO tarih | Son güncellenme zamanı |

Görevler src/data/tasks.json dosyasında saklanır.

## Sistem tasarımı

Uygulama Node.js ve Express.js kullanır. src/app.js sunucuyu ve temel middleware'leri başlatır. İstek yolları src/routes/ altında; CRUD işlemleri src/controllers/ altında düzenlenmiştir. İstek logger'ı HTTP metodunu, yolu ve zaman damgasını konsola yazar. Görev verileri src/data/taskStore.js üzerinden okunup yazılır.

## Kapsam

Proje; görev CRUD işlemlerini, temel istek doğrulamasını, modüler routing yapısını ve logger middleware'ini kapsar. Bir web veya mobil arayüz içermez; API Postman gibi HTTP istemcileriyle kullanılabilir.
