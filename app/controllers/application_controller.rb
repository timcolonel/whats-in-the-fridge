class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :render_markdown

  def render_markdown(text)
    GitHub::Markdown.render(text)
  end
end
