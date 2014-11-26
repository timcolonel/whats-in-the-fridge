class Ingredient < ActiveRecord::Base
  belongs_to :parent, class_name: Ingredient, foreign_key: :parent_id
  has_many :children, class_name: Ingredient, inverse_of: :parent, foreign_key: :parent_id

  validates_presence_of :name
  validates_uniqueness_of :name

  def is_child_of?(ingredient)
    return false if parent.nil?
    return false unless ingredient.is_a? Ingredient
    ingredient == parent or parent.is_child_of?(parent)
  end

  def to_s
    name
  end
end
