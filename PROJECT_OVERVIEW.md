# TASKFLOW — Proje Tanıtımı

## Amaç ve senaryo

TASKFLOW, bir yazılım ekibinin görevlerini, sorumlularını ve önceliklerini takip etmesi için Node.js ve Express.js ile geliştirilmiş bir REST API'dir. İstemciler görev oluşturabilir, görevleri listeleyip filtreleyebilir, tek bir görevin ayrıntısını görüntüleyebilir, güncelleyebilir ve silebilir.

## Veri modeli

Her görev; sayısal ve benzersiz `id`, zorunlu `title`, `description`, `status`, `priority`, `assignee`, `project`, `createdAt` ve `updatedAt` alanlarını taşır. Durum `pending` veya `completed`; öncelik `low`, `medium` veya `high` değerlerinden biridir. Yeni görevlerde durum `pending`, öncelik `medium` olur. Veriler `src/data/tasks.json` içinde saklanır.

## API ve mimari

API, `/api/tasks` altında standart REST CRUD uçlarını sunar. Routing, controller, middleware ve veri deposu ayrı modüllerdedir. Her HTTP isteği, ISO 8601 zaman damgasıyla method ve path bilgilerini logger middleware'ine yazdırır. İstek doğrulaması açıklayıcı `400` yanıtları üretir; bulunmayan kayıtlar `404` döndürür. Filtreleme, arama, sayfalama ve özet rapor uçları ek kullanım kolaylığı sağlar.

## Teknolojiler

Node.js, Express.js, Node.js `fs/promises` ve JSON dosya depolaması. Uygulama herhangi bir web arayüzüne bağlı değildir; Postman veya başka bir HTTP istemcisiyle kullanılabilir.
