class IngredientsController < ApplicationController
  load_and_authorize_resource

  def list
    @ingredients.where('name like %?%', params[:q])
    render json: @ingredients.as_json
  end

  private
  def reset
    @ingredients = Ingredient.all
  end
end
