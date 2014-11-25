class Recipe < ActiveRecord::Base
  belongs_to :user
  belongs_to :type, class_name: RecipeType
  has_and_belongs_to_many :ingredients, class_name: 'Ingredient', join_table: 'recipes_ingredients'


  has_attached_file :image, styles: {medium: '300x300>', thumb: '100x100>'}
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  validates_presence_of :name, :cooking_time, :preparation_time, :preparation, :type_id, :user_id
end
