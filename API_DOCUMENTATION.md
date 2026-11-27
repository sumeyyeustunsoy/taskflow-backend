# TASKFLOW API Tasarım Dokümanı

Taban adresi: http://localhost:3000. İstek ve yanıt gövdeleri JSON biçimindedir. Başarılı yanıtlar success: true, hata yanıtları success: false alanı içerir.

## Görev uçları

### Görev oluşturma

POST /api/tasks — Başarılı olduğunda 201 Created döndürür. İstek gövdesinde title zorunludur. İsteğe bağlı alanlar: description, status, priority, assignee, project.

### Görevleri listeleme

GET /api/tasks — 200 OK döndürür. Yanıt, görev sayısını count alanında ve görev dizisini data alanında içerir.

### Görev detayı

GET /api/tasks/:id — Bulunan görev için 200 OK; geçersiz kimlik için 400 Bad Request, bulunmayan görev için 404 Not Found.

### Görev güncelleme

PUT /api/tasks/:id — Gönderilen görev alanlarını günceller ve 200 OK döndürür. id ve createdAt değişmez; updatedAt yenilenir. Görev bulunamazsa 404 döner.

### Görev silme

DELETE /api/tasks/:id — Görevi siler ve silinen kaydı 200 OK yanıtında döndürür. Görev bulunamazsa 404 döner.

## Görev alanları

status: pending veya completed. priority: low, medium veya high. Bu alanlar yeni görev oluştururken gönderilmezse varsayılanları uygulanır.

## Temel hata durumları

- 400: Geçersiz JSON, boş/zorunlu alan veya geçersiz kimlik.
- 404: Görev ya da uç nokta bulunamadı.
- 500: Beklenmeyen sunucu hatası.
