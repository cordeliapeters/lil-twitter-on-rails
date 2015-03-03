class PostsController < ApplicationController
  def index
    posts = Post.all
    render json: posts, status: 200
  end

  def feed
    current_user = User.find(params[:user_id])

    posts = current_user.posts || []
    current_user.followeds.each do |followed|
      posts << followed.posts
    end
    posts.order(:created_at)
    puts "*"*100
    puts posts
    render json: posts, status: 200
  end

  def new
    post = Post.new
  end

  def create
    puts "="*100
    puts params
    post = Post.new(description: params[:description], user_id: params[:user_id])
    puts post
    if post.save
      render json: post, status: 200
    else
      puts params
      puts "failed to create new post"
    end
  end

  def destroy
  end


end
