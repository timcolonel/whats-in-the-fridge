class RecipeIngredient < ActiveRecord::Base
  belongs_to :recipe
  belongs_to :ingredient

  def as_json(options={})
    ingredient.as_json(options).merge({value: value})
  end
end
