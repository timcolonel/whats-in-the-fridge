class Recipe < ActiveRecord::Base
  belongs_to :user
  belongs_to :type, class_name: RecipeType
  has_many :recipe_ingredients, class_name: RecipeIngredient
  has_many :ingredients, class_name: Ingredient, through: :recipe_ingredients


  has_attached_file :image, styles: {medium: '300x300>', thumbnail: '100x100>'}
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  validates_presence_of :name, :cooking_time, :preparation_time, :preparation,
                        :type_id, :user_id, :complexity, :cost

  enum complexity: [:simple, :medium, :hard]
  enum cost: [:cheap, :affordable, :expensive]

  def as_json(options = {})
    super().merge(thumbnail: image.url(:thumbnail), medium_image: image.url(:medium), image: image.url)
  end
end
