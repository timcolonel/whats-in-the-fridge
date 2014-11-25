class Ingredient < ActiveRecord::Base
  belongs_to :parent, class_name: Ingredient, foreign_key: :parent_id
  has_many :children, class_name: Ingredient, inverse_of: :parent, foreign_key: :parent_id
end
