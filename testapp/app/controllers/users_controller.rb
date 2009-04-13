class UsersController < ApplicationController
  
  def index
    begin
      redirect_to User.first
    rescue Exception
      raise "Seems like you have'nt created any sample record. Please run: rake rest_in_place:create_sample"
    end
  end
  
  def show
  	
    @user = User.find params[:id]
    
    @roles = Role.find :all
    respond_to do |type|
      type.html
      type.js {render :json => @user}
    end
  end

  def update
    @user = User.find params[:id]
    @user.update_attributes!(params[:user])
    redirect_to @user, :status => :see_other
  end
end
