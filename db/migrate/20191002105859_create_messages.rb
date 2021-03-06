class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
    t.text :text
    t.string :image
    t.datetime :created_at, null: false
    t.datetime :updated_at, null: false
    t.references :user, foreign_key: true
    t.references :group, foreign_key: true
    t.timestamps
    end
  end
end
