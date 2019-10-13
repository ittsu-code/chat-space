class UsersController < ApplicationController
  def index
    User.where('name LIKE(?)', "%#{params[:keyword]}%")
    respond_to do |format|
        format.html
        format.json
    end
  end
end
