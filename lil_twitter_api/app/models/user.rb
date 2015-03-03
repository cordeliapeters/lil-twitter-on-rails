class User < ActiveRecord::Base

  has_secure_password
  validates :handle, uniqueness: true

  has_many :posts

  has_many :relationships, :class_name => "Relationship", :foreign_key => "follower_id"
  has_many :followeds, :through => :relationships

  has_many :reverse_relationships, :class_name => "Relationship", :foreign_key => "followed_id"
  has_many :followers, :through => :reverse_relationships

end
