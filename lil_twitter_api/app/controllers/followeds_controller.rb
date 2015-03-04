class FollowedsController < ApplicationController

  def create
    user = User.find(params[:user_id])
    user.followeds << User.find(params[:followedUserId])

    render json: user, status: 200
  end

end
