# TASKFLOW API Dokümantasyonu

Yerel taban adresi: `http://localhost:3000`. Görev verileri JSON olarak gönderilir. Yanıtlar `{ "success": true, "data": ... }` biçimindedir.

## Sağlık kontrolü

`GET /api/health` — Sunucu durumunu döndürür.

## Görevler

### Görev oluştur

`POST /api/tasks` — `201 Created`. Gövde: `title` (zorunlu), `description`, `status`, `priority`, `assignee`, `project`. Durum varsayılanı `pending`, öncelik varsayılanı `medium` olur.

### Görevleri listele

`GET /api/tasks` — `200 OK`. İsteğe bağlı sorgular: `status`, `priority`, `assignee`, `project`, `search`, `page`, `limit`, `sortBy`, `order`. Yanıt sayım, toplam, sayfa, limit ve görev listesini içerir.

### Görev ayrıntısı

`GET /api/tasks/:id` — `200 OK`; bulunmayan görev için `404`, geçersiz kimlik için `400`.

### Görevi güncelle

`PUT /api/tasks/:id` — `200 OK`. Gövde, güncellenecek bir veya daha fazla görev alanını içerebilir. `id`, `createdAt` korunur; `updatedAt` yenilenir. Bulunmayan görev `404` döndürür.

### Görevi sil

`DELETE /api/tasks/:id` — `200 OK`; silinen görev yanıt verisinde döner. Bulunmayan görev `404` döndürür.

## Özet raporu

`GET /api/reports/summary` — Toplam görev sayısını ve durum/öncelik kırılımlarını döndürür.

## Hata yanıtları

Doğrulama veya bozuk JSON için `400`, bulunmayan endpoint veya kayıt için `404`, beklenmeyen sunucu hatası için `500` döner. Hata gövdesi `{ "success": false, "message": "..." }` biçimindedir.
