class RecipeIngredient < ActiveRecord::Base
  belongs_to :recipe
  belongs_to :ingredient

  validates_presence_of :recipe_id, :ingredient_id, :quantity, :unit

  def as_json(options={})
    ingredient.as_json(options).merge({quantity: quantity, unit: unit})
  end
end
