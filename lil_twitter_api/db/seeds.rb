# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

adell = User.create(handle: 'adell', name: 'adell hanson-kahn', email: 'adell@adell.com', password: 'abc123')
cordelia = User.create(handle: 'cordelia', name: 'cordelia peters', email: 'cordelia@cordelia.com', password: 'abc123')
shadi = User.create(handle: 'shadi', name: 'ed shadi', email: 'shadi@shadi.com', password: 'abc123')
sherif = User.create(handle: 'sherif', name: 'sherif abushadi', email: 'sherif@sherif.com', password: 'abc123')

10.times do
  uid = [*1..4].sample
  Post.create(user_id: uid, user_handle: User.find(uid).handle, description: Faker::Hacker.say_something_smart)

end
