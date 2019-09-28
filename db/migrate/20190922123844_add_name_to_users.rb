class AddNameToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :Name, :text
  end
end
