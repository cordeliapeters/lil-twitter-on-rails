class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.create(handle: params[:handle], name: params[:name], password: params[:password])
    if @user
      # redirect to homepage
    else
     # error handling
   end
  end

  def search
    puts "="*100
    puts params
    keywords = params[:userSearchBar].split(" ").map!{|word| "%"+word+"%"}
    puts keywords
    matches = User.where('handle ilike any ( array[?] )', keywords)
    # puts matches
    render json: matches, status: 200
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
  end

end
