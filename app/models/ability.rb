class Ability
  include CanCan::Ability

  def initialize(user)
    can [:show, :index, :list, :random], Ingredient
    can [:show, :index, :list], Recipe

    return if user.nil?
    if user.admin?
      can :manage, :all
    else

      can [:create, :update, :destroy], Recipe, user_id: user.id
    end
  end
end
