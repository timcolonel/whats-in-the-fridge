Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users
  root 'welcome#index'

  get '/recipes/search/by_ingredients' => 'search_recipes#search_by_ingredients'
  
  resources :recipes
  resources :ingredients do
    collection do
      get 'list'
    end
  end


end
