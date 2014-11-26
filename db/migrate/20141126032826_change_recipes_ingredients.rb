class ChangeRecipesIngredients < ActiveRecord::Migration
  def change
    rename_table :recipes_ingredients, :recipe_ingredients
    add_column :recipe_ingredients, :value, :string
  end
end
