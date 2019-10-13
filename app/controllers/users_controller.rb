class UsersController < ApplicationController
  def index
    User.where('name LIKE(?)', "%#{params[:keyword]}%")
  end
end
