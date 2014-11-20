class CreateRecipes < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
      t.string :name
      t.text :preparation
      t.time :preparation_time
      t.time :cooking_time
      t.references :user, index: true
      t.references :type, index: true

      t.timestamps
    end
  end
end
