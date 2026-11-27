# TASKFLOW Backend

Node.js ve Express.js ile geliştirilmiş görev ve proje yönetimi REST API'si.

## Gereksinimler

- Node.js 18 veya üzeri
- npm

## Kurulum ve çalıştırma

```bash
npm install
npm run dev
```

Geliştirme komutu yerleşik `node --watch` özelliğini kullanır. Normal çalıştırma için `npm start` komutunu kullanın. Varsayılan adres `http://localhost:3000`; farklı port için `PORT` ortam değişkeni ayarlanabilir. Sağlık kontrolü: `GET /api/health`.

## Uç noktalar

| Metot | Uç nokta | Açıklama |
|---|---|---|
| `POST` | `/api/tasks` | Görev oluşturur |
| `GET` | `/api/tasks` | Görevleri listeler; filtre, arama ve sayfalama destekler |
| `GET` | `/api/tasks/:id` | Görev ayrıntısını getirir |
| `PUT` | `/api/tasks/:id` | Görev alanlarını günceller |
| `DELETE` | `/api/tasks/:id` | Görevi siler |
| `GET` | `/api/reports/summary` | Durum ve öncelik sayılarını döndürür |

Görev gövdesi örneği:

```json
{
  "title": "API dokümantasyonunu hazırla",
  "description": "CRUD uçlarını belgele",
  "status": "pending",
  "priority": "high",
  "assignee": "Sümeyye",
  "project": "TASKFLOW"
}
```

`title` zorunludur. `status`: `pending` / `completed`; `priority`: `low` / `medium` / `high`. Bu alanlar gönderilmezse varsayılan değerler uygulanır.

## Listeleme seçenekleri

`GET /api/tasks?status=pending&priority=high&assignee=Sümeyye&project=TASKFLOW&search=API&page=1&limit=10&sortBy=createdAt&order=desc`

## Veri ve loglar

Görevler `src/data/tasks.json` içinde kalıcı olarak saklanır. Her istek method, path ve ISO zaman damgasıyla konsola kaydedilir. Depolama yazımları geçici dosya üzerinden atomik olarak tamamlanır.

## Postman ile CRUD kanıtı

`postman/Taskflow.postman_collection.json` koleksiyonunu Postman'e içe aktarın. Önce API'yi başlatın, sonra `TASKFLOW CRUD` klasörünü Runner'da sırayla çalıştırın. Koleksiyon oluşturma, listeleme, detay, güncelleme ve silme adımlarını doğrular; oluşturulan görev kimliğini sonraki isteklere aktarır. Ekran görüntülerini Postman Runner sonuçları görünecek şekilde `screenshots/` klasörüne kaydedin.

## Proje belgeleri

- [Proje tanıtımı](PROJECT_OVERVIEW.md)
- [API dokümantasyonu](API_DOCUMENTATION.md)
- [Postman koleksiyonu](postman/Taskflow.postman_collection.json)
