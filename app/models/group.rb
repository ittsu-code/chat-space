class Group < ApplicationRecord
  validates :name, presence: true
  has_many :messages
  has_many :group_users
  has_many  :users,  through:  :group_users

   def show_last_message
    if (last_message = messages.last).present?
      last_message.text? ? last_message.text : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end
