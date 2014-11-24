class Recipe < ActiveRecord::Base
  belongs_to :user
  belongs_to :type, class_name: RecipeType
  has_and_belongs_to_many :ingredients, class_name: 'Ingredient', join_table: 'recipes_ingredients'

  validates_presence_of :name, :cooking_time, :preparation_time, :preparation, :type_id, :user_id
end
