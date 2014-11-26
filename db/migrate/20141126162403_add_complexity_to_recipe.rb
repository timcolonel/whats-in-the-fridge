class AddComplexityToRecipe < ActiveRecord::Migration
  def change
    add_column :recipes, :complexity, :integer
    add_column :recipes, :cost, :integer
  end
end
