json.(@message, :text :image)
json.created_at @message.created_at
json.user @message.user.name
json.id @message.id