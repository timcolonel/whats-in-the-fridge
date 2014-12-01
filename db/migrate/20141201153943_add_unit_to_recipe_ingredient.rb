class AddUnitToRecipeIngredient < ActiveRecord::Migration
  def change
    rename_column :recipe_ingredients, :value, :unit
    add_column :recipe_ingredients, :quantity, :integer
  end
end
