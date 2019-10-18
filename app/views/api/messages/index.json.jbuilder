json.array! @message do |message|
  json.text message.text
  json.image message.image
  json.create_at message.create_at
  json.user_name message.user.name
  json.id message.id
end