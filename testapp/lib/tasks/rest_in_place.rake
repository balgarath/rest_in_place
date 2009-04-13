namespace :rest_in_place do
  
  desc "Creates a sample record for use in testing. (User)"
  task :create_sample => :environment do
  	Role.create! :name => 'User'
  	Role.create! :name => 'Moderator'
  	Role.create! :name => 'Administrator'
    User.create! :name => "Frank", :role_id => "1", :about => "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    p "Created test record."
  end
  
end
