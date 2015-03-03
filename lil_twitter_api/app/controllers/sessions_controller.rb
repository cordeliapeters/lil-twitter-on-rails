class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.find_by(email: params[:email])
    puts "="*100
    puts params
    puts params[:password]
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      puts "in the if statment"
      render json: user, status: 200

    else
      puts "error in session create"
    end

    # redirect_to (:back)
  end

  def destroy
    session[:user_id] = nil
  end



end
