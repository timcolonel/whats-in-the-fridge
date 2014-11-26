class RecipeIngredient < ActiveRecord::Base
  belongs_to :recipe
  belongs_to :ingredient

  validates_presence_of :recipe_id, :ingredient_id, :value

  def as_json(options={})
    ingredient.as_json(options).merge({value: value})
  end
end
