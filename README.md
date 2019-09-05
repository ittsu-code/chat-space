# README

## ChatSpace DB設定

### usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false|
#### Association
- has_many :messages
- has_many :users_groups
- has_many  :groups,  through:  :users_groups
#### index
- add_index :users, :name

### messages テーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|string||
|created_at|datetime|null: false|
|updated_at|datetime|null: false|
|user_id|references|null: false, foreign_key: true|
#### Association
- belongs_to :group
- belongs_to :user

### gruopsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|created_at|datetime|null: false|
|updated_at|datetime|null: false|
#### Association
- has_many :messages
- has_many :users_groups
- has_many  :users,  through:  :users_groups

### users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
#### Association
- belongs_to :user
- belongs_to :group