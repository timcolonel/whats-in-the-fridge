class Ingredient < ActiveRecord::Base
  belongs_to :parent, class_name: Ingredient
end
