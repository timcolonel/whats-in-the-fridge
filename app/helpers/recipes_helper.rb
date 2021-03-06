module RecipesHelper

  def time_prettify(time)
    hour = if time.hour > 0
             "#{time.hour}h "
           else
             ''
           end
    minutes = if time.min > 0
                "#{time.min}min "
              elsif time.hour == 0
                'None'
              else
                ''
              end

    hour + minutes
  end
end
