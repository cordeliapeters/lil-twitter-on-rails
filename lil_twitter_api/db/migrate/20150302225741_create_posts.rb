class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :description
      t.integer :user_id
      t.string :user_handle

      t.timestamps
    end
  end
end
