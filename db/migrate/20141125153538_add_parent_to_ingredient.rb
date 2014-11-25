class AddParentToIngredient < ActiveRecord::Migration
  def change
    add_reference :ingredients, :parent, index: true
  end
end
