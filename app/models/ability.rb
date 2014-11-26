class Ability
  include CanCan::Ability

  def initialize(user)
    return if user.nil?
    if user.admin?
      can :manage, :all
    else
      can [:show, :index, :list], Ingredient
      can [:show, :index, :list], Recipe
      can [:create, :update, :destroy], Recipe, user_id: user.id
    end
  end
end
