class Ability
  include CanCan::Ability

  def initialize(user)
    return if user.nil?
    can [:show, :index, :list], Ingredient
    can [:show, :index, :list], Recipe
    can [:create, :update, :destroy], Recipe, user_id: user.id
  end
end
