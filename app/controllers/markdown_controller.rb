class MarkdownController < ApplicationController
  def process_markdown
    render text: render_markdown(params[:text])
  end
end
