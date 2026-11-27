# TASKFLOW Backend

Node.js ve Express.js ile geliştirilmiş görev yönetimi REST API'si. Görevler JSON dosyasında saklanır.

## Gereksinimler

- Node.js 18 veya üzeri
- npm
- Postman

## Kurulum ve çalıştırma

    npm install
    npm run dev

Geliştirme sunucusu http://localhost:3000 adresinde başlar. Durdurmak için terminalde Ctrl+C kullanın. Normal çalıştırma için npm start komutu kullanılabilir.

## API uçları

| Metot | Uç nokta | Açıklama |
|---|---|---|
| POST | /api/tasks | Görev oluşturur |
| GET | /api/tasks | Tüm görevleri listeler |
| GET | /api/tasks/:id | Bir görevin ayrıntısını getirir |
| PUT | /api/tasks/:id | Görev bilgilerini günceller |
| DELETE | /api/tasks/:id | Görevi siler |

Yeni görev örneği:

    {
      "title": "API dokümantasyonunu hazırla",
      "description": "Görev uçlarını belgele",
      "status": "pending",
      "priority": "high",
      "assignee": "Sümeyye",
      "project": "TASKFLOW"
    }

title zorunludur. status için pending veya completed; priority için low, medium veya high kullanılabilir. Gönderilmediklerinde varsayılanlar sırasıyla pending ve medium olur.

## Postman ile test ve teslim

1. postman/Taskflow.postman_collection.json dosyasını Postman'e içe aktarın.
2. API çalışırken koleksiyondaki istekleri sırayla gönderin: görev oluşturma, listeleme, detay, güncelleme ve silme.
3. Her yanıtın beklenen HTTP durum kodunu ve görev verisini döndürdüğünü kontrol edin.
4. Kendi Postman sonuç ekran görüntülerinizi screenshots/ klasörüne kaydedin.

## Proje belgeleri

- Proje tanıtımı: PROJECT_OVERVIEW.md
- API tasarım dokümanı: API_DOCUMENTATION.md
- Postman koleksiyonu: postman/Taskflow.postman_collection.json
